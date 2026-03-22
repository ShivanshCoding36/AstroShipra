import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { getZodiacSign, zodiacEmoji } from '../../lib/zodiac';
import { LuChevronLeft, LuChevronRight, LuHistory, LuDoorClosed, LuLogOut, LuPlus, LuSettings, LuZap } from 'react-icons/lu';

function SidebarLink({ to, icon: Icon, children, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive ? 'bg-vedic-brown text-white' : 'text-vedic-brown/80 hover:bg-vedic-brown/5',
        ].join(' ')
      }
    >
      <Icon size={18} />
      {!collapsed ? <span>{children}</span> : null}
    </NavLink>
  );
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const [signLabel, setSignLabel] = useState('Your Zodiac Sign');
  const [signEmoji, setSignEmoji] = useState('✦');

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/login', { replace: true });
        return;
      }
      setUserName(data.user.user_metadata?.name || data.user.email || 'Account');

      const dob = data.user.user_metadata?.dob ? new Date(data.user.user_metadata.dob) : null;
      const sign = dob ? getZodiacSign(dob) : null;
      setSignLabel(sign || 'Your Zodiac Sign');
      setSignEmoji(zodiacEmoji(sign));
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session?.user) navigate('/login', { replace: true });
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, [navigate]);

  const sidebarWidth = useMemo(() => (collapsed ? 'w-[76px]' : 'w-[280px]'), [collapsed]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex">
      <motion.aside
        className={`fixed left-0 top-0 h-full ${sidebarWidth} bg-vedic-cream/90 backdrop-blur-md border-r border-vedic-brown/10 z-40`}
        animate={{ width: collapsed ? 76 : 280 }}
        transition={{ duration: 0.25 }}
      >
        <div className="h-full flex flex-col p-4 gap-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard/book" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-vedic-brown text-vedic-cream flex items-center justify-center font-serif text-lg">
                {signEmoji}
              </div>
              {!collapsed ? (
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-vedic-brown">{signLabel}</div>
                  <div className="text-xs text-vedic-brown/60">Dashboard</div>
                </div>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="h-9 w-9 rounded-md border border-vedic-brown/10 hover:bg-vedic-brown/5 text-vedic-brown flex items-center justify-center transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
            </button>
          </div>

          <div className="mt-2 flex-1 flex flex-col gap-1">
            <SidebarLink to="/dashboard/active" icon={LuZap} collapsed={collapsed}>
              Active consultations
            </SidebarLink>
            <SidebarLink to="/dashboard/history" icon={LuHistory} collapsed={collapsed}>
              Previous consultations
            </SidebarLink>
            <SidebarLink to="/" icon={LuDoorClosed} collapsed={collapsed}>
              Landing page
            </SidebarLink>
            <SidebarLink to="/dashboard/book" icon={LuPlus} collapsed={collapsed}>
              Book a consultation
            </SidebarLink>
            <SidebarLink to="/dashboard/settings" icon={LuSettings} collapsed={collapsed}>
              Settings
            </SidebarLink>
          </div>

          <div className="border-t border-vedic-brown/10 pt-3">
            {!collapsed ? (
              <div className="mb-2">
                <div className="text-xs uppercase tracking-[0.2em] text-vedic-brown/50">
                  Account
                </div>
                <div className="text-sm font-medium text-vedic-brown truncate">{userName}</div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold bg-vedic-brown text-white hover:bg-vedic-cosmic transition-colors"
            >
              <LuLogOut size={16} />
              {!collapsed ? 'Logout' : null}
            </button>
          </div>
        </div>
      </motion.aside>

      <main
        className="flex-1"
        style={{ marginLeft: collapsed ? 76 : 280, transition: 'margin-left 250ms' }}
      >
        <div className="min-h-screen px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

