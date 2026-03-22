import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight, LuMoon, LuSparkles, LuStar } from 'react-icons/lu';

const faqs = [
  {
    q: 'How does consultation booking work?',
    a: 'Create your account, fill in your birth details + questions, and complete payment. You’ll then see a confirmation with an estimated response time.',
  },
  {
    q: 'What details do I need?',
    a: 'Name, date of birth, time of birth, place of birth, and the specific questions you want answered in this consultation.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your consultation details are stored securely and tied to your account, so only you can view your history when logged in.',
  },
];

export default function LandingPage() {
  const accents = useMemo(
    () => [
      { label: 'Career', desc: 'Timing windows, role changes, strategy.' },
      { label: 'Relationships', desc: 'Compatibility, clarity, milestones.' },
      { label: 'Health', desc: 'Patterns, routines, and focus areas.' },
    ],
    []
  );

  return (
    <div className="min-h-screen text-vedic-brown">
      <header className="relative pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vedic-gold/10 border border-vedic-gold/30 text-xs font-semibold uppercase tracking-[0.2em] text-vedic-brown mb-8">
              <LuSparkles className="text-vedic-gold" />
              Vedic Precision
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-vedic-brown mb-6 leading-[1.1]">
              Align with your <br />
              <span className="text-vedic-cosmic italic">cosmic truth.</span>
            </h1>

            <p className="text-vedic-brown/70 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              Book a research-driven Vedic astrology consultation to get clear timelines, practical remedies, and confident decisions for your next phase.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-10 py-4 bg-gradient-gold text-white rounded-sm text-sm font-semibold hover:shadow-lg hover:shadow-vedic-gold/20 transition-all flex items-center justify-center gap-2 tracking-wide uppercase"
              >
                Book Consultation
                <LuArrowRight className="text-[14px]" />
              </Link>
              <a
                href="#faq"
                className="w-full sm:w-auto px-10 py-4 border border-vedic-brown/20 text-vedic-brown rounded-sm text-sm font-semibold hover:bg-vedic-brown/5 transition-colors uppercase tracking-wide"
              >
                View FAQ
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-vedic-brown/50">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                <span className="inline-block h-2 w-2 rounded-full bg-vedic-gold" />
                Secure payment
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-vedic-cream bg-vedic-gold/50" />
                <div className="w-8 h-8 rounded-full border-2 border-vedic-cream bg-vedic-cosmic/50" />
                <div className="w-8 h-8 rounded-full border-2 border-vedic-cream bg-vedic-brown/50 flex items-center justify-center text-[10px] text-white font-medium">
                  +1k
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center items-center">
            <div className="absolute inset-0 bg-vedic-gold/20 blur-[100px] rounded-full animate-pulse-glow" />

            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
              <div className="absolute inset-0 border border-vedic-brown/10 rounded-full animate-spin-slow flex items-center justify-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 text-vedic-brown/40">
                  <LuStar size={10} />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 text-vedic-brown/40">
                  <LuStar size={10} />
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 text-vedic-brown/40">
                  <LuStar size={10} />
                </div>
                <div className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 text-vedic-brown/40">
                  <LuStar size={10} />
                </div>
              </div>

              <div className="absolute inset-8 border border-dashed border-vedic-gold/40 rounded-full animate-spin-reverse" />
              <div className="absolute inset-20 border border-vedic-cosmic/20 rounded-full" />

              <div className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-br from-vedic-brown to-vedic-cosmic rounded-full flex items-center justify-center shadow-2xl shadow-vedic-gold/30">
                <LuSparkles className="text-vedic-gold animate-pulse-glow" size={42} />
              </div>

              <div
                className="absolute top-10 right-20 bg-vedic-cream p-3 rounded-lg shadow-lg border border-vedic-gold/20 animate-bounce"
                style={{ animationDuration: '3s' }}
              >
                <LuMoon className="text-vedic-cosmic" size={18} />
              </div>
              <div
                className="absolute bottom-20 left-10 bg-vedic-cream p-3 rounded-lg shadow-lg border border-vedic-gold/20 animate-bounce"
                style={{ animationDuration: '4s' }}
              >
                <LuSparkles className="text-vedic-gold" size={18} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-vedic-paper relative border-y border-vedic-brown/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-vedic-gold text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
            Our Philosophy
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-vedic-brown mb-8">
            Ancient charts, modern clarity
          </h2>
          <div className="w-16 h-0.5 bg-vedic-gold mx-auto mb-10" />
          <p className="text-lg text-vedic-brown/80 font-light leading-relaxed mb-8">
            Vedic astrology becomes powerful when it’s precise, structured, and grounded in your real context — your goals, risks, relationships, and timelines.
          </p>
          <p className="text-lg text-vedic-brown/80 font-light leading-relaxed">
            This website lets you book a consultation securely and keep your previous consultation history in one place.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-vedic-gold text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
              What you can ask
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-vedic-brown mb-6">
              Focused questions. Better answers.
            </h2>
            <p className="text-vedic-brown/70 text-lg font-light leading-relaxed">
              Use one consultation to go deep on a specific area — and get a clean roadmap of what to prioritise now vs later.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {accents.map((a) => (
              <div
                key={a.label}
                className="glass-panel rounded-lg p-6 shadow-sm hover:shadow-xl hover:shadow-vedic-gold/5 transition-all"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-vedic-brown/60 mb-2">
                  {a.label}
                </div>
                <div className="text-xl font-serif text-vedic-brown mb-2">{a.label}</div>
                <p className="text-vedic-brown/70 font-light leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-vedic-brown text-vedic-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <span className="text-vedic-goldLight text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
              Process
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
              Simple booking. Secure payment. Clear timeline.
            </h2>
            <p className="text-vedic-cream/70 font-light leading-relaxed">
              Everything is structured: your details, your questions, and the delivery estimate after payment.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'Create account', d: 'Email + OTP verification to keep your account secure.' },
              { t: 'Submit details', d: 'Name, birth details, and consultation questions.' },
              { t: 'Pay & confirm', d: 'Razorpay checkout opens without leaving the page.' },
            ].map((x, idx) => (
              <div key={x.t} className="rounded-lg border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-vedic-goldLight font-semibold text-sm mb-2">
                  0{idx + 1}
                </div>
                <div className="text-lg font-serif text-white mb-2">{x.t}</div>
                <p className="text-vedic-cream/70 font-light leading-relaxed text-sm">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-vedic-paper border-t border-vedic-brown/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-vedic-gold text-sm font-semibold tracking-[0.25em] uppercase mb-4 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-vedic-brown mb-6">
              Questions, answered
            </h2>
            <p className="text-vedic-brown/70 text-lg font-light leading-relaxed">
              If you still have questions, you can book and mention them in your consultation form.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group glass-panel rounded-lg p-6">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-vedic-brown">{f.q}</span>
                  <span className="text-vedic-gold transition-transform duration-300 group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-4 text-vedic-brown/70 font-light leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-vedic-brown text-center text-vedic-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
            Ready to book your consultation?
          </h2>
          <p className="text-vedic-cream/70 font-light leading-relaxed mb-10">
            Start by creating your account. After verification, you’ll be redirected to book a new consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-10 py-4 bg-gradient-gold text-white rounded-sm text-sm font-semibold hover:shadow-lg hover:shadow-vedic-gold/20 transition-all uppercase tracking-wide"
            >
              Create account
            </Link>
            <Link
              to="/login"
              className="px-10 py-4 border border-white/20 text-white rounded-sm text-sm font-semibold hover:bg-white/5 transition-colors uppercase tracking-wide"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}