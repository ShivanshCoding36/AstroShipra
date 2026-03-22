import { useEffect, useState } from 'react';

let loadPromise;

function loadRazorpayScript() {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
  return loadPromise;
}

export function useRazorpayReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let mounted = true;
    loadRazorpayScript().then((ok) => {
      if (mounted) setReady(Boolean(ok));
    });
    return () => {
      mounted = false;
    };
  }, []);
  return ready;
}

