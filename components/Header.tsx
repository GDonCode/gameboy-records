'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const MEDIA_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media`;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="relative flex-shrink-0 bg-[#fef8f3] z-10">
      <Corners />
      <div className="flex items-end justify-between h-[90px] px-7 relative z-[1]">
        {/* Logo */}
        <Link href="/" className="flex items-center self-center">
          <div className="flex items-center self-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${MEDIA_BASE}/gameboy-logo-removebg-preview.png`} alt="Gameboy Records" className="h-[48px] w-auto block" />
          </div>
        </Link>

         {/* Nav */}
        <nav className="flex items-center self-center">
          <a href="/blog" className={`nav-btn${pathname === '/blog' ? ' active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
              <path d="M320 544C461.4 544 576 436.5 576 304C576 171.5 461.4 64 320 64C178.6 64 64 171.5 64 304C64 358.3 83.2 408.3 115.6 448.5L66.8 540.8C62 549.8 63.5 560.8 70.4 568.3C77.3 575.8 88.2 578.1 97.5 574.1L215.9 523.4C247.7 536.6 282.9 544 320 544zM192 272C209.7 272 224 286.3 224 304C224 321.7 209.7 336 192 336C174.3 336 160 321.7 160 304C160 286.3 174.3 272 192 272zM320 272C337.7 272 352 286.3 352 304C352 321.7 337.7 336 320 336C302.3 336 288 321.7 288 304C288 286.3 302.3 272 320 272zM416 304C416 286.3 430.3 272 448 272C465.7 272 480 286.3 480 304C480 321.7 465.7 336 448 336C430.3 336 416 321.7 416 304z" />
            </svg>
            BLOG
          </a>

          <a href="/artists" className={`nav-btn${pathname === '/artists' ? ' active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
              <path d="M224 160C224 107 267 64 320 64C370.3 64 411.6 102.7 415.7 152L360 152C346.7 152 336 162.7 336 176C336 189.3 346.7 200 360 200L416 200L416 248L360 248C346.7 248 336 258.7 336 272C336 285.3 346.7 296 360 296L415.7 296C411.6 345.3 370.4 384 320 384C267 384 224 341 224 288L224 160zM152 224C165.3 224 176 234.7 176 248L176 288C176 367.5 240.5 432 320 432C399.5 432 464 367.5 464 288L464 248C464 234.7 474.7 224 488 224C501.3 224 512 234.7 512 248L512 288C512 385.9 438.7 466.7 344 478.5L344 528L392 528C405.3 528 416 538.7 416 552C416 565.3 405.3 576 392 576L248 576C234.7 576 224 565.3 224 552C224 538.7 234.7 528 248 528L296 528L296 478.5C201.3 466.7 128 385.9 128 288L128 248C128 234.7 138.7 224 152 224z" />
            </svg>
            ARTISTS
          </a>

          <a href="/events" className={`nav-btn${pathname === '/events' ? ' active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
              <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z" />
            </svg>
            EVENTS
          </a>

          <a href="/merch" className={`nav-btn${pathname === '/merch' ? ' active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
              <path d="M94.7 136.3C101.6 112.4 123.5 96 148.4 96L492.4 96C517.3 96 539.2 112.4 546.2 136.3L569.6 216.5C582.4 260.2 549.5 304 504 304C477.7 304 454.6 289.1 443.2 266.9C431.6 288.8 408.6 304 381.8 304C355.2 304 332.1 289 320.5 267C308.9 289 285.8 304 259.2 304C232.4 304 209.4 288.9 197.8 266.9C186.4 289 163.3 304 137 304C91.4 304 58.6 260.3 71.4 216.5L94.7 136.3zM160.4 416L480.4 416L480.4 349.6C488 351.2 495.9 352 503.9 352C518.2 352 531.9 349.4 544.4 344.8L544.4 496C544.4 522.5 522.9 544 496.4 544L144.4 544C117.9 544 96.4 522.5 96.4 496L96.4 344.8C108.9 349.4 122.5 352 136.9 352C145 352 152.8 351.2 160.4 349.6L160.4 416z" />
            </svg>
            MERCH
          </a>

          {/* Games group */}
          <div className="relative flex flex-col items-center ml-3.5 pl-3.5 border-l border-[rgba(26,158,74,0.22)]">
            <div className="absolute bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[18px] h-[18px] block">
                <path fill="#1a9e4a" d="M448 128C554 128 640 214 640 320C640 426 554 512 448 512L192 512C86 512 0 426 0 320C0 214 86 128 192 128L448 128zM192 240C178.7 240 168 250.7 168 264L168 296L136 296C122.7 296 112 306.7 112 320C112 333.3 122.7 344 136 344L168 344L168 376C168 389.3 178.7 400 192 400C205.3 400 216 389.3 216 376L216 344L248 344C261.3 344 272 333.3 272 320C272 306.7 261.3 296 248 296L216 296L216 264C216 250.7 205.3 240 192 240zM432 336C414.3 336 400 350.3 400 368C400 385.7 414.3 400 432 400C449.7 400 464 385.7 464 368C464 350.3 449.7 336 432 336zM496 240C478.3 240 464 254.3 464 272C464 289.7 478.3 304 496 304C513.7 304 528 289.7 528 272C528 254.3 513.7 240 496 240z" />
              </svg>
            </div>
            <div className="flex">
              <a href="/karaoke" className={`nav-btn nav-btn-sm${pathname === '/karaoke' ? ' active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 flex-shrink-0 block">
                  <path d="M320 64C267 64 224 107 224 160L224 288C224 341 267 384 320 384C373 384 416 341 416 288L416 160C416 107 373 64 320 64zM176 248C176 234.7 165.3 224 152 224C138.7 224 128 234.7 128 248L128 288C128 385.9 201.3 466.7 296 478.5L296 528L248 528C234.7 528 224 538.7 224 552C224 565.3 234.7 576 248 576L392 576C405.3 576 416 565.3 416 552C416 538.7 405.3 528 392 528L344 528L344 478.5C438.7 466.7 512 385.9 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 367.5 399.5 432 320 432C240.5 432 176 367.5 176 288L176 248z" />
                </svg>
                KARAOKE
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}