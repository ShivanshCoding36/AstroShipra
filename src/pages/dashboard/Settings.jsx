import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { randomPassword } from '../../lib/crypto';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const [passwordLoginEnabled, setPasswordLoginEnabled] = useState(true);
  const [newPassword, setNewPassword] = useState('');
   const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPasswordDirect, setNewPasswordDirect] = useState('');

  useEffect(() => {
    const run = async () => {
      setErrorMsg('');
      setOkMsg('');
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      setLoading(false);
      if (!user) {
        setErrorMsg('Please login again.');
        return;
      }
      const enabled = user.user_metadata?.password_login_enabled;
      setPasswordLoginEnabled(enabled !== false);
      setName(user.user_metadata?.name || '');
      setInitialName(user.user_metadata?.name || '');
    };
    run();
  }, []);

  const canEnable = useMemo(() => newPassword.length >= 8, [newPassword]);
  const nameChanged = useMemo(
    () => name.trim() && name.trim() !== initialName.trim(),
    [name, initialName]
  );

  const disablePasswordLogin = async () => {
    setErrorMsg('');
    setOkMsg('');
    const confirmed = window.confirm(
      'Disable password login?\n\nYou will still be able to login using OTP. To re-enable password login later, you must set a new password from this settings page (while logged in via OTP).'
    );
    if (!confirmed) return;

    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      password: randomPassword(),
      data: { password_login_enabled: false },
    });
    setSaving(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setPasswordLoginEnabled(false);
    setOkMsg('Password login disabled. Use OTP to login next time.');
  };

  const enablePasswordLogin = async () => {
    setErrorMsg('');
    setOkMsg('');
    if (!canEnable) {
      setErrorMsg('New password must be at least 8 characters.');
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
      data: { password_login_enabled: true },
    });
    setSaving(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setPasswordLoginEnabled(true);
    setNewPassword('');
    setOkMsg('Password login enabled.');
  };

  const updateName = async () => {
    setErrorMsg('');
    setOkMsg('');
    if (!nameChanged) return;
    setSaving(true);
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      setSaving(false);
      setErrorMsg('Please login again.');
      return;
    }
    const { error } = await supabase.auth.updateUser({
      data: { ...user.user_metadata, name: name.trim() },
    });
    setSaving(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setInitialName(name.trim());
    setOkMsg('Name updated.');
  };

  const changePasswordDirect = async () => {
    setErrorMsg('');
    setOkMsg('');
    if (newPasswordDirect.length < 8) {
      setErrorMsg('New password must be at least 8 characters.');
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      password: newPasswordDirect,
    });
    setSaving(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setCurrentPassword('');
    setNewPasswordDirect('');
    setOkMsg('Password updated.');
  };

  const deleteAccount = async () => {
    setErrorMsg('');
    setOkMsg('');
    const confirmed = window.confirm(
      'Delete your account?\n\nThis will sign you out and mark your account for deletion. For full data erasure, please also contact support.'
    );
    if (!confirmed) return;

    setSaving(true);
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      setSaving(false);
      setErrorMsg('Please login again.');
      return;
    }
    const { error } = await supabase.auth.updateUser({
      data: { ...user.user_metadata, deleted_at: new Date().toISOString() },
    });
    if (error) {
      setSaving(false);
      setErrorMsg(error.message);
      return;
    }
    await supabase.auth.signOut();
    setSaving(false);
    window.location.href = '/';
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-vedic-brown mb-2">
          Settings
        </h1>
        <p className="text-vedic-brown/70 font-light">
          Control how you login to your account.
        </p>
      </div>

      {errorMsg ? (
        <div className="mb-4 rounded-md border border-vedic-brown/10 bg-white/60 px-4 py-3 text-sm text-vedic-brown">
          {errorMsg}
        </div>
      ) : null}
      {okMsg ? (
        <div className="mb-4 rounded-md border border-vedic-gold/30 bg-vedic-gold/10 px-4 py-3 text-sm text-vedic-brown">
          {okMsg}
        </div>
      ) : null}

      {loading ? (
        <div className="glass-panel rounded-lg p-6">Loading…</div>
      ) : (
        <div className="space-y-6">
          <div className="glass-panel rounded-lg p-6 shadow-sm space-y-4">
            <div className="text-sm font-medium text-vedic-brown">
              Profile
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                placeholder="Your name"
              />
            </div>
            <button
              type="button"
              onClick={updateName}
              disabled={saving || !nameChanged}
              className="w-full px-8 py-3 bg-vedic-brown text-white rounded-sm text-sm font-semibold hover:bg-vedic-cosmic transition-colors uppercase tracking-wide disabled:opacity-60"
            >
              Save name
            </button>
          </div>

          <div className="glass-panel rounded-lg p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-sm font-medium text-vedic-brown">
                  Password login
                </div>
                <div className="text-sm text-vedic-brown/70 font-light mt-1">
                  When disabled, password login will stop working and you’ll need to login using OTP.
                </div>
              </div>

              <div className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-vedic-brown/10 bg-white/60 text-vedic-brown">
                {passwordLoginEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>

            {passwordLoginEnabled ? (
              <button
                type="button"
                onClick={disablePasswordLogin}
                disabled={saving}
                className="mt-2 w-full px-10 py-4 bg-vedic-brown text-white rounded-sm text-sm font-semibold hover:bg-vedic-cosmic transition-colors uppercase tracking-wide disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Disable password login'}
              </button>
            ) : (
              <div className="mt-2 space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                    Set new password
                  </label>
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                    type="password"
                    placeholder="Min 8 characters"
                    autoComplete="new-password"
                  />
                </div>

                <button
                  type="button"
                  onClick={enablePasswordLogin}
                  disabled={saving}
                  className="w-full px-10 py-4 bg-gradient-gold text-white rounded-sm text-sm font-semibold hover:shadow-lg hover:shadow-vedic-gold/20 transition-all uppercase tracking-wide disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Enable password login'}
                </button>
              </div>
            )}
          </div>

          <div className="glass-panel rounded-lg p-6 shadow-sm space-y-4">
            <div className="text-sm font-medium text-vedic-brown">
              Change password
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                  Current password
                </label>
                <input
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-vedic-brown/60 mb-2">
                  New password
                </label>
                <input
                  value={newPasswordDirect}
                  onChange={(e) => setNewPasswordDirect(e.target.value)}
                  className="w-full rounded-md border border-vedic-brown/10 bg-white/70 px-4 py-3 outline-none focus:ring-0"
                  type="password"
                  placeholder="Min 8 characters"
                  autoComplete="new-password"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={changePasswordDirect}
              disabled={saving}
              className="w-full px-10 py-4 bg-vedic-brown text-white rounded-sm text-sm font-semibold hover:bg-vedic-cosmic transition-colors uppercase tracking-wide disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Update password'}
            </button>
          </div>

          <div className="glass-panel rounded-lg p-6 shadow-sm space-y-3 border border-red-200/60">
            <div className="text-sm font-medium text-red-800">
              Delete account
            </div>
            <p className="text-xs text-red-900/80 font-light">
              This will sign you out and mark your account as deleted. For full data erasure, please also email support with your registered email.
            </p>
            <button
              type="button"
              onClick={deleteAccount}
              disabled={saving}
              className="w-full px-10 py-3 bg-red-700 text-white rounded-sm text-sm font-semibold hover:bg-red-800 transition-colors uppercase tracking-wide disabled:opacity-60"
            >
              Delete account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

