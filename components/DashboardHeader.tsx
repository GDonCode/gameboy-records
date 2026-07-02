// components/DashboardHeader.tsx
'use client';

import Link from 'next/link';

export default function DashboardHeader() {
  return (
    <header className="w-full flex items-center justify-center h-[100px] bg-[#fef8f3] flex-shrink-0">
      <Link href="/" className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gameboy-logo-removebg-preview.png"
          alt="Gameboy Records"
          className="h-[54px] w-auto block"
        />
      </Link>
    </header>
  );
}