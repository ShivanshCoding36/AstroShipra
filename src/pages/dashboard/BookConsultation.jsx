import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRazorpayReady } from '../../lib/useRazorpay';

const CONSULTATION_AMOUNT_INR = 9924;
const TOPICS = [
  { value: 'Career & Business', label: '💼 Career & Business' },
  { value: 'Marriage & Relationships', label: '💞 Marriage & Relationships' },
  { value: 'Health & Wellbeing', label: '🌿 Health & Wellbeing' },
  { value: 'Money & Assets', label: '💰 Money & Assets' },
  { value: 'Children & Family', label: '👨‍👩‍👧 Children & Family' },
  { value: 'General Life Guidance', label: '✨ General Life Guidance' },
  { value: 'Numerology Reading', label: '🔢 Numerology Reading' },
];

function formatInr(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

export default function BookConsultation() {
  const razorpayReady = useRazorpayReady();
  const [stage, setStage] = useState('form'); // form | slots | pay | success
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]); // array of start_at ISO strings
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [form, setForm] = useState({
    name: '',
    dob: '',
    tob: '',
    pob: '',
    queries: '',
  });

  const [receipt, setReceipt] = useState(null);

  const canContinue = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      Boolean(form.dob) &&
      Boolean(form.tob) &&
      form.pob.trim().length > 0 &&
      topics.length >= 1
    );
  }, [form, topics]);

  const canContinueFromSlots = useMemo(() => selectedSlots.length > 0 && selectedSlots.length < 4, [selectedSlots]);

  const onChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleTopic = (value) => {
    setTopics((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]));
  };

  const proceedToSlots = () => {
    setErrorMsg('');
    if (!canContinue) {
      setErrorMsg('Please fill all fields, select at least 1 topic, and keep queries at least 10 characters.');
      return;
    }
    setStage('slots');
  };

  const proceedToPayment = () => {
    setErrorMsg('');
    if (!canContinueFromSlots) {
      setErrorMsg('Please select your top 3 preferred 1-hour time slots.');
      return;
    }
    setStage('pay');
  };

  const backToForm = () => {
    setErrorMsg('');
    setStage('form');
  };

  const backToSlots = () => {
    setErrorMsg('');
    setStage('slots');
  };

  const toggleSlot = (idOfSlot) => {
    setSelectedSlots((prev) => {
      if (prev.includes(idOfSlot)) return prev.filter((x) => x !== idOfSlot);
      if (prev.length >= 3) return prev;
      return [...prev, idOfSlot];
    });
  };

  useEffect(() => {
    const fetchSlots = async () => {
      if (stage !== 'slots') return;
      setErrorMsg('');
      setSlotsLoading(true);

      const now = new Date();
      const from = new Date(now);
      from.setDate(from.getDate() + 1);
      from.setHours(0, 0, 0, 0);

      const to = new Date(now);
      to.setDate(to.getDate() + 8);
      to.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from('availability_slots')
        .select('id,start_at,end_at,status')
        .eq('status','available')
        .gte('start_at', from.toISOString())
        .lte('start_at', to.toISOString())
        .order('start_at', { ascending: true });

      setSlotsLoading(false);
      if (error) {
        setErrorMsg(error.message);
        setAvailableSlots([]);
        return;
      }
      setAvailableSlots(data || []);
    };

    fetchSlots();
  }, [stage]);

  const slotsByDate = useMemo(() => {
    const map = new Map();
    for (const s of availableSlots) {
      const d = new Date(s.start_at);
      const key = d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      const arr = map.get(key) || [];
      arr.push(s);
      map.set(key, arr);
    }
    return Array.from(map.entries());
  }, [availableSlots]);

  const VerifyTimeSlots = async () =>{
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      setLoading(false);
      setErrorMsg('Please login again.');
      return;
    }
    const {data, error} = await supabase.from('availability_slots').select('id,status')
    console.log(data);
    console.log(typeof data);
    console.log(data[0]);
    console.log(typeof data[0]);
    console.log(data[0]['id']);
    console.log(data[0]['status']);

    for (let ele in data){
      if ((ele['id']) in selectedSlots){
        if ((ele['status']) === 'available'){
          pass
        }
        else{
          setLoading(false);
          setErrorMsg('Some slots were not available, Select new slots')
          setStage('slots');
          return 'invalid'
        }
      }
    }
    return 'VALID'
  }
  function formatCurrentDateTime() {
    const now = new Date();
  
    // Helper function to add a leading zero to single-digit numbers
    const padToTwoDigits = (num) => String(num).padStart(2, '0');
  
    const year = now.getFullYear();
    const month = padToTwoDigits(now.getMonth() + 1); // Month is 0-indexed
    const day = padToTwoDigits(now.getDate());
    const hours = padToTwoDigits(now.getHours());
    const minutes = padToTwoDigits(now.getMinutes());
    const seconds = padToTwoDigits(now.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const payNowSkip = async () => {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      setLoading(false);
      setErrorMsg('Please login again.');
      return;
    }

    const user = userData.user;
    const email = user.email || '';
    let val = await VerifyTimeSlots();
    if (val === 'VALID'){
      const formattedDateTime = formatCurrentDateTime();
      console.log('selectedSlots:', selectedSlots);
      console.log('formattedDateTime:', formattedDateTime);
      await supabase.from('availability_slots').update({status:'pendingAstroApproval', updated_at: formattedDateTime}).in('id',selectedSlots)

    const insert = await supabase.from('consultations').insert({
            user_id: user.id,
            name: form.name.trim(),
            date_of_birth: form.dob,
            time_of_birth: form.tob,
            place_of_birth: form.pob.trim(),
            queries: form.queries.trim(),
            status: 'active',
            amount_inr: CONSULTATION_AMOUNT_INR,
            razorpay_order_id: 'order.order_id',
            razorpay_payment_id: 'response.razorpay_payment_id',
            topics: topics,
            preferred_slots: selectedSlots,
          }).select('*').single();
    if (insert.error) {
                setErrorMsg('Payment succeeded but saving your consultation failed. Please contact support with your payment id.');
                setLoading(false);
                console.log(insert.error);
                return;
              }
    setStage('success');
  }
  }
  
    
  const payNow = async () => {
    setErrorMsg('');
    if (!razorpayReady) {
      setErrorMsg('Payment system is still loading. Please try again in a moment.');
      return;
    }

    setLoading(true);
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      setLoading(false);
      setErrorMsg('Please login again.');
      return;
    }

    const user = userData.user;
    const email = user.email || '';

    const createOrderRes = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount_inr: CONSULTATION_AMOUNT_INR,
        receipt: `consult_${user.id}_${Date.now()}`,
      }),
    });

    if (!createOrderRes.ok) {
      setLoading(false);
      setErrorMsg('Failed to initiate payment. Please try again.');
      return;
    }

    const order = await createOrderRes.json();

    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: 'Astro Shipra Mathur',
      description: 'Consultation booking',
      order_id: order.order_id,
      prefill: {
        name: form.name.trim(),
        email,
      },
      theme: { color: '#3E2A1A' },
      handler: async (response) => {
        try {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order_id: order.order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyRes.ok) {
            setErrorMsg('Payment verification failed. If money was deducted, contact support with your payment id.');
            setLoading(false);
            return;
          }

          const { verified } = await verifyRes.json();
          if (!verified) {
            setErrorMsg('Payment verification failed. If money was deducted, contact support with your payment id.');
            setLoading(false);
            return;
          }

          const insert = await supabase.from('consultations').insert({
            user_id: user.id,
            name: form.name.trim(),
            date_of_birth: form.dob,
            time_of_birth: form.tob,
            place_of_birth: form.pob.trim(),
            queries: form.queries.trim(),
            topics,
            preferred_slots: selectedSlots,
            status: 'pending',
            amount_inr: CONSULTATION_AMOUNT_INR,
            razorpay_order_id: order.order_id,
            razorpay_payment_id: response.razorpay_payment_id,
          }).select('*').single();

          if (insert.error) {
            setErrorMsg('Payment succeeded but saving your consultation failed. Please contact support with your payment id.');
            setLoading(false);
            return;
          }

          setReceipt(insert.data);
          setStage('success');
          setLoading(false);
        } catch (e) {
          setErrorMsg('Payment completed but something went wrong. Please contact support with your payment id.');
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    setLoading(false);
    // eslint-disable-next-line no-undef
    const rz = new window.Razorpay(options);
    rz.open();
  };
  const fetchCities = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6`
      );
      if (!res.ok) {
        setSuggestions([]);
        return;
      }
      const data = await res.json();
      const cities =
        data?.features
          ?.map((f) => f?.properties)
          ?.filter(Boolean)
          .map((p) => ({
            name: p.city || p.name || p.town || p.village,
            country: p.country,
          }))
          .filter((c) => c.name && c.country) || [];
      setSuggestions(cities);
    } catch (_e) {
      setSuggestions([]);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-vedic-brown mb-2">
          Book a new consultation
        </h1>
        <p className="text-vedic-brown/70 font-light">
          Fill in your birth details and your specific queries. After submission, payment will open without leaving this page.
        </p>
      </div>

      {errorMsg ? (
        <div className="mb-4 rounded-md border border-vedic-brown/10 bg-white/60 px-4 py-3 text-sm text-vedic-brown">
          {errorMsg}
        </div>
      ) : null}

      {stage !== 'success' ? (
        <div className="glass-panel rounded-lg p-6 shadow-sm">
          {stage === 'form' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={onChange('name')}
                    className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                    Date of birth
                  </label>
                  <input
                    value={form.dob}
                    onChange={onChange('dob')}
                    className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                    type="date"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                    Time of birth
                  </label>
                  <input
                    value={form.tob}
                    onChange={onChange('tob')}
                    className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                    type="time"
                  />
                </div>

                <div className="relative">
      <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
        Place of birth
      </label>

      <input
        value={form.pob}
        onChange={(e) => {
          const val = e.target.value;
          setForm({ ...form, pob: val });
          fetchCities(val);
        }}
        placeholder="City, Country"
        className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none"
      />

      {/* Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white border w-full rounded-md mt-1 shadow">
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => {
                setForm({ ...form, pob: `${s.name}, ${s.country}` });
                setSuggestions([]);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s.name}, {s.country}
            </div>
          ))}
        </div>
      )}
    </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                  Specific queries for this consultation
                </label>
                <textarea
                  value={form.queries}
                  onChange={onChange('queries')}
                  rows={6}
                  className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                  placeholder="Example: Career switch timing, marriage prospects, health routines, relocation, etc."
                />
              </div>

          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
              Topics / Services — select all that apply *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOPICS.map((t) => {
                const selected = topics.includes(t.value);
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => toggleTopic(t.value)}
                    className={[
                      'text-left rounded-md px-4 py-3 border text-sm font-medium transition-colors',
                      selected
                        ? 'bg-vedic-brown text-white border-vedic-brown'
                        : 'bg-white/60 text-vedic-brown border-vedic-brown/10 hover:bg-vedic-brown/5',
                    ].join(' ')}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-vedic-brown/60">
              Click to select one or more topics
            </p>
          </div>

              <button
                type="button"
                onClick={proceedToSlots}
                className="mt-6 w-full px-10 py-4 bg-vedic-brown text-white rounded-sm text-sm font-semibold hover:bg-vedic-cosmic transition-colors uppercase tracking-wide"
              >
                Continue
              </button>
            </>
          ) : null}

          {stage === 'slots' ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/60">
                    Step 2
                  </div>
                  <h2 className="text-2xl font-serif text-vedic-brown">
                    Choose your top 3 preferred time slots
                  </h2>
                  <p className="mt-1 text-sm text-vedic-brown/70 font-light">
                    Slots are 1 hour each and shown in your local time. Select exactly 3.
                  </p>
                </div>

                <div className="rounded-md border border-vedic-brown/10 bg-white/60 px-3 py-2 text-xs text-vedic-brown/70">
                  Selected: <span className="font-semibold text-vedic-brown">{selectedSlots.length}</span>/3
                </div>
              </div>

              <div className="mt-5">
                {slotsLoading ? (
                  <div className="rounded-lg border border-vedic-brown/10 bg-white/60 p-4">
                    Loading available slots…
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="rounded-lg border border-vedic-brown/10 bg-white/60 p-4">
                    No slots available for tomorrow through the next 7 days. Please check back later.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {slotsByDate.map(([dateLabel, items]) => (
                      <div key={dateLabel} className="rounded-lg border border-vedic-brown/10 bg-white/50 p-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-3">
                          {dateLabel}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {items.map((s) => {
                            const start = new Date(s.start_at);
                            const end = new Date(s.end_at);
                            const label = `${start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} – ${end.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`;
                            const selected = selectedSlots.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => toggleSlot(s.id)}
                                className={[
                                  'px-3 py-2 rounded-md border text-sm font-medium transition-colors',
                                  selected
                                    ? 'bg-vedic-brown text-white border-vedic-brown'
                                    : 'bg-white/60 text-vedic-brown border-vedic-brown/10 hover:bg-vedic-brown/5',
                                  !selected && selectedSlots.length >= 3 ? 'opacity-60' : '',
                                ].join(' ')}
                                disabled={!selected && selectedSlots.length >= 3}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={backToForm}
                  className="w-full sm:w-auto px-8 py-3 border border-vedic-brown/20 text-vedic-brown rounded-sm text-sm font-semibold hover:bg-vedic-brown/5 transition-colors uppercase tracking-wide"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={proceedToPayment}
                  className="w-full sm:flex-1 px-10 py-4 bg-vedic-brown text-white rounded-sm text-sm font-semibold hover:bg-vedic-cosmic transition-colors uppercase tracking-wide"
                >
                  Continue to payment
                </button>
              </div>
            </div>
          ) : null}

          {stage === 'pay' ? (
            <div className="mt-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/60">
                    Step 3
                  </div>
                  <h2 className="text-2xl font-serif text-vedic-brown">Payment</h2>
                  <p className="mt-1 text-sm text-vedic-brown/70 font-light">
                    Payment opens in a secure Razorpay window (no page change).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={backToSlots}
                  className="px-4 py-2 border border-vedic-brown/20 text-vedic-brown rounded-sm text-xs font-semibold hover:bg-vedic-brown/5 transition-colors uppercase tracking-wide"
                >
                  Edit slots
                </button>
              </div>

              <div className="mt-4 rounded-lg border border-vedic-brown/10 bg-white/60 p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/60">
                    Consultation fee
                  </div>
                  <div className="text-2xl font-serif text-vedic-brown">
                    {formatInr(CONSULTATION_AMOUNT_INR)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={payNowSkip}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-gold text-white rounded-sm text-sm font-semibold hover:shadow-lg hover:shadow-vedic-gold/20 transition-all uppercase tracking-wide disabled:opacity-60"
                >
                  {loading ? 'Opening...' : 'Pay with Razorpay'}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="glass-panel rounded-lg p-8 shadow-sm">
          <div className="text-xs uppercase tracking-[0.25em] text-vedic-brown/60 mb-3">
            Consultation placed
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-vedic-brown mb-3">
            Payment successful
          </h2>
          <p className="text-vedic-brown/70 font-light leading-relaxed mb-6">
            Your consultation has been recorded.
          </p>
          <div className="rounded-lg border border-vedic-brown/10 bg-white/60 p-4">
            <div className="text-sm text-vedic-brown/80">
              <span className="font-medium text-vedic-brown">Estimated approval time:</span>{' '}
              within 24–48 hours
            </div>
            {receipt?.razorpay_payment_id ? (
              <div className="mt-2 text-xs text-vedic-brown/60">
                Payment id: {receipt.razorpay_payment_id}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

