import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header
      role="navigation"
      aria-label="Main Navigation"
      className="sticky top-0 z-50 w-full bg-transparent" 
    >
      <div className="mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:h-[100px]">
       
        <div className="shrink-0">
          <Image
            src="/logo.png"
            alt="ScapeSync Logo"
            width={147}
            height={60}
            priority
            className="w-[147px] h-auto"
            sizes="147px"
          />
        </div>
          <Link href="/login" className="inline-block whitespace-nowrap rounded-lg bg-[#3BA334] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3BA334] sm:px-6 sm:py-2.5 sm:text-base">
  Get Started
</Link>
      </div>
    </header>
  );
};

export default Navbar; 
