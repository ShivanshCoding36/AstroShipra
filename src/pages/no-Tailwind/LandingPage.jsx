import React, { useState, useEffect ,useRef} from 'react';
import "./landing.css"

const zodiacData = [
  { sign: 'Aries', name: 'Mesha', dates: 'Mar 21 – Apr 19', traits: 'The pioneer, the warrior, and the spark of creation. Aries represents the raw energy of the soul emerging into the physical world.', strengths: 'Courage, leadership, honesty, and a relentless drive to initiate new beginnings.', themes: 'Self-discovery, action, independence, and the courage to follow one\'s own path.', moon: 'Moon in Aries (Mesha Rashi) gives a passionate, quick-thinking, and emotionally resilient nature. Shipra can help you channel this fire into constructive leadership.' },
  { sign: 'Taurus', name: 'Vrishabha', dates: 'Apr 20 – May 20', traits: 'The builder, the provider, and the anchor of the zodiac. Taurus seeks beauty, stability, and the manifestation of spirit in form.', strengths: 'Patience, reliability, artistic sensitivity, and an unwavering loyalty to those they love.', themes: 'Abundance, values, sensuality, and the cultivation of lasting inner and outer security.', moon: 'Moon in Taurus (Vrishabha Rashi) is exalted in Vedic astrology — providing deep emotional stability and a natural affinity for comfort and wealth.' },
  { sign: 'Gemini', name: 'Mithuna', dates: 'May 21 – Jun 20', traits: 'The messenger, the witness, and the bridge between worlds. Gemini thrives on curiosity and the exchange of light and information.', strengths: 'Adaptability, intellect, communication, and the ability to see the divine duality in all things.', themes: 'Learning, connection, versatility, and the bridging of the lower and higher minds.', moon: 'Moon in Gemini (Mithuna Rashi) creates a versatile, inquisitive, and communicative mind. Shipra can help you ground this restless intellectual energy.' },
  { sign: 'Cancer', name: 'Karka', dates: 'Jun 21 – Jul 22', traits: 'The nurturer, the protector, and the keeper of the home. Cancer represents the deep waters of the soul and the power of emotional roots.', strengths: 'Intuition, compassion, emotional intelligence, and a profound devotion to family and heritage.', themes: 'Belonging, emotional healing, lineage, and the protection of the sacred inner life.', moon: 'Moon in Cancer (Karka Rashi) is in its own sign — bestowing extreme sensitivity, maternal instincts, and psychic potential.' },
  { sign: 'Leo', name: 'Simha', dates: 'Jul 23 – Aug 22', traits: 'The sovereign, the creator, and the radiant heart. Leo seeks to express the light of the soul through courage and artistic brilliance.', strengths: 'Generosity, nobility, creativity, and the power to inspire others through their own inner light.', themes: 'Self-expression, sovereignty, legacy, and the celebration of the divine spark within.', moon: 'Moon in Leo (Simha Rashi) gives a noble, dramatic, and warm-hearted nature. Shipra can show you how to lead from the heart with authentic power.' },
  { sign: 'Virgo', name: 'Kanya', dates: 'Aug 23 – Sep 22', traits: 'The healer, the craftsman, and the seeker of purity. Virgo understands that the divine is found in the smallest details of service.', strengths: 'Discernment, devotion, analytical brilliance, and the ability to manifest order from chaos.', themes: 'Service, refinement, holistic health, and the integration of mind, body, and spirit.', moon: 'Moon in Virgo (Kanya Rashi) creates a meticulous, helpful, and discerning mind. Shipra can guide you in balancing practicality with spiritual growth.' },
  { sign: 'Libra', name: 'Tula', dates: 'Sep 23 – Oct 22', traits: 'The diplomat, the artist, and the seeker of harmony. Libra represents the soul’s desire for balance, justice, and sacred union.', strengths: 'Fairness, grace, diplomacy, and a deep-seated need for peace and aesthetic perfection.', themes: 'Relationships, equilibrium, justice, and the balancing of the scales of karma.', moon: 'Moon in Libra (Tula Rashi) fosters a love for harmony, social grace, and refined tastes. Your reading will reveal how you find balance in partnership.' },
  { sign: 'Scorpio', name: 'Vrishchika', dates: 'Oct 23 – Nov 21', traits: 'The alchemist, the detective, and the keeper of secrets. Scorpio represents the power of transformation through the depths of experience.', strengths: 'Intensity, focus, resilience, and the ability to navigate the shadows to find the light.', themes: 'Transformation, power, rebirth, and the exploration of the unseen and the occult.', moon: 'Moon in Scorpio (Vrishchika Rashi) is considered debilitated but offers intense psychic power and emotional depth. Shipra specializes in navigating this placement.' },
  { sign: 'Sagittarius', name: 'Dhanu', dates: 'Nov 22 – Dec 21', traits: 'The philosopher, the explorer, and the seeker of truth. Sagittarius aims their arrow at the highest wisdom and the furthest horizons.', strengths: 'Optimism, wisdom, adventurous spirit, and an unquenchable thirst for universal knowledge.', themes: 'Expansion, truth, philosophy, and the journey toward the higher self.', moon: 'Moon in Sagittarius (Dhanu Rashi) brings a philosophical, optimistic, and freedom-loving spirit. Shipra can help you align your vision with your destiny.' },
  { sign: 'Capricorn', name: 'Makara', dates: 'Dec 22 – Jan 19', traits: 'The sage, the master, and the climber of the sacred mountain. Capricorn represents the mastery of time and the manifestation of destiny.', strengths: 'Discipline, ambition, integrity, and the wisdom that comes from enduring strength.', themes: 'Legacy, structure, mastery, and the fulfillment of one’s highest worldly and spiritual duty.', moon: 'Moon in Capricorn (Makara Rashi) bestows a disciplined, serious, and achievement-oriented mind. Your chart reveals how to use structure to reach the summit.' },
  { sign: 'Aquarius', name: 'Kumbha', dates: 'Jan 20 – Feb 18', traits: 'The visionary, the humanitarian, and the bringer of the new dawn. Aquarius seeks to break old structures to serve the collective good.', strengths: 'Innovation, originality, detachment, and a profound commitment to human evolution.', themes: 'Revolution, community, progress, and the awakening of the global consciousness.', moon: 'Moon in Aquarius (Kumbha Rashi) creates an inventive, humanitarian, and independent emotional nature. Shipra can guide your path toward collective service.' },
  { sign: 'Pisces', name: 'Meen', dates: 'Feb 19 – Mar 20', traits: 'The mystic, the dreamer, and the soul that returns to the ocean. Pisces represents transcendence, imagination, and a profound connection to the unseen.', strengths: 'Empathy, spiritual depth, creativity, intuition, and a boundless compassion that dissolves the barriers.', themes: 'Spirituality, surrender, imagination, karmic completion, and the dissolution of the ego.', moon: 'Moon in Pisces (Meen Rashi) gives extraordinary intuition, empathy, and spiritual sensitivity. Shipra can confirm this placement and its spiritual gifts.' }
];

