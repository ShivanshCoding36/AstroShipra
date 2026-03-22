import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // form | otp
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const canSendOtp = useMemo(() => {
    if (!name.trim()) return false;
    if (!isValidEmail(email.trim())) return false;
    if (password.length < 8) return false;
    return true;
  }, [name, email, password]);

  const sendOtp = async () => {
    setErrorMsg('');
    if (!canSendOtp) {
      setErrorMsg('Please enter a valid name, email, and a password (min 8 characters).');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: undefined,
        data: { name: name.trim(), password: password },
      },
    });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      console.log(error);
      return;
    }
    setStep('otp');
  };

  const verifyOtp = async () => {
    setErrorMsg('');
    if (!otp.trim()) {
      setErrorMsg('Enter the OTP sent to your email.');
      return;
    }
    setLoading(true);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: 'email',
    });

    if (verifyError) {
      setLoading(false);
      setErrorMsg(verifyError.message);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { name: name.trim(), password_login_enabled: true },
    });
    setLoading(false);

    if (updateError) {
      setErrorMsg(updateError.message);
      return;
    }

    navigate('/dashboard/book');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg glass-panel rounded-lg p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-vedic-brown mb-2">
            Create your account
          </h1>
          <p className="text-vedic-brown/70 text-sm font-light">
            We’ll email you an OTP. After verification, you’ll be redirected to book a new consultation.
          </p>
        </div>

        {errorMsg ? (
          <div className="mb-4 rounded-md border border-vedic-brown/10 bg-white/50 px-4 py-3 text-sm text-vedic-brown">
            {errorMsg}
          </div>
        ) : null}

        {step === 'form' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                placeholder="Min 8 characters"
                type="password"
                autoComplete="new-password"
              />
              <p className="mt-2 text-xs text-vedic-brown/60">
                You can later disable password login from settings and use OTP-only.
              </p>
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full px-10 py-4 bg-gradient-gold text-white rounded-sm text-sm font-semibold hover:shadow-lg hover:shadow-vedic-gold/20 transition-all uppercase tracking-wide disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <p className="text-center text-sm text-vedic-brown/70">
              Already have an account?{' '}
              <Link className="text-vedic-cosmic underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border border-vedic-brown/10 bg-white/50 px-4 py-3 text-sm text-vedic-brown/80">
              OTP sent to <span className="font-medium text-vedic-brown">{email.trim()}</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                Enter OTP
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                placeholder="8-digit code"
                inputMode="numeric"
              />
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full px-10 py-4 bg-vedic-brown text-white rounded-sm text-sm font-semibold hover:bg-vedic-cosmic transition-colors uppercase tracking-wide disabled:opacity-60"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full px-10 py-3 border border-vedic-brown/20 text-vedic-brown rounded-sm text-sm font-semibold hover:bg-vedic-brown/5 transition-colors uppercase tracking-wide disabled:opacity-60"
            >
              Resend OTP
            </button>

            <button
              onClick={() => setStep('form')}
              disabled={loading}
              className="w-full text-sm text-vedic-brown/70 underline disabled:opacity-60"
            >
              Change details
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
