"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F3B34] text-[#CFD8D6]">
      <div className="mx-auto w-full max-w-[104.9rem] px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex items-center">
            <Image
              src="/assets/Footer-logo.png"
              alt="ScapeSync logo"
              width={207}
              height={76}
              priority={false}
              sizes="(max-width: 1024px) 160px, 207px"
              className="h-auto w-[160px] md:w-[207px]"
            />
          </div>

          <p className="max-w-xl text-sm sm:text-base leading-relaxed lg:ml-6">
            Your all-in-one platform for job scheduling, employee management, and client
            service—built to keep your business running smoothly from anywhere.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:ml-auto">
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className="transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            >
              <Image
                src="/assets/App-store.png"
                alt="Download on the App Store"
                width={170}
                height={60}
                sizes="(max-width: 640px) 140px, 170px"
                className="h-[44px] w-auto sm:h-[52px] md:h-[60px]"
              />
            </Link>
            <Link
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            >
              <Image
                src="/assets/Playstore.png"
                alt="Get it on Google Play"
                width={161}
                height={60}
                sizes="(max-width: 640px) 140px, 161px"
                className="h-[44px] w-auto sm:h-[52px] md:h-[60px]"
              />
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-14">
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image
                src="/assets/youtube.png"
                alt="" 
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </Link>
            <Link
              href="https://x.com/SayraSanzida"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image src="/assets/X.png" alt="" width={24} height={24} className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.facebook.com/sanzida.sayra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image
                src="/assets/facebook.png"
                alt=""
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image
                src="/assets/instagram.png"
                alt=""
                width={24}
                height={24}
                className="h-5 w-5"
              />
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 border-t border-white/10" />

        <div className="py-6 lg:py-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs sm:text-sm text-[#E5E5E5]">
              © 2021–{year}, ScapeSync. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
