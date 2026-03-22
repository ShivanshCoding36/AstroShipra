import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('password'); // password | otp
  const [otpStep, setOtpStep] = useState('request'); // request | verify
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const canRequestOtp = useMemo(() => isValidEmail(email.trim()), [email]);


  const checkIfBlockes = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    const { data_block, error } = await supabase
        .from('profiles')
        .select('blocked')
        .eq('user_id', user.id);
    if (data_block){
      return
    }
    window.alert(
      'Your Account Has been blocked!\n\nContact us at astroshipramathur@gmail.com if you think this is a mistake.'
    );
    supabase.auth.signOut()
    navigate('/');
  }

  const loginWithPassword = async () => {
    setErrorMsg('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    navigate('/dashboard/book');
  };

  const requestOtp = async () => {
    setErrorMsg('');
    if (!canRequestOtp) {
      setErrorMsg('Enter a valid email address.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
    });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setOtpStep('verify');
  };

  const verifyOtp = async () => {
    setErrorMsg('');
    if (!otp.trim()) {
      setErrorMsg('Enter the OTP sent to your email.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: 'email',
    });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    await 
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
            Login
          </h1>
          <p className="text-vedic-brown/70 text-sm font-light">
            Login using password or OTP (email).
          </p>
        </div>

        {errorMsg ? (
          <div className="mb-4 rounded-md border border-vedic-brown/10 bg-white/50 px-4 py-3 text-sm text-vedic-brown">
            {errorMsg}
          </div>
        ) : null}

        <div className="grid grid-cols-2 rounded-sm border border-vedic-brown/10 overflow-hidden mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('password');
              setOtpStep('request');
            }}
            className={`py-3 text-sm font-semibold uppercase tracking-wide ${
              mode === 'password' ? 'bg-vedic-brown text-white' : 'bg-white/60 text-vedic-brown'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('otp');
              setOtpStep('request');
            }}
            className={`py-3 text-sm font-semibold uppercase tracking-wide ${
              mode === 'otp' ? 'bg-vedic-brown text-white' : 'bg-white/60 text-vedic-brown'
            }`}
          >
            OTP
          </button>
        </div>

        <div className="space-y-4">
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

          {mode === 'password' ? (
            <>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                  placeholder="Your password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>

              <button
                onClick={loginWithPassword}
                disabled={loading}
                className="w-full px-10 py-4 bg-gradient-gold text-white rounded-sm text-sm font-semibold hover:shadow-lg hover:shadow-vedic-gold/20 transition-all uppercase tracking-wide disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </>
          ) : (
            <>
              {otpStep === 'request' ? (
                <button
                  onClick={requestOtp}
                  disabled={loading}
                  className="w-full px-10 py-4 bg-gradient-gold text-white rounded-sm text-sm font-semibold hover:shadow-lg hover:shadow-vedic-gold/20 transition-all uppercase tracking-wide disabled:opacity-60"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              ) : (
                <>
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
                    onClick={requestOtp}
                    disabled={loading}
                    className="w-full px-10 py-3 border border-vedic-brown/20 text-vedic-brown rounded-sm text-sm font-semibold hover:bg-vedic-brown/5 transition-colors uppercase tracking-wide disabled:opacity-60"
                  >
                    Resend OTP
                  </button>

                  <button
                    onClick={() => setOtpStep('request')}
                    disabled={loading}
                    className="w-full text-sm text-vedic-brown/70 underline disabled:opacity-60"
                  >
                    Use different email
                  </button>
                </>
              )}
            </>
          )}

          <p className="text-center text-sm text-vedic-brown/70">
            Don’t have an account?{' '}
            <Link className="text-vedic-cosmic underline" to="/signup">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
