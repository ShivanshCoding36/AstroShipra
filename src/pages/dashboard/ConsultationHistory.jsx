import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function fmtDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

function formatSlotIST(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export default function ConsultationHistory() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  

  useEffect(() => {
    const run = async () => {
      setErrorMsg('');
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        setLoading(false);
        setErrorMsg('Please login again.');
        return;
      }

      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
        return;
      }
      setRows(data || []);
      console.log(data);
    };
    run();
  }, 60000);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-vedic-brown mb-2">
          Previous consultations
        </h1>
        <p className="text-vedic-brown/70 font-light">
          Your submitted consultations and payment status.
        </p>
      </div>

      {errorMsg ? (
        <div className="mb-4 rounded-md border border-vedic-brown/10 bg-white/60 px-4 py-3 text-sm text-vedic-brown">
          {errorMsg}
        </div>
      ) : null}

      {loading ? (
        <div className="glass-panel rounded-lg p-6">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="glass-panel rounded-lg p-6">
          <div className="text-vedic-brown font-medium mb-1">No consultations yet</div>
          <div className="text-sm text-vedic-brown/70 font-light">
            Book your first consultation from the sidebar.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {rows.map((r) => (
            <div key={r.id} className="glass-panel rounded-lg p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/60">
                    {fmtDate(r.created_at)}
                  </div>
                  <div className="text-xl font-serif text-vedic-brown">
                    {r.name}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span
                    className={[
                      'text-xs uppercase tracking-wide px-3 py-1 rounded-full border'
                    ].join(' ')}
                  >
                    {r.status || 'unknown'}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-vedic-brown/80">
                <div className="rounded-md border border-vedic-brown/10 bg-white/60 px-3 py-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50">
                    DOB
                  </div>
                  <div className="font-medium text-vedic-brown">{r.date_of_birth}</div>
                </div>
                <div className="rounded-md border border-vedic-brown/10 bg-white/60 px-3 py-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50">
                    TOB
                  </div>
                  <div className="font-medium text-vedic-brown">{r.time_of_birth}</div>
                </div>
                <div className="rounded-md border border-vedic-brown/10 bg-white/60 px-3 py-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50">
                    POB
                  </div>
                  <div className="font-medium text-vedic-brown truncate">{r.place_of_birth}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50 mb-2">
                  Queries
                </div>
                <div className="text-sm text-vedic-brown/80 font-light leading-relaxed whitespace-pre-wrap">
                  {r.queries}
                </div>
              </div>
              {['slot_selected', 'completed'].includes(String(r.status).toLowerCase()) && (
                <div className="mt-4 p-3 rounded-md bg-vedic-cosmic/5 border border-vedic-cosmic/20 space-y-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50">
                    Session Details
                  </div>

                  {/* Time */}
                  {r.scheduled_slot && (
                    <div className="text-sm text-vedic-brown/80">
                      🕒 {formatSlotIST(r.scheduled_slot)}
                    </div>
                  )}

                  {/* Meet Link */}
                  {r.google_meet_link && (
                    <div>
                      <a
                        href={r.google_meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-vedic-cosmic underline break-all"
                      >
                        Join Google Meet
                      </a>
                    </div>
                  )}
                </div>
              )}

              {r.razorpay_payment_id ? (
                <div className="mt-4 text-xs text-vedic-brown/60">
                  Payment id: {r.razorpay_payment_id}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