const AstroShipraMathur = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedSign, setSelectedSign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSign = (index) => {
    setSelectedSign(zodiacData[index]);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const moveHandler = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    document.addEventListener("mousemove", moveHandler);

    function ani() {
      if (!cursorRef.current || !ringRef.current) return;

      cursorRef.current.style.left = mx + "px";
      cursorRef.current.style.top = my + "px";

      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;

      ringRef.current.style.left = rx + "px";
      ringRef.current.style.top = ry + "px";

      requestAnimationFrame(ani);
    }

    ani();

    return () => {
      document.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Nav scroll class
  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = Array.from({ length: 260 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.7 + 0.2,
        t: Math.random() * Math.PI * 2,
        s: (Math.random() * 0.005 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      }));
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.t += s.s;
        const a = 0.18 + 0.55 * (0.5 + 0.5 * Math.sin(s.t));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,235,210,${a * s.a})`;
        ctx.fill();
      });

      requestAnimationFrame(drawStars);
    }

    resize();
    initStars();
    drawStars();

    window.addEventListener("resize", () => {
      resize();
      initStars();
    });
  }, []);

  function switchPayTab(btn, panelId) {
    const parent = btn.closest(".pay-tabs");
  
    parent.querySelectorAll(".pay-tab").forEach((t) => {
      t.classList.remove("active");
    });
  
    btn.classList.add("active");
  
    let sibling = parent.nextElementSibling;
  
    while (sibling) {
      if (sibling.classList.contains("pay-panel")) {
        sibling.style.display = "none";
      }
      sibling = sibling.nextElementSibling;
    }
  
    const panel = document.getElementById(panelId);
    if (panel) panel.style.display = "block";
  }

  function copyUpi() {
    navigator.clipboard.writeText("shipramat@icici").then(() => {
      document.querySelectorAll(".copy-btn").forEach((b) => {
        b.textContent = "✓ Copied!";
        b.classList.add("copied");
  
        setTimeout(() => {
          b.textContent = "⎘ Copy";
          b.classList.remove("copied");
        }, 2500);
      });
    });
  }

  function toggleTopic(btn) {
    btn.classList.toggle("selected");
  
    const selected = document.querySelectorAll(".topic-btn.selected");
    const hint = document.getElementById("topicHint");
  
    if (selected.length === 0) {
      hint.textContent = "Click to select one or more topics";
    } else {
      const names = Array.from(selected).map((b) =>
        b.dataset.val.replace(/&amp;/g, "&")
      );
      hint.textContent = "✦ Selected: " + names.join(" · ");
    }
  }

  function goToPayment() {
    const name = document.getElementById("fName").value.trim();
    const dob = document.getElementById("fDob").value;
  
    if (!name) return alert("Please enter your name.");
    if (!dob) return alert("Please enter your date of birth.");
  
    document.getElementById("formStep1").style.display = "none";
    document.getElementById("formStep2").style.display = "flex";
  }

  function sendToWhatsApp() {
    const name = document.getElementById("fName").value || "Not provided";
  
    const msg = `Hello Shipra,\n\nName: ${name}`;
  
    window.open(
      "https://wa.me/919667668794?text=" + encodeURIComponent(msg),
      "_blank"
    );
  }

  function calcLifePath() {
    const val = document.getElementById("numDob").value;
    if (!val) return;
  
    const digits = val.replace(/-/g, "").split("").map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
  
    while (sum > 9 && ![11, 22, 33].includes(sum)) {
      sum = sum
        .toString()
        .split("")
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }
  
    document.getElementById("numResult").textContent = "Life Path " + sum;
  }

  function toggleFaq(btn) {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-a");
    const isOpen = item.classList.contains("open");

    // Close all open items
    document.querySelectorAll(".faq-item.open").forEach((el) => {
      el.classList.remove("open");
      const q = el.querySelector(".faq-q");
      const a = el.querySelector(".faq-a");
      if (q) q.classList.remove("open");
      if (a) a.classList.remove("open");
      const icon = el.querySelector(".faq-icon");
      if (icon) icon.textContent = "+";
    });

    if (!isOpen) {
      item.classList.add("open");
      btn.classList.add("open");
      if (answer) answer.classList.add("open");
      const icon = btn.querySelector(".faq-icon");
      if (icon) icon.textContent = "\u2212";
    }
  }

  function markPaymentOpened() {
    const txnGroup = document.getElementById("txnGroup");
    const confirmRow = document.getElementById("confirmRow");
    if (txnGroup) { txnGroup.style.opacity = "1"; txnGroup.style.pointerEvents = "auto"; }
    if (confirmRow) { confirmRow.style.opacity = "1"; confirmRow.style.pointerEvents = "auto"; }
  }

  function checkPaymentConfirm() {
    const paid = document.getElementById("fPaid");
    const txnId = document.getElementById("fTxnId");
    const sendBtn = document.getElementById("sendWaBtn");
    const payNote = document.getElementById("payNote");
    if (paid && paid.checked && txnId && txnId.value.trim()) {
      if (sendBtn) { sendBtn.disabled = false; sendBtn.style.opacity = "1"; sendBtn.style.cursor = "pointer"; }
      if (payNote) payNote.style.display = "none";
    } else {
      if (sendBtn) { sendBtn.disabled = true; sendBtn.style.opacity = "0.4"; sendBtn.style.cursor = "not-allowed"; }
    }
  }

  function goBack() {
    document.getElementById("formStep1").style.display = "block";
    document.getElementById("formStep2").style.display = "none";
    const stepInd1 = document.getElementById("step-ind-1");
    const stepInd2 = document.getElementById("step-ind-2");
    if (stepInd1) stepInd1.classList.add("active");
    if (stepInd2) stepInd2.classList.remove("active");
  }

  return (
    <>
    <canvas ref={canvasRef} id="starfield" />
<div ref={cursorRef} id="cursor" />
<div ref={ringRef} id="cursorRing" />

{isModalOpen && selectedSign && (
<div className="zodiac-modal open" id="zodiacModal">
  <div className="modal-backdrop" onClick={() => closeModal()}></div>
  <div className="modal-box">
    <button className="modal-close" onClick={() => closeModal()}>✕</button>
    <span className="modal-sign-glyph">{selectedSign.sign}</span>
    <h3>{selectedSign.name} ({selectedSign.sign})</h3>
    <div className="modal-dates">{selectedSign.dates}</div>
    <div className="modal-section"><h4>Core Traits</h4><p>{selectedSign.traits}</p></div>
    <div className="modal-section"><h4>Strengths</h4><p>{selectedSign.strengths}</p></div>
    <div className="modal-section"><h4>Life Themes</h4><p>{selectedSign.themes}</p></div>
    <div className="modal-moon-box">
      <h4>🌙 Moon Sign — How to Know Your Rashi</h4>
      <p>{selectedSign.moon}</p>
    </div>
  </div>
</div>
)}

<a href="https://wa.me/919667668794" target="_blank" className="wa-float" title="Chat on WhatsApp">
  <span className="wa-float-pulse"></span>
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<div className="page-wrap">

<nav id="nav">
  <a href="#" className="nav-logo" style={{textDecoration:"none"}}>
    {/* Replace src with your logo path */}
    <img src="/logo.png" alt="Astro Shipra Mathur" className="nav-logo-img" onError={(e) => e.target.style.display='none'} />
    <span className="nav-logo-text">Astro Shipra Mathur</span>
  </a>
  <ul className="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#numerology">Numerology</a></li>
    <li><a href="#zodiac">Zodiac</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#testimonials">Testimonials</a></li>
  </ul>
  <a href="#contact" className="nav-cta">Book via WhatsApp</a>
</nav>

<section id="hero">
  <div className="hero-mandala">
    <svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="350" cy="350" r="340" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="4 8"/>
      <circle cx="350" cy="350" r="278" stroke="#c084fc" strokeWidth="0.5"/>
      <circle cx="350" cy="350" r="198" stroke="#d4af37" strokeWidth="0.4" strokeDasharray="2 6"/>
      <circle cx="350" cy="350" r="128" stroke="#c084fc" strokeWidth="0.5"/>
      <circle cx="350" cy="350" r="58" stroke="#d4af37" strokeWidth="0.6"/>
      <line x1="350" y1="10" x2="350" y2="690" stroke="#c084fc" strokeWidth="0.3"/>
      <line x1="10" y1="350" x2="690" y2="350" stroke="#c084fc" strokeWidth="0.3"/>
      <line x1="103" y1="103" x2="597" y2="597" stroke="#c084fc" strokeWidth="0.3"/>
      <line x1="597" y1="103" x2="103" y2="597" stroke="#c084fc" strokeWidth="0.3"/>
      <line x1="120" y1="60" x2="580" y2="640" stroke="#c084fc" strokeWidth="0.2"/>
      <line x1="580" y1="60" x2="120" y2="640" stroke="#c084fc" strokeWidth="0.2"/>
      <line x1="60" y1="120" x2="640" y2="580" stroke="#c084fc" strokeWidth="0.2"/>
      <line x1="640" y1="120" x2="60" y2="580" stroke="#c084fc" strokeWidth="0.2"/>
      <polygon points="350,50 450,225 650,270 505,420 545,640 350,535 155,640 195,420 50,270 250,225" stroke="#d4af37" strokeWidth="0.5" fill="none"/>
    </svg>
  </div>
  <div className="hero-content">
    <p className="hero-eyebrow">✦ &nbsp; Vedic Astrology &nbsp; ✦ &nbsp; Research-Driven Insights &nbsp; ✦ &nbsp; Effective Remedies</p>
    <h1 className="hero-name">Astro <span className="accent">Shipra</span>Mathur</h1>
    <p className="hero-sub">Ancient Wisdom · Modern Clarity · Genuine Relief</p>
    <div className="hero-divider"></div>
    <p className="hero-tagline">The stars have whispered your story since before you were born. Let us read it together — with precision, depth, and compassion.</p>
    <div className="hero-badges">
      <span className="hero-badge">Vedic Astrology</span>
      <span className="hero-badge">Research Driven</span>
      <span className="hero-badge">Effective Remedies</span>
    </div>
    <div className="hero-buttons">
      <a href="https://wa.me/919667668794" target="_blank" className="btn-primary">Book on WhatsApp ✦</a>
      <a href="#services" className="btn-ghost">Explore Consultation Topics</a>
    </div>
  </div>
  <div className="hero-scroll"><div className="scroll-line"></div>Scroll</div>
</section>

<section id="trust">
  <div className="section-inner">
    <div className="trust-row">
      <div className="trust-item">
        <span className="trust-number">3+</span>
        <span className="trust-label">Years of Research &amp; Advisory</span>
      </div>
      <div className="trust-item">
        <span className="trust-number">500+</span>
        <span className="trust-label">Consultations Delivered</span>
      </div>
      <div className="trust-item">
        <span className="trust-number">7</span>
        <span className="trust-label">Areas of Guidance</span>
      </div>
      <div className="trust-item">
        <span className="trust-number">60</span>
        <span className="trust-label">Minutes of Deep Focus</span>
      </div>
      <div className="trust-item">
        <span className="trust-number">100%</span>
        <span className="trust-label">Research-Driven Readings</span>
      </div>
    </div>
  </div>
</section>
<section id="about">
  <div className="section-inner">
    <div className="about-grid">
      <div className="reveal" style={{position:"relative"}}>
        <div className="portrait-frame">
          <div className="portrait-bg">
            <div className="portrait-vignette"></div>
            <div className="portrait-watermark"></div>
            <div className="portrait-protect"></div>
          </div>
        </div>
        <div className="about-tag">
          <span className="number">3+</span>
          <span className="label">Years of Research&amp; Advisory</span>
        </div>
      </div>
      <div className="about-text reveal">
        <p className="section-label">About Shipra</p>
        <h2>A Scholar of the Stars, <em>Where Rigorous Research Meets Timeless Wisdom</em></h2>
        <p>Shipra Mathur is a Vedic astrologer specializing in deep research and highly precise, actionable remedies. Born into a family of educationists and academicians, her inclination toward rigorous study of Jyotish Shastra was deeply natural.</p>
        <p>Shipra studies every kundali extensively before sharing insights and remedies. Her consultations are known for their <strong style={{color:"var(--gold-light)"}}>precision, brevity, and positivity</strong> — never fear-mongering, always authentically well-researched with a genuine intention to bring relief to her clients.</p>
        <p>She brings a scholar's rigour to ancient wisdom and a healer's warmth to every conversation. Clients leave with clarity, not anxiety.</p>
        <div className="about-pillars">
          <span className="pillar">Precision</span>
          <span className="pillar">Deep Research</span>
          <span className="pillar">Effective Remedies</span>
          <span className="pillar">Positivity First</span>
          <span className="pillar">No Fear Mongering</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="why">
  <div className="section-inner">
    <p className="section-label reveal">Why Clients Choose Shipra</p>
    <h2 className="section-heading reveal">A Different Kind of <span className="accent">Astrologer</span></h2>
    <p className="section-intro reveal">What sets an Astro Shipra Mathur consultation apart from everything else you may have experienced.</p>
    <div className="why-grid reveal">
      <div className="why-card">
        <span className="why-icon">🔬</span>
        <div className="why-title">Deep Research</div>
        <div className="why-desc">Every kundali is studied extensively before the session. Shipra's academic background ensures no detail is left unexamined.</div>
      </div>
      <div className="why-card">
        <span className="why-icon">☀️</span>
        <div className="why-title">No Fear Mongering</div>
        <div className="why-desc">Readings are positive, empowering, and constructive. You will never leave more anxious than when you arrived — only clearer.</div>
      </div>
      <div className="why-card">
        <span className="why-icon">💊</span>
        <div className="why-title">Effective Remedies</div>
        <div className="why-desc">Specialised in practical, actionable remedies that are realistic to follow. Not generic — deeply personalised to your chart and life.</div>
      </div>
      <div className="why-card">
        <span className="why-icon">🎯</span>
        <div className="why-title">Precision &amp; Brevity</div>
        <div className="why-desc">Consultations are focused and precise. Every minute of your 60 minutes is used with intention — no filler, no vagueness.</div>
      </div>
    </div>
  </div>
</section>
<section id="how">
  <div className="section-inner">
    <p className="section-label reveal">Simple Process</p>
    <h2 className="section-heading reveal">How to Book Your <span className="accent">Consultation</span></h2>
    <p className="section-intro reveal">Four simple steps to your personalised Vedic reading.</p>
    <div className="steps-row reveal">
      <div className="step-card">
        <div className="step-number">01</div>
        <span className="step-icon">💬</span>
        <div className="step-title">Book &amp; Share Details</div>
        <div className="step-desc">Send your question and complete birth details — name, date, time &amp; place of birth — to <strong style={{color:"var(--gold-light)"}}>+91 96676 68794</strong> on WhatsApp.</div>
        <span className="step-arrow">›</span>
      </div>
      <div className="step-card">
        <div className="step-number">02</div>
        <span className="step-icon">💳</span>
        <div className="step-title">Complete Payment</div>
        <div className="step-desc">Pay ₹9,924 via UPI or bank transfer and share your payment screenshot via WhatsApp to confirm your booking.</div>
        <span className="step-arrow">›</span>
      </div>
      <div className="step-card">
        <div className="step-number">03</div>
        <span className="step-icon">📅</span>
        <div className="step-title">Choose Your Time Slot</div>
        <div className="step-desc">Shipra will send you <strong style={{color:"var(--gold-light)"}}>2–3 available time slot options via WhatsApp</strong>. Pick the one that suits you best and your Google Meet link will follow.</div>
        <span className="step-arrow">›</span>
      </div>
      <div className="step-card">
        <div className="step-number">04</div>
        <span className="step-icon">🌟</span>
        <div className="step-title">60-Min Google Meet</div>
        <div className="step-desc">Join Shipra on Google Meet at your chosen time for your in-depth Vedic reading — deeply researched, precise remedies, and actionable clarity.</div>
      </div>
    </div>
    <div className="fee-box reveal">
      <div className="fee-amount">₹ 9,924</div>
      <div className="fee-label">Flat consultation fee · Any topic · 60 minutes</div>
      <div className="fee-note">One uniform price for all consultations. No hidden charges.</div>
    </div>
  </div>
</section>

<section id="services">
  <div className="section-inner">
    <p className="section-label reveal">Areas of Guidance</p>
    <h2 className="section-heading reveal">Services &amp; <span className="accent">Consultations</span></h2>
    <p className="section-intro reveal">Your consultation will constitute a deeply researched 60-minute astro reading — focused, precise, and full of actionable guidance.</p>
  </div>
  <div className="section-inner">
    <div className="services-grid reveal">

      <div className="service-card">
        <span className="service-glyph">☿</span>
        <h3 className="service-name">Career &amp; Business</h3>
        <p className="service-desc">Navigate professional crossroads with clarity on your planetary periods, vocational strengths, and the right timing.</p>
        <ul className="service-questions">
          <li>Should I change my job or stay put?</li>
          <li>When is the right time to launch my business?</li>
          <li>Why am I stuck despite working hard?</li>
          <li>Which career direction suits my chart?</li>
        </ul>      </div>

      <div className="service-card">
        <span className="service-glyph">♀</span>
        <h3 className="service-name">Marriage &amp; Relationships</h3>
        <p className="service-desc">Kundali Milan, compatibility readings, delays in marriage, and understanding the karmic threads of your relationships.</p>
        <ul className="service-questions">
          <li>Why is my marriage getting delayed?</li>
          <li>Are my partner and I truly compatible?</li>
          <li>How do I heal conflict in my marriage?</li>
          <li>Is this person the right one for me?</li>
        </ul>      </div>

      <div className="service-card">
        <span className="service-glyph">☽</span>
        <h3 className="service-name">Health &amp; Wellbeing</h3>
        <p className="service-desc">Understand planetary influences on your health, vulnerable periods in your chart, and remedies to strengthen vitality.</p>
        <ul className="service-questions">
          <li>Why do I keep falling ill at certain times?</li>
          <li>Is there a planetary reason for my anxiety?</li>
          <li>What health areas need my attention now?</li>
          <li>What remedies can support my healing?</li>
        </ul>      </div>

      <div className="service-card">
        <span className="service-glyph">♃</span>
        <h3 className="service-name">Money &amp; Assets</h3>
        <p className="service-desc">Understand the wealth houses in your chart — the timing of financial growth, blocks, and targeted remedies.</p>
        <ul className="service-questions">
          <li>Why does money not stay with me?</li>
          <li>Is this a good time to buy property?</li>
          <li>When will my financial situation improve?</li>
          <li>Are there planetary blockages to my wealth?</li>
        </ul>      </div>

      <div className="service-card">
        <span className="service-glyph">☉</span>
        <h3 className="service-name">Children &amp; Family</h3>
        <p className="service-desc">From childbirth timing to a child's education and health — and the larger harmony of your family constellation.</p>
        <ul className="service-questions">
          <li>Why are we facing delays in having a child?</li>
          <li>What does my child's chart reveal?</li>
          <li>How do I navigate family conflicts?</li>
          <li>Which field will my child thrive in?</li>
        </ul>      </div>

      <div className="service-card">
        <span className="service-glyph">♄</span>
        <h3 className="service-name">General Life Guidance</h3>
        <p className="service-desc">A comprehensive reading of your life chart — karma, purpose, recurring patterns, and what the next 1–2 years hold.</p>
        <ul className="service-questions">
          <li>Why does life feel stuck right now?</li>
          <li>What is my true karmic purpose?</li>
          <li>How do I break recurring patterns?</li>
          <li>What does the next 1–2 years hold for me?</li>
        </ul>      </div>

    </div>
  </div>
</section>

<section id="numerology">
  <div className="section-inner">
    <p className="section-label reveal">The Science of Numbers</p>
    <h2 className="section-heading reveal">Numerology <span className="accent">Reading</span></h2>
    <p className="section-intro reveal">Your name and birth date vibrate at a unique cosmic frequency. Discover the hidden forces shaping your personality, relationships, and life path.</p>
    <div className="numerology-inner reveal">
      <div>
        <div className="num-grid">
          <div className="num-cell"><div className="num-digit">1</div><div className="num-name">The Leader</div><div className="num-trait">Sun · Ambition</div></div>
          <div className="num-cell"><div className="num-digit">2</div><div className="num-name">The Diplomat</div><div className="num-trait">Moon · Harmony</div></div>
          <div className="num-cell"><div className="num-digit">3</div><div className="num-name">The Creator</div><div className="num-trait">Jupiter · Joy</div></div>
          <div className="num-cell"><div className="num-digit">4</div><div className="num-name">The Builder</div><div className="num-trait">Rahu · Structure</div></div>
          <div className="num-cell"><div className="num-digit">5</div><div className="num-name">The Explorer</div><div className="num-trait">Mercury · Freedom</div></div>
          <div className="num-cell"><div className="num-digit">6</div><div className="num-name">The Nurturer</div><div className="num-trait">Venus · Love</div></div>
          <div className="num-cell"><div className="num-digit">7</div><div className="num-name">The Seeker</div><div className="num-trait">Ketu · Wisdom</div></div>
          <div className="num-cell"><div className="num-digit">8</div><div className="num-name">The Achiever</div><div className="num-trait">Saturn · Power</div></div>
          <div className="num-cell"><div className="num-digit">9</div><div className="num-name">The Humanitarian</div><div className="num-trait">Mars · Courage</div></div>
        </div>
        <div className="num-calc">
          <h4>✦ Calculate Your Life Path Number</h4>
          <input type="date" className="num-input" id="numDob" placeholder="Your Date of Birth" />
          <button className="btn-primary" onClick={() => calcLifePath()} style={{width:"100%", padding:"12px"}}>Calculate →</button>
          <div className="num-result" id="numResult"></div>
        </div>
      </div>
      <div>
        <h3 style={{fontFamily:"'Cinzel',serif", fontSize:"clamp(1.2rem,2.5vw,1.7rem)", color:"var(--beige)", marginBottom:"18px", fontWeight:"400", lineHeight:"1.3"}}>Numbers Are the Language of the Cosmos</h3>
        <p style={{color:"var(--text-body)", marginBottom:"16px", fontSize:".95rem"}}>In Vedic numerology, every number from 1 to 9 corresponds to a planet — and that planet governs a domain of your existence. Your <strong style={{color:"var(--gold-light)"}}>Life Path Number</strong> reveals your core purpose. Your <strong style={{color:"var(--gold-light)"}}>Name Number</strong> shapes how the world perceives you.</p>
        <p style={{color:"var(--text-body)", marginBottom:"24px", fontSize:".95rem"}}>Shipra integrates your numbers with your birth chart for deeply personalised, actionable insights on career timing, relationship compatibility, auspicious dates, and name-vibration remedies.</p>
        <div className="num-offers">
          <h4>What a Numerology Reading Covers</h4>
          <ul style={{listStyle:"none", display:"flex", flexDirection:"column", gap:"7px"}}>
            <li>✦ Life Path Number &amp; your core purpose</li>
            <li>✦ Name number &amp; vibration analysis</li>
            <li>✦ Name compatibility with your birth number</li>
            <li>✦ Lucky numbers, days &amp; colours</li>
            <li>✦ Name correction remedies if needed</li>
            <li>✦ Integration with your Vedic birth chart</li>
          </ul>
        </div>
        <a href="https://wa.me/919667668794" target="_blank" className="btn-primary">Book Numerology Reading ✦</a>
      </div>
    </div>
  </div>
</section>

<section id="zodiac">
  <div className="section-inner">
    <p className="section-label reveal">The Twelve Signs</p>
    <h2 className="section-heading reveal">Know Your <span className="accent">Zodiac Sign</span></h2>
    <p className="section-intro reveal">Tap any sign below to discover its characteristics, strengths, and how the Moon's position at your birth determines your Vedic Rashi.</p>
    <div className="zodiac-wheel-wrap reveal">
      <svg className="zodiac-wheel-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(91,155,213,0.25)" strokeWidth="0.6"/>
        <circle cx="200" cy="200" r="152" fill="none" stroke="rgba(91,155,213,0.16)" strokeWidth="0.6"/>
        <circle cx="200" cy="200" r="108" fill="none" stroke="rgba(212,175,55,0.16)" strokeWidth="0.5" strokeDasharray="3 6"/>
        <g stroke="rgba(91,155,213,0.12)" strokeWidth="0.5">
          <line x1="200" y1="5" x2="200" y2="395"/><line x1="5" y1="200" x2="395" y2="200"/>
          <line x1="52" y1="52" x2="348" y2="348"/><line x1="348" y1="52" x2="52" y2="348"/>
          <line x1="27" y1="127" x2="373" y2="273"/><line x1="373" y1="127" x2="27" y2="273"/>
          <line x1="127" y1="27" x2="273" y2="373"/><line x1="273" y1="27" x2="127" y2="373"/>
        </g>
        <circle cx="200" cy="200" r="20" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8"/>
        <circle cx="200" cy="200" r="7" fill="rgba(212,175,55,0.35)"/>
        <text x="200" y="24" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♈</text>
        <text x="297" y="52" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♉</text>
        <text x="370" y="135" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♊</text>
        <text x="378" y="210" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♋</text>
        <text x="358" y="285" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♌</text>
        <text x="295" y="354" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♍</text>
        <text x="200" y="390" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♎</text>
        <text x="103" y="354" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♏</text>
        <text x="40" y="285" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♐</text>
        <text x="20" y="210" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♑</text>
        <text x="40" y="135" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♒</text>
        <text x="103" y="52" textAnchor="middle" fill="rgba(212,175,55,0.82)" fontSize="15">♓</text>
      </svg>
      <div className="zodiac-center-fixed">
        <h3>Rashi</h3>
        <p>Your Cosmic Self</p>
      </div>
    </div>
    <div className="signs-grid reveal">
      <button className="sign-btn" onClick={() => openSign(0)}><span className="sign-glyph">♈</span><div className="sign-name">Aries</div></button>
      <button className="sign-btn" onClick={() => openSign(1)}><span className="sign-glyph">♉</span><div className="sign-name">Taurus</div></button>
      <button className="sign-btn" onClick={() => openSign(2)}><span className="sign-glyph">♊</span><div className="sign-name">Gemini</div></button>
      <button className="sign-btn" onClick={() => openSign(3)}><span className="sign-glyph">♋</span><div className="sign-name">Cancer</div></button>
      <button className="sign-btn" onClick={() => openSign(4)}><span className="sign-glyph">♌</span><div className="sign-name">Leo</div></button>
      <button className="sign-btn" onClick={() => openSign(5)}><span className="sign-glyph">♍</span><div className="sign-name">Virgo</div></button>
      <button className="sign-btn" onClick={() => openSign(6)}><span className="sign-glyph">♎</span><div className="sign-name">Libra</div></button>
      <button className="sign-btn" onClick={() => openSign(7)}><span className="sign-glyph">♏</span><div className="sign-name">Scorpio</div></button>
      <button className="sign-btn" onClick={() => openSign(8)}><span className="sign-glyph">♐</span><div className="sign-name">Sagittarius</div></button>
      <button className="sign-btn" onClick={() => openSign(9)}><span className="sign-glyph">♑</span><div className="sign-name">Capricorn</div></button>
      <button className="sign-btn" onClick={() => openSign(10)}><span className="sign-glyph">♒</span><div className="sign-name">Aquarius</div></button>
      <button className="sign-btn" onClick={() => openSign(11)}><span className="sign-glyph">♓</span><div className="sign-name">Pisces</div></button>
    </div>
  </div>
</section>

<section id="testimonials">
  <div className="section-inner">
    <p className="section-label reveal">Kind Words</p>
    <h2 className="section-heading reveal">What <span className="accent">Clients</span> Say</h2>
    <p className="section-intro reveal">Clients come with questions and leave with clarity, direction, and a renewed sense of peace.</p>
    <div className="testimonials-track reveal">
      <div className="testimonial-card">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-text">Shipra's reading changed my entire perspective on my career. She saw things in my chart I had never shared with anyone. Deeply precise, genuinely moving, and absolutely no fear in her delivery.</p>
        <div className="testimonial-author">
          <div className="author-avatar">P</div>
          <div className="author-info"><div className="name">Priya Sharma</div><div className="location">Delhi, India</div></div>
        </div>
      </div>
      <div className="testimonial-card">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-text">I was skeptical but her knowledge and genuine care created a consultation that felt like she had known me for years. She gives positivity without sugar-coating — that is rare and precious.</p>
        <div className="testimonial-author">
          <div className="author-avatar">R</div>
          <div className="author-info"><div className="name">Rohan Mehta</div><div className="location">Mumbai, India</div></div>
        </div>
      </div>
      <div className="testimonial-card">
        <div className="testimonial-stars">★★★★★</div>
        <p className="testimonial-text">I came in anxious and left with a clear plan and practical remedies. Shipra's research is evident — every insight was precise. What makes her different is the warmth and the complete absence of fear.</p>
        <div className="testimonial-author">
          <div className="author-avatar">A</div>
          <div className="author-info"><div className="name">Anjali Verma</div><div className="location">Gurugram, India</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="blog">
  <div className="section-inner">
    <p className="section-label reveal">Celestial Wisdom</p>
    <h2 className="section-heading reveal">From the <span className="accent">Archive</span></h2>
    <p className="section-intro reveal">Reflections on the stars, sacred cycles, and the art of living in alignment with your chart.</p>
    <div className="blog-grid reveal">
      <div className="blog-card featured">
        <div className="blog-tag">✦ Featured · Vedic Insight</div>
        <h3>Saturn's Return: Why Your Late Twenties Feel Like a Cosmic Trial</h3>
        <p>At approximately 29 years old, Saturn completes its first full revolution and returns to the exact degree it occupied at your birth. This is one of the most significant transits in Vedic astrology — a reckoning, a restructuring, and a sacred pressure to become who you are truly meant to be. Understanding it changes everything.</p>
        <div className="blog-meta">March 2025 &nbsp;·&nbsp; 8 min read</div>
      </div>
      <div className="blog-card">
        <div className="blog-tag">✦ Numerology</div>
        <h3>The Hidden Power of Your Birth Number</h3>
        <p>Every number carries a vibration. Discover what your life path number says about your deepest purpose.</p>
        <div className="blog-meta">February 2025 &nbsp;·&nbsp; 5 min read</div>
      </div>
      <div className="blog-card">
        <div className="blog-tag">✦ Remedies</div>
        <h3>Gemstones &amp; Planets: A Vedic Guide</h3>
        <p>Which gemstone aligns with your Lagna and how to wear it correctly for lasting benefit.</p>
        <div className="blog-meta">January 2025 &nbsp;·&nbsp; 6 min read</div>
      </div>
      <div className="blog-card">
        <div className="blog-tag">✦ Lunar Cycles</div>
        <h3>New Moon in Rohini: Setting Intentions</h3>
        <p>Harness the potent energy when the Moon meets the Pleiades in Rohini Nakshatra.</p>
        <div className="blog-meta">December 2024 &nbsp;·&nbsp; 4 min read</div>
      </div>
      <div className="blog-card">
        <div className="blog-tag">✦ Jyotish</div>
        <h3>The Navagrahas: Nine Planets, One Life</h3>
        <p>How each of the nine Vedic planets governs a distinct domain of your existence.</p>
        <div className="blog-meta">November 2024 &nbsp;·&nbsp; 7 min read</div>
      </div>
    </div>
  </div>
</section>

<section id="faq">
  <div className="section-inner">
    <p className="section-label reveal">Questions &amp; Answers</p>
    <h2 className="section-heading reveal">Frequently <span className="accent">Asked</span></h2>
    <p className="section-intro reveal">Everything you need to know before booking your consultation with Shipra.</p>
    <div className="faq-grid reveal">
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>Do I need to know my exact birth time? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Your birth time is very important in Vedic astrology as it determines your Ascendant (Lagna) and house positions. If you don't know your exact time, Shipra can still do a partial reading using your date and place of birth, and will let you know what additional accuracy a confirmed birth time would add.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>Is the consultation online or in person? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">All consultations take place via Google Meet — a simple video call accessible from anywhere in the world. The consultation itself is never on WhatsApp. WhatsApp is used only to receive your booking details, confirm your payment, and send you 2–3 available time slot options. You choose the slot that suits you, and Shipra then sends your Google Meet link so you are all set for the session.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>How is this different from a generic online reading? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Shipra studies your kundali in depth before the session — this is not a live interpretation from scratch. Her academic background means every reading is thoroughly researched, and her specialty in remedies means you leave with actionable guidance, not just observations.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>Can I ask questions on multiple topics in one session? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Yes. The 60-minute session is flexible. You may bring 2–3 related questions. Shipra will prioritise the most important areas based on your chart and the time available, ensuring depth over breadth.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>What happens after I send my details on WhatsApp? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Once you share your birth details and question on WhatsApp (+91 96676 68794) and complete payment, Shipra will send you 2–3 available time slot options directly on WhatsApp. You simply reply with your preferred slot and Shipra will confirm it along with your Google Meet link — all within 24 hours. The consultation itself then takes place on Google Meet at your chosen time.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>Will I receive a recording of the consultation? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">You are welcome to take notes during the session. If you would like to record the meeting on your end, please inform Shipra at the beginning. The session is conducted on Google Meet, so you have the option to record it locally on your device.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>What remedies does Shipra typically suggest? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Remedies are always personalised and practical — they may include mantra recitation, fasting on specific days, gemstone recommendations, charity practices, colour therapy, or simple behavioural adjustments. Nothing extreme or expensive is ever suggested.</div></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={(e) => toggleFaq(e.currentTarget)}>Is my birth and personal information kept confidential? <span className="faq-icon">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Absolutely. All information shared — birth details, personal circumstances, and questions — is held in strict confidence. Shipra does not share any client information with third parties under any circumstances.</div></div>
      </div>
    </div>
  </div>
</section>
<section id="contact">
  <div className="section-inner">
    <p className="section-label reveal">Get in Touch</p>
    <h2 className="section-heading reveal">Book Your <span className="accent">Consultation</span></h2>
    <p className="section-intro reveal">Fill in your details below. Your consultation itself takes place on <strong style={{color:"var(--gold-light)"}}>Google Meet</strong> — WhatsApp is only used to share your booking details, confirm payment, and send you time slot options to choose from.</p>
    <div className="contact-grid reveal">
      <div className="contact-info">
        <h3>Connect with Shipra</h3>
        <div className="contact-item">
          <span className="contact-icon">✆</span>
          <div className="contact-text"><strong>WhatsApp</strong>+91 96676 68794</div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">✉</span>
          <div className="contact-text"><strong>Email</strong>astroshipramathur@gmail.com <span style={{fontSize:".88rem", opacity:".75"}}>Google Meet link will be sent from this email ID</span></div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">☽</span>
          <div className="contact-text"><strong>Consultation Hours</strong>Mon–Sat, 10 AM – 7 PM IST</div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">♁</span>
          <div className="contact-text"><strong>Consultation Mode</strong>Video call via Google Meet <span style={{fontSize:".88rem", opacity:".75"}}>Available to clients worldwide</span></div>
        </div>
        <a href="https://wa.me/919667668794" target="_blank" className="wa-direct">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat on WhatsApp
        </a>
        <div className="payment-box">
          <h4>Consultation Fee</h4>
          <div className="fee-big"><span className="fee-inr" id="feeInr1">₹ 9,924</span> <span className="fee-sep">/</span> <span className="fee-usd" id="feeUsd1">$110 USD</span></div>
          <p>60-minute personalised Vedic consultation · Any topic</p>

         
          <div className="pay-tabs">
            <button className="pay-tab active" onClick={(e) => switchPayTab(e.currentTarget,'panelUpi')}>🇮🇳 UPI / India</button>
            <button className="pay-tab" onClick={(e) => switchPayTab(e.currentTarget,'panelIntl')}>🌍 International</button>
          </div>

          
          <div className="pay-panel" id="panelUpi">
            <div className="qr-wrap">
               </div>
            <div className="upi-id-row">
              <span className="upi-id-label">UPI ID</span>
              <span className="upi-id-value" id="upiIdText">shipramat@icici</span>
              <button className="copy-btn" onClick={() => copyUpi()} title="Copy UPI ID">⎘ Copy</button>
            </div>
            <p className="pay-instruction">Scan the QR code with any UPI app — GPay, PhonePe, Paytm, BHIM — or manually enter the UPI ID above. Amount: <strong style={{color:"var(--gold-light)"}}>₹9,924</strong>.</p>
          </div>

          <div className="pay-panel" id="panelIntl" style={{display:"none"}}>
            <div className="intl-amount-row">
              <div className="intl-amount">$110 <span>USD</span></div>
              <div className="intl-equiv">≈ ₹9,924 INR</div>
            </div>
            <p className="pay-instruction">International clients can pay via credit or debit card using the secure Razorpay link below. All major cards accepted — Visa, Mastercard, Amex.</p>
            <a href="https://rzp.io/l/astroshipra" target="_blank" className="pay-btn-intl" onClick={() => markPaymentOpened()}>
              💳 Pay via Credit / Debit Card ✦
            </a>
            <p className="pay-instruction" style={{marginTop:"12px", fontSize:".85rem"}}>After payment, save your transaction confirmation and enter the reference ID in the form to unlock the WhatsApp button.</p>
          </div>

        </div>
      </div>
      <div>
        <div className="form-steps">
          <div className="form-step active" id="step-ind-1"><span className="step-num">1</span><span className="step-lbl">Your Details</span></div>
          <div className="step-connector"></div>
          <div className="form-step" id="step-ind-2"><span className="step-num">2</span><span className="step-lbl">Payment</span></div>
          <div className="step-connector"></div>
          <div className="form-step" id="step-ind-3"><span className="step-num">3</span><span className="step-lbl">Confirm</span></div>
        </div>

        <div className="booking-form" id="formStep1">
          <div className="form-row">
            <div className="form-group"><label>Your Name *</label><input type="text" id="fName" placeholder="Full name" /></div>
            <div className="form-group"><label>Date of Birth *</label><input type="date" id="fDob" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Time of Birth</label><input type="time" id="fTime" /></div>
            <div className="form-group"><label>Place of Birth *</label><input type="text" id="fPlace" placeholder="City, Country" /></div>
          </div>

          <div className="form-group">
            <label>Topics / Services — select all that apply *</label>
            <div className="topic-grid" id="topicGrid">
              <button type="button" className="topic-btn" onClick={(e) => toggleTopic(e.currentTarget)} data-val="Career &amp; Business">💼 Career &amp; Business</button>
              <button type="button" className="topic-btn" onClick={(e) => toggleTopic(e.currentTarget)} data-val="Marriage &amp; Relationships">💞 Marriage &amp; Relationships</button>
              <button type="button" className="topic-btn" onClick={(e) => toggleTopic(e.currentTarget)} data-val="Health &amp; Wellbeing">🌿 Health &amp; Wellbeing</button>
              <button type="button" className="topic-btn" onClick={(e) => toggleTopic(e.currentTarget)} data-val="Money &amp; Assets">💰 Money &amp; Assets</button>
              <button type="button" className="topic-btn" onClick={(e) => toggleTopic(e.currentTarget)} data-val="Children &amp; Family">👨‍👩‍👧 Children &amp; Family</button>
              <button type="button" className="topic-btn" onClick={(e) => toggleTopic(e.currentTarget)} data-val="General Life Guidance">✨ General Life Guidance</button>
              <button type="button" className="topic-btn" onClick={(e) => toggleTopic(e.currentTarget)} data-val="Numerology Reading">🔢 Numerology Reading</button>
            </div>
            <p className="topic-hint" id="topicHint">Click to select one or more topics</p>
          </div>

          <div className="form-group">
            <label>Your Question / What you'd like guidance on *</label>
            <textarea id="fQuestion" placeholder="Please share your main question or concern..."></textarea>
          </div>
          <button className="btn-primary" style={{width:"100%", marginTop:"4px"}} onClick={() => goToPayment()}>
            Continue to Payment →
          </button>
          <p className="form-note">Your details are never shared with anyone except Shipra.</p>
        </div>

        <div className="booking-form" id="formStep2" style={{display:"none"}}>
          <div className="step2-box">
            <div className="step2-amount"><span className="fee-inr" id="feeInr2">₹ 9,924</span> <span className="fee-sep">/</span> <span className="fee-usd" id="feeUsd2">$110 USD</span></div>
            <div className="step2-label">60-minute Vedic Consultation · Any Topic</div>

            <div className="pay-tabs" style={{margin:"16px 0 0"}}>
              <button className="pay-tab active" onClick={(e) => switchPayTab(e.currentTarget,'panelUpi2')}>🇮🇳 UPI / India</button>
              <button className="pay-tab" onClick={(e) => switchPayTab(e.currentTarget,'panelIntl2')}>🌍 International</button>
            </div>

            <div className="pay-panel" id="panelUpi2">
              <div className="qr-wrap">
                </div>
              <div className="upi-id-row">
                <span className="upi-id-label">UPI ID</span>
                <span className="upi-id-value">shipramat@icici</span>
                <button className="copy-btn" onClick={() => copyUpi()}>⎘ Copy</button>
              </div>
              <p className="pay-instruction">Scan with GPay, PhonePe, Paytm, or BHIM. Enter exactly <strong style={{color:"var(--gold-light)"}}>₹9,924</strong> as the amount. Then enter your transaction ID below.</p>
              <button className="btn-primary" style={{width:"100%", marginTop:"4px"}} onClick={() => markPaymentOpened()}>
                I've Opened My UPI App ✦
              </button>
            </div>

            <div className="pay-panel" id="panelIntl2" style={{display:"none"}}>
              <div className="intl-amount-row" style={{marginTop:"16px"}}>
                <div className="intl-amount">$110 <span>USD</span></div>
                <div className="intl-equiv">≈ ₹9,924 INR</div>
              </div>
              <p className="pay-instruction">Pay securely via Visa, Mastercard, or Amex. All major cards accepted.</p>
              <a href="https://rzp.io/l/astroshipra" target="_blank" className="pay-btn-intl" onClick={() => markPaymentOpened()}>
                💳 Pay $110 via Credit / Debit Card ✦
              </a>
              <p className="pay-instruction" style={{marginTop:"10px", fontSize:".88rem", opacity:".8"}}>After clicking Pay, complete the payment on the Razorpay page. Then return here, enter your transaction reference below, and unlock the WhatsApp button.</p>
            </div>

            <div className="step2-or" style={{marginTop:"20px"}}>— after paying, complete below —</div>
          </div>
          <div className="form-group" id="txnGroup" style={{opacity:"0.4", pointerEvents:"none"}}>
            <label>UPI / Transaction ID *</label>
            <input type="text" id="fTxnId" placeholder="e.g. T2503141234567890 or UPI ref number" />
            <p className="field-hint">Found in your UPI app under payment history after paying.</p>
          </div>
          <div className="payment-confirm-row" id="confirmRow" style={{opacity:"0.4", pointerEvents:"none"}}>
            <label className="checkbox-label">
              <input type="checkbox" id="fPaid" onChange={() => checkPaymentConfirm()} />
              <span className="checkbox-custom"></span>
              I have completed payment of ₹9,924 and have my transaction ID above
            </label>
          </div>
          <button className="wa-submit" id="sendWaBtn" onClick={() => sendToWhatsApp()} disabled style={{opacity:"0.4", cursor:"not-allowed"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Send Booking to Shipra via WhatsApp
          </button>
          <p className="form-note" id="payNote">Complete payment above to unlock the WhatsApp confirmation button. Your actual consultation will be on Google Meet — not WhatsApp.</p>
          <button type="button" className="back-btn" onClick={() => goBack()} style={{background:"none", border:"none", color:"var(--beige-mid)", fontFamily:"'DM Sans',sans-serif", fontSize:".8rem", letterSpacing:".08em", cursor:"pointer", textTransform:"uppercase", marginTop:"8px", padding:"8px 0", opacity:"0.75", transition:"opacity .2s"}}>← Edit my details</button>
        </div>

      </div>
    </div>
  </div>
</section>

<footer>
  <div className="footer-inner">
    <div className="footer-top">
      <div>
        <p className="footer-tagline">Reading the cosmos to illuminate the path of every soul. Gurugram, Haryana, India</p>
      </div>
      <div className="footer-col"><h4>Services</h4><ul>
        <li><a href="#services">Career &amp; Business</a></li>
        <li><a href="#services">Marriage &amp; Relationships</a></li>
        <li><a href="#services">Health &amp; Wellbeing</a></li>
        <li><a href="#services">Money &amp; Assets</a></li>
        <li><a href="#services">Children &amp; Family</a></li>
        <li><a href="#numerology">Numerology</a></li>
      </ul></div>
      <div className="footer-col"><h4>Navigate</h4><ul>
        <li><a href="#about">About Shipra</a></li>
        <li><a href="#how">How it Works</a></li>
        <li><a href="#zodiac">The Zodiac</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
      </ul></div>
      <div className="footer-col"><h4>Connect</h4><ul>
        <li><a href="https://wa.me/919667668794" target="_blank">WhatsApp</a></li>
        <li><a href="mailto:astroshipramathur@gmail.com">Email Shipra</a></li>
        <li><a href="#contact">Book a Session</a></li>
      </ul></div>
    </div>
    <div className="footer-bottom">
      <span>© 2025 Astro Shipra Mathur · All Rights Reserved · Gurugram, India</span>
      <span>Vedic Astrology · Research Driven Insights · Effective Remedies</span>
    </div>
  </div>
</footer>

</div>
</>
  );
};

export default AstroShipraMathur;