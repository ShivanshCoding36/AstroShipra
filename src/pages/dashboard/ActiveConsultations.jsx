import React, { useEffect, useMemo, useState } from 'react';
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

function normalizeStatus(s) {
  return String(s || '').trim().toLowerCase();
}

function Card({ row, title }) {
  return (
    <div className="glass-panel rounded-lg p-6 shadow-sm">
      {title ? (
        <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
          {title}
        </div>
      ) : null}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/60">
            {fmtDate(row.created_at)}
          </div>
          <div className="text-xl font-serif text-vedic-brown">{row.name}</div>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border bg-vedic-gold/10 border-vedic-gold/30 text-vedic-brown">
            {row.status}
          </span>
        </div>
      </div>

      {Array.isArray(row.topics) && row.topics.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {row.topics.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full border border-vedic-brown/10 bg-white/60 text-vedic-brown/80"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4">
        <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50 mb-2">
          Queries
        </div>
        <div className="text-sm text-vedic-brown/80 font-light leading-relaxed whitespace-pre-wrap">
          {row.queries}
        </div>
      </div>
      {normalizeStatus(row.status) === 'slot_selected' && (
  <div className="mt-4 p-3 rounded-md bg-vedic-cosmic/5 border border-vedic-cosmic/20 space-y-2">
    <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50">
      Scheduled Session
    </div>

    {/* Time Slot */}
    {row.scheduled_slot && (
      <div className="text-sm text-vedic-brown/80">
        🕒 {formatSlotIST(row.scheduled_slot)}
      </div>
    )}

    {/* Google Meet Link */}
    {row.google_meet_link && (
      <div>
        <a
          href={row.google_meet_link}
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
      
    </div>
  );
}

export default function ActiveConsultations() {
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
    };
    run();
  }, 60000);
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
  const pending = useMemo(
    () => rows.filter((r) => {
      const s = normalizeStatus(r.status);
      return ['active', 'slot_selected'].includes(s);
    }),
    [rows]
  );
  const latest = rows[0] || null;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-vedic-brown mb-2">
          Active consultations
        </h1>
        <p className="text-vedic-brown/70 font-light">
          Consultations that are currently pending.
        </p>
      </div>

      {errorMsg ? (
        <div className="mb-4 rounded-md border border-vedic-brown/10 bg-white/60 px-4 py-3 text-sm text-vedic-brown">
          {errorMsg}
        </div>
      ) : null}

      {loading ? (
        <div className="glass-panel rounded-lg p-6">Loading…</div>
      ) : pending.length ? (
        <div className="grid grid-cols-1 gap-4">
          {pending.map((r) => (
            <Card key={r.id} row={r} />
          ))}
        </div>
      ) : latest ? (
        <Card row={latest} title="No pending consultations. Latest consultation:" />
      ) : (
        <div className="glass-panel rounded-lg p-6">
          <div className="text-vedic-brown font-medium mb-1">No consultations yet</div>
          <div className="text-sm text-vedic-brown/70 font-light">
            Book your first consultation from the sidebar.
          </div>
        </div>
      )}
    </div>
  );
}

