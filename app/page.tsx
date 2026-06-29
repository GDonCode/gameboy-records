'use client';

import { useState } from 'react';

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

  function openPlayer() {
    setPlayerMounted(true);
    setPlayerVisible(true);
  }

  return (
    <>
      <style>{`

        /* ── NAV BUTTONS (multi-layer shadow + sibling selector — not expressible in Tailwind) ── */
        .nav-btn {
          font-family: 'Hemisphers Bold Sans', monospace;
          font-size: 1.1em;
          letter-spacing: 0.14em;
          text-decoration: none;
          color: #fff;
          text-shadow: 0 1px 1px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          padding: 0 22px;
          gap: 8px;
          position: relative;
          background: linear-gradient(175deg, #22b85a 0%, #178f42 100%);
          border: 1px solid #1a9e4a;
          border-bottom-color: #0d5c29;
          border-right-color: #126e32;
          box-shadow: 0 4px 0 #0d5c29, 0 6px 10px rgba(13,92,41,0.35), inset 0 1px 0 rgba(255,255,255,0.35);
          transition: transform 0.07s ease, box-shadow 0.07s ease, background 0.08s ease, border-color 0.08s ease;
          user-select: none;
        }
        .nav-btn + .nav-btn { border-left: none; }
        .nav-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(175deg, #2bd06a 0%, #1aa64c 100%);
          border-color: #4dff91;
          border-bottom-color: #0d5c29;
          box-shadow: 0 6px 0 #0d5c29, 0 8px 14px rgba(13,92,41,0.4), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 14px rgba(77,255,145,0.45);
        }
        .nav-btn:active {
          transform: translateY(4px);
          background: linear-gradient(175deg, #178f42 0%, #0d5c29 100%);
          border-color: #0d5c29;
          border-top-color: #0a4a21;
          border-bottom-color: #1a9e4a;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.25), inset 0 0 16px rgba(77,255,145,0.18);
        }
        .nav-btn svg path { fill: currentColor; }
        .nav-btn-sm { font-size: 0.85em; letter-spacing: 0.08em; padding: 0 14px; }

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
          z-index: 20;
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
      `}</style>

      <div className="flex flex-col h-screen overflow-hidden">

        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <header className="relative flex-shrink-0 bg-white z-10">
          <Corners />
          <div className="flex items-end justify-between h-[100px] px-7 relative z-[1]">

            {/* Logo */}
            <div className="flex items-center self-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gameboy-logo.jpg" alt="Gameboy Records" className="h-[54px] w-auto block" />
            </div>

            {/* Nav */}
            <nav className="flex items-center self-center">
              <a href="/merch" className="nav-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
                  <path d="M94.7 136.3C101.6 112.4 123.5 96 148.4 96L492.4 96C517.3 96 539.2 112.4 546.2 136.3L569.6 216.5C582.4 260.2 549.5 304 504 304C477.7 304 454.6 289.1 443.2 266.9C431.6 288.8 408.6 304 381.8 304C355.2 304 332.1 289 320.5 267C308.9 289 285.8 304 259.2 304C232.4 304 209.4 288.9 197.8 266.9C186.4 289 163.3 304 137 304C91.4 304 58.6 260.3 71.4 216.5L94.7 136.3zM160.4 416L480.4 416L480.4 349.6C488 351.2 495.9 352 503.9 352C518.2 352 531.9 349.4 544.4 344.8L544.4 496C544.4 522.5 522.9 544 496.4 544L144.4 544C117.9 544 96.4 522.5 96.4 496L96.4 344.8C108.9 349.4 122.5 352 136.9 352C145 352 152.8 351.2 160.4 349.6L160.4 416z" />
                </svg>
                MERCH
              </a>

              <a href="/artists" className="nav-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
                  <path d="M224 160C224 107 267 64 320 64C370.3 64 411.6 102.7 415.7 152L360 152C346.7 152 336 162.7 336 176C336 189.3 346.7 200 360 200L416 200L416 248L360 248C346.7 248 336 258.7 336 272C336 285.3 346.7 296 360 296L415.7 296C411.6 345.3 370.4 384 320 384C267 384 224 341 224 288L224 160zM152 224C165.3 224 176 234.7 176 248L176 288C176 367.5 240.5 432 320 432C399.5 432 464 367.5 464 288L464 248C464 234.7 474.7 224 488 224C501.3 224 512 234.7 512 248L512 288C512 385.9 438.7 466.7 344 478.5L344 528L392 528C405.3 528 416 538.7 416 552C416 565.3 405.3 576 392 576L248 576C234.7 576 224 565.3 224 552C224 538.7 234.7 528 248 528L296 528L296 478.5C201.3 466.7 128 385.9 128 288L128 248C128 234.7 138.7 224 152 224z" />
                </svg>
                ARTISTS
              </a>

              <a href="/events" className="nav-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
                  <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z" />
                </svg>
                EVENTS
              </a>

              {/* Games group — gamepad icon floats above, two slim buttons below */}
              <div className="relative flex flex-col items-center ml-3.5 pl-3.5 border-l border-[rgba(26,158,74,0.22)]">
                <div className="absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[18px] h-[18px] block">
                    <path fill="#1a9e4a" d="M448 128C554 128 640 214 640 320C640 426 554 512 448 512L192 512C86 512 0 426 0 320C0 214 86 128 192 128L448 128zM192 240C178.7 240 168 250.7 168 264L168 296L136 296C122.7 296 112 306.7 112 320C112 333.3 122.7 344 136 344L168 344L168 376C168 389.3 178.7 400 192 400C205.3 400 216 389.3 216 376L216 344L248 344C261.3 344 272 333.3 272 320C272 306.7 261.3 296 248 296L216 296L216 264C216 250.7 205.3 240 192 240zM432 336C414.3 336 400 350.3 400 368C400 385.7 414.3 400 432 400C449.7 400 464 385.7 464 368C464 350.3 449.7 336 432 336zM496 240C478.3 240 464 254.3 464 272C464 289.7 478.3 304 496 304C513.7 304 528 289.7 528 272C528 254.3 513.7 240 496 240z" />
                  </svg>
                </div>
                <div className="flex">
                  <a href="#" className="nav-btn nav-btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
                      <path d="M320 64C267 64 224 107 224 160L224 288C224 341 267 384 320 384C373 384 416 341 416 288L416 160C416 107 373 64 320 64zM176 248C176 234.7 165.3 224 152 224C138.7 224 128 234.7 128 248L128 288C128 385.9 201.3 466.7 296 478.5L296 528L248 528C234.7 528 224 538.7 224 552C224 565.3 234.7 576 248 576L392 576C405.3 576 416 565.3 416 552C416 538.7 405.3 528 392 528L344 528L344 478.5C438.7 466.7 512 385.9 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 367.5 399.5 432 320 432C240.5 432 176 367.5 176 288L176 248z" />
                    </svg>
                    KARAOKE
                  </a>
                  <a href="#" className="nav-btn nav-btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
                      <path d="M544 128C544 145.7 529.7 160 512 160L288 160C270.3 160 256 145.7 256 128C256 110.3 270.3 96 288 96L512 96C529.7 96 544 110.3 544 128zM544 384C544 401.7 529.7 416 512 416L288 416C270.3 416 256 401.7 256 384C256 366.3 270.3 352 288 352L512 352C529.7 352 544 366.3 544 384zM96 256C96 238.3 110.3 224 128 224L512 224C529.7 224 544 238.3 544 256C544 273.7 529.7 288 512 288L128 288C110.3 288 96 273.7 96 256zM544 512C544 529.7 529.7 544 512 544L128 544C110.3 544 96 529.7 96 512C96 494.3 110.3 480 128 480L512 480C529.7 480 544 494.3 544 512z" />
                    </svg>
                    FINISH THE LYRIC
                  </a>
                </div>
              </div>
            </nav>

          </div>
        </header>

        {/* ── BODY ROW ───────────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">
          <div className="relative flex-1 overflow-hidden bg-[#1a2b1e]">

            {/* Active section — releases / home */}
            <div
              className="scanline absolute inset-0 flex overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #1c2e20 0%, #181f1a 60%, #1a2420 100%)' }}
            >

              {/* ── NEWS SIDEBAR ──────────────────────────────────────── */}
              <aside className="news-sidebar relative flex flex-col w-80 flex-shrink-0 bg-white z-[25] overflow-hidden">
                <Corners />

                <div
                  className="flex-shrink-0 px-5 py-4 text-[#1a9e4a] border-b border-[rgba(26,158,74,0.14)]"
                  style={{ fontFamily: "'VT323', monospace", fontSize: '0.7em', letterSpacing: '0.38em' }}
                >
                  NEWS &amp; BLOG
                </div>

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

                {/* ── HERO — full-height video background ── */}
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
                      <h1 style={{ fontFamily: "'VT323', monospace", fontSize: '5em', color: '#fff', letterSpacing: '0.15em', textShadow: '0 2px 28px rgba(0,0,0,0.9), 0 0 40px rgba(77,255,145,0.12)', lineHeight: 1 }}>
                        ALEXX A-GAME
                      </h1>
                      <h2 style={{ fontFamily: "'VT323', monospace", fontSize: '2.4em', color: '#4dff91', letterSpacing: '0.28em', textShadow: '0 0 24px rgba(77,255,145,0.55)', lineHeight: 1 }}>
                        HURT INSIDE
                      </h2>
                    </div>
                    <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', color: '#fff', opacity: 0.55, maxWidth: '380px', lineHeight: 1.65, textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
                      New single out now on Gameboy Records. Stream and support below.
                    </p>
                    <button className="listen-btn" onClick={openPlayer}>
                      {/* play triangle */}
                      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 block" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      LISTEN NOW
                    </button>
                  </div>
                </div>

                {/* Partners section */}
                <div
                  className="flex-shrink-0 relative z-[2] px-12 py-20 border-t border-[rgba(26,158,74,0.2)]"
                  style={{ background: 'linear-gradient(180deg, #0f1a12 0%, #0c1510 100%)' }}
                >
                  {/* Section header */}
                  <div className="flex flex-col items-center gap-2.5 mb-12 text-center">
                    <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.72em', letterSpacing: '0.35em', color: '#1a9e4a', border: '1px solid rgba(26,158,74,0.35)', padding: '3px 10px', borderRadius: '2px', textShadow: '0 0 6px rgba(26,158,74,0.4)' }}>
                      LABEL NETWORK
                    </span>
                    <h2 style={{ fontFamily: "'VT323', monospace", fontSize: '3.5em', color: '#4dff91', letterSpacing: '0.2em', textShadow: '0 0 20px rgba(77,255,145,0.25)' }}>
                      PARTNERS
                    </h2>
                    <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', color: '#4dff91', opacity: 0.4 }}>
                      Brands and organisations we work alongside.
                    </p>
                  </div>

                  {/* Vault showcase card */}
                  <div
                    className="relative grid grid-cols-2 max-w-[1080px] mx-auto border border-[rgba(26,158,74,0.16)] bg-[rgba(26,158,74,0.03)]"
                    style={{ minHeight: '420px', alignItems: 'stretch' }}
                  >
                    <span
                      className="absolute top-4 left-4 z-[2]"
                      style={{ fontFamily: "'VT323', monospace", fontSize: '0.68em', letterSpacing: '0.3em', color: '#4dff91', background: 'rgba(8,16,11,0.7)', border: '1px solid rgba(26,158,74,0.35)', padding: '2px 8px', borderRadius: '2px', textShadow: '0 0 6px rgba(26,158,74,0.4)' }}
                    >
                      PARTNER
                    </span>

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
                    <div className="flex flex-col items-start justify-center gap-4 p-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/the-vault-logo.jpg" alt="The Vault" className="max-w-[260px] h-auto block" />
                      <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85em', color: '#4dff91', opacity: 0.6, lineHeight: 1.6 }}>
                        A partnering recording studio built for late-night sessions and serious sound. The Vault is where Gameboy Records artists track, mix, and bring records to life.
                      </p>
                      <a
                        href="#"
                        className="partner-cta inline-flex items-center gap-2 no-underline transition-all duration-150"
                        style={{ fontFamily: "'VT323', monospace", fontSize: '1em', letterSpacing: '0.2em', color: '#4dff91', border: '1px solid rgba(26,158,74,0.5)', padding: '8px 20px' }}
                      >
                        BOOK A SESSION →
                      </a>
                    </div>
                  </div>

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
           TODO: replace the iframe src with your actual playlist embed:
             YouTube → https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID&autoplay=1
             Spotify → https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID
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

          {/* Embedded playlist iframe */}
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID&autoplay=1&controls=1"
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