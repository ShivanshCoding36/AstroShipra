import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { LuLogOut, LuSun } from 'react-icons/lu';

export default function Navbar() {
  const [username, setUsername] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sync = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      setIsAuthed(Boolean(user));
      setUsername(user?.user_metadata?.name || user?.email || '');
    };
    sync();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      sync();
    });

    return () => sub?.subscription?.unsubscribe?.();
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      navigate('/login');
    }
  };

  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b border-vedic-brown/5 bg-vedic-cream/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full border border-vedic-brown flex items-center justify-center group-hover:bg-vedic-brown group-hover:text-vedic-cream transition-colors duration-300">
            <LuSun size={18} />
          </div>
          <span className="text-xl font-serif font-medium tracking-tight text-vedic-brown">
            Astro Shipra
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-vedic-brown/70">
          <Link to="/" className="hover:text-vedic-brown transition-colors">
            Home
          </Link>
          <a href="#faq" className="hover:text-vedic-brown transition-colors">
            FAQ
          </a>
          {isAuthed ? (
            <Link to="/dashboard/book" className="hover:text-vedic-brown transition-colors">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="hover:text-vedic-brown transition-colors">
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthed ? (
            <>
              <span className="hidden sm:inline text-sm text-vedic-brown/70">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-vedic-brown hover:bg-vedic-cosmic transition-all duration-300 rounded-sm"
              >
                <LuLogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-vedic-brown hover:bg-vedic-cosmic transition-all duration-300 rounded-sm"
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}