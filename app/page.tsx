'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import GameIconsBackground from '@/components/GameIconsBackground';

const newsItems = [
  { date: '28 MAY 2025', title: 'Behind the Boards: Studio Diary Vol. 3',       teaser: 'An inside look at the making of our latest EP, from first session to final mix.',          tag: 'STUDIO' },
  { date: '19 MAY 2025', title: 'We Signed Three New Artists This Spring',        teaser: 'The roster is growing. Meet the newest members of the Gameboy Records family.',           tag: 'ROSTER' },
  { date: '08 MAY 2025', title: 'Fabric Set Recap — What a Night',                teaser: 'Sold-out room, incredible energy. Photos and full setlist inside.',                        tag: 'LIVE'   },
  { date: '22 APR 2025', title: 'New Mix Series: Frequencies',                    teaser: 'A monthly mix dropping every last Friday. First edition from our own DJ roster.',          tag: 'MIXES'  },
  { date: '10 APR 2025', title: 'How We Record: The Signal Chain',                teaser: 'A deep dive into our studio setup — from outboard gear to software routing.',             tag: 'STUDIO' },
  { date: '01 APR 2025', title: 'Gameboy Records Turns Two',                      teaser: "Two years in. What we learned, and what's next.",                                         tag: 'LABEL'  },
];

