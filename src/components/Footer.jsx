import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaEnvelope, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/dashboard')) return null;

  return (
    <footer className="bg-[#2a1c11] text-vedic-cream/60 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm">
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Astro Shipra Mathur</h3>
          <p>Vedic astrology, research-driven insights, and practical remedies.</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Legal</h3>
          <ul className="space-y-1">
            <li><a href="#" className="text-vedic-gold hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="text-vedic-gold hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Creator</h3>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.linkedin.com/in/ShivanshMathur9/" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-vedic-gold" size={18} />
            </a>
            <a href="mailto:shivanshmathur221@gmail.com">
              <FaEnvelope className="hover:text-vedic-gold" size={18} />
            </a>
            <a href="https://www.youtube.com/@shivanshmathur9" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-vedic-gold" size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Connect With Us</h3>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-vedic-gold" size={20} />
            </a>
            <a href="">
              <FaEnvelope className="hover:text-vedic-gold" size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-vedic-cream/40">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;