// ── CORNER BRACKETS ──────────────────────────────────────────────────────────
function Corners() {
  return (
    <>
      <span className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-[#1a9e4a] pointer-events-none z-50" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-[#1a9e4a] pointer-events-none z-50" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-[#1a9e4a] pointer-events-none z-50" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-[#1a9e4a] pointer-events-none z-50" />
    </>
  );
}

export default function Home() {
  const [playerMounted,  setPlayerMounted]  = useState(false);
  const [playerVisible,  setPlayerVisible]  = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  function openPlayer() {
    setPlayerMounted(true);
    setPlayerVisible(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setSubmitStatus({ type: 'success', message: 'Message sent! We’ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`

        /* ── SIDEBAR GRADIENT RULE LINE (pseudo-element) ── */
        .news-sidebar::after {
          content: '';
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(26,158,74,0.35) 20%, rgba(26,158,74,0.18) 60%, rgba(26,158,74,0.35) 80%, transparent);
          pointer-events: none;
        }

        /* ── SCANLINE OVERLAY (pseudo-element) ── */
        .scanline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.09) 3px, rgba(0,0,0,0.09) 4px);
          pointer-events: none;
          z-index: 2;
        }

        /* ── PARTNER CTA HOVER (box-shadow glow) ── */
        .partner-cta:hover {
          background: rgba(26,158,74,0.12);
          border-color: rgba(77,255,145,0.7) !important;
          box-shadow: 0 0 16px rgba(26,158,74,0.2);
        }

        /* ── SCROLLBAR HIDE ── */
        .no-scrollbar { scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        /* ── HERO LISTEN NOW BUTTON ── */
        .listen-btn {
          font-family: 'Hemisphers Bold Sans', monospace;
          font-size: 1em;
          letter-spacing: 0.18em;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 32px;
          height: 52px;
          background: linear-gradient(175deg, #22b85a 0%, #178f42 100%);
          border: 1px solid #1a9e4a;
          border-bottom-color: #0d5c29;
          border-right-color: #126e32;
          box-shadow: 0 4px 0 #0d5c29, 0 6px 16px rgba(13,92,41,0.5), inset 0 1px 0 rgba(255,255,255,0.35);
          cursor: pointer;
          transition: transform 0.07s ease, box-shadow 0.07s ease, background 0.08s ease;
          user-select: none;
        }
        .listen-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(175deg, #2bd06a 0%, #1aa64c 100%);
          border-color: #4dff91;
          border-bottom-color: #0d5c29;
          box-shadow: 0 6px 0 #0d5c29, 0 8px 20px rgba(13,92,41,0.5), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 22px rgba(77,255,145,0.55);
        }
        .listen-btn:active {
          transform: translateY(4px);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.3), inset 0 0 16px rgba(77,255,145,0.2);
        }

        /* ── FLOATING MINI-PLAYER ── */
        .mini-player {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 200;
          width: 340px;
          background: #050f08;
          border: 1px solid rgba(26,158,74,0.5);
          box-shadow: 0 0 0 1px rgba(26,158,74,0.08), 0 12px 48px rgba(0,0,0,0.85), 0 0 32px rgba(26,158,74,0.08);
          transform: translateY(calc(100% + 40px));
          opacity: 0;
          transition: transform 0.38s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease;
          pointer-events: none;
        }
        .mini-player.visible {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .mini-player-close:hover { color: #fff; }

        /* ── CONTACT FORM STYLES ── */
        .contact-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(26,158,74,0.25);
          color: #fff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9em;
          padding: 10px 14px;
          border-radius: 2px;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          width: 100%;
        }
        .contact-input:focus {
          border-color: #4dff91;
          box-shadow: 0 0 0 1px #4dff91, 0 0 12px rgba(77,255,145,0.15);
        }
        .contact-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .contact-submit {
          font-family: 'Hemisphers Bold Sans', monospace;
          font-size: 1em;
          letter-spacing: 0.18em;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 32px;
          height: 52px;
          background: linear-gradient(175deg, #22b85a 0%, #178f42 100%);
          border: 1px solid #1a9e4a;
          border-bottom-color: #0d5c29;
          border-right-color: #126e32;
          box-shadow: 0 4px 0 #0d5c29, 0 6px 16px rgba(13,92,41,0.5), inset 0 1px 0 rgba(255,255,255,0.35);
          cursor: pointer;
          transition: transform 0.07s ease, box-shadow 0.07s ease, background 0.08s ease;
          user-select: none;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          background: linear-gradient(175deg, #2bd06a 0%, #1aa64c 100%);
          border-color: #4dff91;
          border-bottom-color: #0d5c29;
          box-shadow: 0 6px 0 #0d5c29, 0 8px 14px rgba(13,92,41,0.4), 0 0 14px rgba(77,255,145,0.45);
        }
        .contact-submit:active:not(:disabled) {
          transform: translateY(4px);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.25);
        }
        .contact-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .status-message {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85em;
          padding: 8px 14px;
          border-radius: 2px;
          margin-top: 8px;
        }
        .status-message.success {
          color: #4dff91;
          border: 1px solid rgba(77,255,145,0.3);
          background: rgba(77,255,145,0.08);
        }
        .status-message.error {
          color: #ff6b6b;
          border: 1px solid rgba(255,107,107,0.3);
          background: rgba(255,107,107,0.08);
        }
      `}</style>

      <div className="flex flex-col h-screen overflow-hidden">

        <Header />

        {/* ── BODY ROW ───────────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">
          <div className="relative flex-1 overflow-hidden bg-[#1a2b1e]">

            {/* Active section — releases / home */}
            <div
              className="scanline absolute inset-0 flex overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #1c2e20 0%, #181f1a 60%, #1a2420 100%)' }}
            >

              {/* ── NEWS SIDEBAR ──────────────────────────────────────── */}
              <aside className="news-sidebar relative flex flex-col w-80 flex-shrink-0 bg-[#fef8f3] z-[25] overflow-hidden">
                <Corners />

                <div className="no-scrollbar flex-1 overflow-y-auto">
                  {newsItems.map((item, i) => (
                    <div
                      key={i}
                      className="p-5 border-b border-[rgba(26,158,74,0.12)] transition-colors duration-150 hover:bg-[rgba(26,158,74,0.05)]"
                    >
                      {/* Image placeholder */}
                      <div
                        className="w-full h-[180px] mb-3 rounded-[3px] flex items-center justify-center opacity-55"
                        style={{
                          background: 'linear-gradient(135deg, #e3f6e9, #cfeede)',
                          border: '1px solid rgba(26,158,74,0.15)',
                          fontFamily: "'VT323', monospace",
                          fontSize: '0.85em',
                          letterSpacing: '0.3em',
                          color: '#1a9e4a',
                        }}
                      >
                        IMAGE
                      </div>
                      <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.78em', letterSpacing: '0.22em', color: '#1a9e4a', opacity: 0.8, marginBottom: '6px' }}>
                        {item.date}
                      </div>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.9em', color: '#16432a', lineHeight: 1.45 }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.78em', color: '#3c5e4c', opacity: 0.7, lineHeight: 1.6, marginTop: '8px' }}>
                        {item.teaser}
                      </div>
                      <span style={{ display: 'inline-block', marginTop: '10px', fontFamily: "'VT323', monospace", fontSize: '0.74em', letterSpacing: '0.2em', color: '#1a9e4a', opacity: 0.75, border: '1px solid rgba(26,158,74,0.25)', padding: '2px 8px', borderRadius: '1px' }}>
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>

              {/* ── MAIN SCROLL COLUMN ────────────────────────────────── */}
              <div className="no-scrollbar flex-1 min-h-0 overflow-y-auto flex flex-col">

                {/* ═══ NEW LABEL HERO — "REALEST. TRUEST." ═══ */}
                <div
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{ minHeight: 'calc(100vh - 100px)' }}
                >
                  {/* Background video */}
                  <video
                    src="/In Studio with Alexx A-Game - Life Of GameBoy.mp4"
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.50)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,16,12,0.7) 0%, transparent 25%, transparent 60%, rgba(10,16,12,0.95) 100%)' }} />

                  {/* Content */}
                  <div
                    className="relative z-[3] flex flex-col items-center justify-center gap-5 px-6 text-center"
                    style={{ minHeight: 'calc(100vh - 100px)' }}
                  >
                    <span
                      style={{
                        fontFamily: "'VT323', monospace",
                        fontSize: '0.95em',
                        letterSpacing: '0.35em',
                        color: '#4dff91',
                        border: '1px solid rgba(77,255,145,0.4)',
                        padding: '3px 14px',
                        borderRadius: '2px',
                        textShadow: '0 0 10px rgba(77,255,145,0.6)',
                        background: 'rgba(0,0,0,0.45)',
                      }}
                    >
                      THE LABEL
                    </span>

                    <div className="flex flex-col items-center gap-1">
                      <h1
                        style={{
                          fontFamily: "'Hemisphers Bold Sans', monospace",
                          fontSize: '3em',
                          color: '#fff',
                          letterSpacing: '0.12em',
                          textShadow: '0 2px 28px rgba(0,0,0,0.9), 0 0 50px rgba(77,255,145,0.10)',
                          lineHeight: 1.0,
                        }}
                      >
                        GAMEBOY RECORDS
                      </h1>
                      <p
                        style={{
                          fontFamily: "'VT323', monospace",
                          fontSize: '1.75em',
                          color: '#4dff91',
                          letterSpacing: '0.28em',
                          textShadow: '0 0 30px rgba(77,255,145,0.40)',
                          lineHeight: 1.2,
                          marginTop: '4px',
                        }}
                      >
                        REALEST SOUND. TRUEST VISION.
                      </p>
                    </div>

                    {/* Artist portraits strip 
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-2 max-w-4xl">
                      // Alexx A-Game — portrait photo 
                      <a href="/artists" className="flex flex-col items-center gap-2 transition-all duration-200 hover:scale-110">
                        // eslint-disable-next-line @next/next/no-img-element 
                        <img
                          src="/alexx-portrait.jpg"
                          alt="Alexx A-Game"
                          className="w-[80px] h-[80px] rounded-full border-[3px] border-[#4dff91] object-cover object-top"
                          style={{ boxShadow: '0 0 0 2px rgba(77,255,145,0.5), 0 0 22px rgba(77,255,145,0.95), 0 0 8px rgba(77,255,145,0.6)' }}
                        />
                        <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.9em', letterSpacing: '0.12em', color: '#fff' }}>
                          Alexx A-Game
                        </span>
                      </a>

                      // DJ Karma 
                      <a href="/artists" className="flex flex-col items-center gap-2 transition-all duration-200 hover:scale-110">
                        <div
                          className="w-[80px] h-[80px] rounded-full flex items-center justify-center border-[3px] border-[#4dff91]"
                          style={{
                            background: 'linear-gradient(135deg, #c0392b, #78281f)',
                            fontFamily: "'VT323', monospace",
                            fontSize: '2em',
                            color: '#fff',
                            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                            boxShadow: '0 0 0 2px rgba(77,255,145,0.5), 0 0 22px rgba(77,255,145,0.95), 0 0 8px rgba(77,255,145,0.6)',
                          }}
                        >
                          DK
                        </div>
                        <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.9em', letterSpacing: '0.12em', color: '#fff' }}>
                          DJ Karma
                        </span>
                      </a>

                      // Bassline 
                      <a href="/artists" className="flex flex-col items-center gap-2 transition-all duration-200 hover:scale-110">
                        <div
                          className="w-[80px] h-[80px] rounded-full flex items-center justify-center border-[3px] border-[#4dff91]"
                          style={{
                            background: 'linear-gradient(135deg, #2980b9, #1a5276)',
                            fontFamily: "'VT323', monospace",
                            fontSize: '2em',
                            color: '#fff',
                            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                            boxShadow: '0 0 0 2px rgba(77,255,145,0.5), 0 0 22px rgba(77,255,145,0.95), 0 0 8px rgba(77,255,145,0.6)',
                          }}
                        >
                          BL
                        </div>
                        <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.9em', letterSpacing: '0.12em', color: '#fff' }}>
                          Bassline
                        </span>
                      </a>

                      // Neon Noir 
                      <a href="/artists" className="flex flex-col items-center gap-2 transition-all duration-200 hover:scale-110">
                        <div
                          className="w-[80px] h-[80px] rounded-full flex items-center justify-center border-[3px] border-[#4dff91]"
                          style={{
                            background: 'linear-gradient(135deg, #8e44ad, #5b2d6e)',
                            fontFamily: "'VT323', monospace",
                            fontSize: '2em',
                            color: '#fff',
                            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                            boxShadow: '0 0 0 2px rgba(77,255,145,0.5), 0 0 22px rgba(77,255,145,0.95), 0 0 8px rgba(77,255,145,0.6)',
                          }}
                        >
                          NN
                        </div>
                        <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.9em', letterSpacing: '0.12em', color: '#fff' }}>
                          Neon Noir
                        </span>
                      </a>

                      // Vibe X 
                      <a href="/artists" className="flex flex-col items-center gap-2 transition-all duration-200 hover:scale-110">
                        <div
                          className="w-[80px] h-[80px] rounded-full flex items-center justify-center border-[3px] border-[#4dff91]"
                          style={{
                            background: 'linear-gradient(135deg, #d35400, #6e2c00)',
                            fontFamily: "'VT323', monospace",
                            fontSize: '2em',
                            color: '#fff',
                            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                            boxShadow: '0 0 0 2px rgba(77,255,145,0.5), 0 0 22px rgba(77,255,145,0.95), 0 0 8px rgba(77,255,145,0.6)',
                          }}
                        >
                          VX
                        </div>
                        <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.9em', letterSpacing: '0.12em', color: '#fff' }}>
                          Vibe X
                        </span>
                      </a>

                    </div>
                    */}

                    {/* TUNE IN CTA */}
                    <button className="listen-btn" onClick={openPlayer} style={{ marginTop: '6px' }}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 block" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      TUNE IN
                    </button>
                  </div>
                </div>

                {/* ── HERO — full-height video background (Hurt Inside) ── */}
                <div
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{ minHeight: 'calc(100vh - 100px)' }}
                >
                  {/* Background video */}
                  <video
                    src="/Alexx%20A-Game%20-%20Hurt%20Inside%20(Official%20Music%20Video).mp4"
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Overlay layer 1 — uniform dark tint for readability */}
                  <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />
                  {/* Overlay layer 2 — top + bottom gradient fade */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,16,12,0.6) 0%, transparent 22%, transparent 62%, rgba(10,16,12,0.98) 100%)' }} />

                  {/* Hero content */}
                  <div
                    className="relative z-[3] flex flex-col items-center justify-center gap-6 px-10 text-center"
                    style={{ minHeight: 'calc(100vh - 100px)' }}
                  >
                    <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.72em', letterSpacing: '0.35em', color: '#4dff91', border: '1px solid rgba(77,255,145,0.4)', padding: '3px 12px', borderRadius: '2px', textShadow: '0 0 10px rgba(77,255,145,0.6)', background: 'rgba(0,0,0,0.45)' }}>
                      FEATURED RELEASE
                    </span>
                    <div className="flex flex-col items-center gap-1">
                      <h1 style={{ fontFamily: "'Hemisphers Bold Sans', monospace", fontSize: '3em', color: '#fff', letterSpacing: '0.15em', textShadow: '0 2px 28px rgba(0,0,0,0.9), 0 0 40px rgba(77,255,145,0.12)', lineHeight: 1 }}>
                        ALEXX A-GAME
                      </h1>
                      <h2 style={{ fontFamily: "'VT323', monospace", fontSize: '1.75em', color: '#4dff91', letterSpacing: '0.28em', textShadow: '0 0 24px rgba(77,255,145,0.55)', lineHeight: 1 }}>
                        HURT INSIDE
                      </h2>
                    </div>
                    <button className="listen-btn" onClick={openPlayer}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 block" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      LISTEN NOW
                    </button>
                  </div>
                </div>

                {/* Partners section */}
                <div
                  className="flex-shrink-0 relative z-[2] px-12 py-10 border-t border-[rgba(26,158,74,0.2)]"
                  style={{ background: 'linear-gradient(180deg, #0f1a12 0%, #0c1510 100%)' }}
                >
                  <GameIconsBackground />
                  {/* Section header */}
                  <div className="flex flex-col items-center mb-12 text-center">
                    <h2 style={{ fontFamily: "'Hemisphers Bold Sans', monospace", fontSize: '3em', color: '#4dff91', letterSpacing: '0.2em', textShadow: '0 0 20px rgba(77,255,145,0.25)' }}>
                      PARTNERS
                    </h2>
                    <p style={{ fontFamily: "'VT323', monospace", fontSize: '1.75em', color: '#4dff91', opacity: 0.4 }}>
                      Brands and organisations we work alongside.
                    </p>
                  </div>

                  {/* Vault showcase card */}
                  <div
                    className="relative grid grid-cols-2 max-w-[1080px] mx-auto bg-[#fef8f3] border-[4px] border-[#3dc97e] rounded"
                    style={{ minHeight: '420px', alignItems: 'stretch' }}
                  >

                    {/* Left — video */}
                    <div className="w-full h-[440px] overflow-hidden">
                      <video
                        src="/vault.mp4"
                        poster="/the-vault-1.jpg"
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover block"
                      />
                    </div>

                    {/* Right — content */}
                    <div className="flex flex-col items-start justify-center gap-8 px-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/the-vault-logo.jpg" alt="The Vault" className="max-w-[260px] h-auto block" />
                      <p  className="font-bold" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '1em', color: '#16432a', lineHeight: 1.6 }}>
                        A partnering recording studio built for late-night sessions and serious sound. The Vault is where Gameboy Records artists track, mix, and bring records to life.
                      </p>
                      <a
                        href="#"
                        className="listen-btn inline-flex items-center gap-2 no-underline transition-all duration-150"
                        style={{ letterSpacing: '0.2em', padding: '8px 20px' }}
                      >
                        BOOK A SESSION →
                      </a>
                    </div>
                  </div>
                </div>

                {/* ── CONTACT US SECTION ────────────────────────────────── */}
                <div
                  className="flex-shrink-0 relative z-[2] px-12 py-20 border-t border-[rgba(26,158,74,0.2)]"
                  style={{ background: 'linear-gradient(180deg, #0f1a12 0%, #0c1510 100%)' }}
                >
                  <div className="flex flex-col items-center mb-12 text-center">
                    <h2
                      style={{ fontFamily: "'Hemisphers Bold Sans', monospace", fontSize: '3em', color: '#4dff91', letterSpacing: '0.2em', textShadow: '0 0 20px rgba(77,255,145,0.25)' }}
                    >
                      SEND A MESSAGE
                    </h2>
                    <p
                      style={{ fontFamily: "'VT323', monospace", fontSize: '1.75em', color: '#4dff91', opacity: 0.4 }}
                    >
                      We’ll get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto flex flex-col gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-input"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact-input"
                    />
                    <textarea
                      name="message"
                      placeholder="Your message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="contact-input"
                      style={{ resize: 'vertical' }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-submit self-start"
                    >
                      {isSubmitting ? 'SENDING…' : 'SEND MESSAGE'}
                    </button>
                    {submitStatus.type && (
                      <div className={`status-message ${submitStatus.type}`}>
                        {submitStatus.message}
                      </div>
                    )}
                  </form>
                </div>

              </div>{/* /main-scroll */}

            </div>{/* /section */}
          </div>
        </div>

      </div>

      {/* ── FLOATING MINI-PLAYER ───────────────────────────────────────
           Rendered once on first click and never unmounted — the iframe
           keeps playing while the panel is hidden. Close button only
           slides the panel out; it does not kill the audio.
      ─────────────────────────────────────────────────────────────── */}
      {playerMounted && (
        <div className={`mini-player${playerVisible ? ' visible' : ''}`}>

          {/* Header bar */}
          <div
            className="flex items-center justify-between px-3 border-b border-[rgba(26,158,74,0.25)]"
            style={{ height: '36px' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4dff91] animate-pulse" />
              <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.7em', letterSpacing: '0.28em', color: '#4dff91' }}>
                NOW PLAYING
              </span>
            </div>
            <button
              onClick={() => setPlayerVisible(false)}
              className="mini-player-close transition-colors"
              style={{ fontFamily: "'VT323', monospace", fontSize: '1em', color: '#4dff91', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}
              aria-label="Hide player"
            >
              ✕
            </button>
          </div>

          {/* Embedded playlist iframe — now using your playlist ID */}
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PL5jjb3J99wR7DQiFdlhXnit_1bZt2a4Bo&autoplay=1&controls=1"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Gameboy Records Playlist"
            className="w-full border-0 block"
            style={{ height: '191px' }}
          />

        </div>
      )}
    </>
  );
}