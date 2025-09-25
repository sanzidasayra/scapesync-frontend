"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F3B34] text-[#CFD8D6] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
      >
        <Image
          src="/assets/Footer-vector-1.png"
          alt=""
          width={650}
          height={700}
          className="absolute right-[-160px] top-[-20px] opacity-70"
          priority={false}
        />
        <Image
          src="/assets/Footer-vector-2.png"
          alt=""
          width={680}
          height={520}
          className="absolute right-0 top-[140px] bottom-[-40px] opacity-80 z-50"
          priority={false}
        />
        <Image
          src="/assets/Footer-vector-3.png"
          alt=""
          width={400}
          height={420}
          className="absolute right-[200px] bottom-[-40px] opacity-80"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[104.9rem] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-[7.31rem]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex items-center">
            <Image
              src="/assets/Footer-logo.png"
              alt="ScapeSync logo"
              width={207}
              height={76}
              sizes="(max-width: 1024px) 160px, 207px"
              className="h-auto w-[160px] md:w-[207px]"
              priority={false}
            />
          </div>

          <p className="max-w-xl leading-relaxed text-sm sm:text-base lg:ml-6">
            Your all-in-one platform for job scheduling, employee management, and client service built to keep your business running smoothly from anywhere.
          </p>

          <div className="relative lg:ml-auto">
           
            <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-[1.125rem]">
              <Link 
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className="flex items-center gap-3 rounded-[6px] border border-[#ABDAA9] px-3.5 backdrop-blur-sm bg-white/0 hover:bg-white/5 transition"
              >
                <Image
                  src="/assets/app.png"
                  alt="App Store"
                  height={27}
                  width={22}
                  sizes="22px"
                />
                <div className="py-[0.6rem] text-left">
                  <p className="text-[9px] leading-3">Download on the</p>
                  <h3 className="text-[18px] font-semibold leading-5">App Store</h3>
                </div>
              </Link>

              <Link 
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className="flex items-center gap-3 rounded-[6px] border border-[#ABDAA9] px-3.5 backdrop-blur-sm bg-white/0 hover:bg-white/5 transition"
              >
                <Image
                  src="/assets/Playstore.png"
                  alt="Google Play"
                  height={27}
                  width={22}
                  sizes="22px"
                />
                <div className="py-[0.6rem] text-left">
                  <p className="text-[9px] leading-3">Download on the</p>
                  <h3 className="text-[18px] font-semibold leading-5">Google Play</h3>
                </div>
              </Link>
            </div>
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
              <Image src="/assets/youtube.png" alt="" width={24} height={24} />
            </Link>
            <Link
              href="https://x.com/SayraSanzida"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image src="/assets/X.png" alt="" width={24} height={24} />
            </Link>
            <Link
              href="https://www.facebook.com/sanzida.sayra"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image src="/assets/facebook.png" alt="" width={24} height={24} />
            </Link>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Image src="/assets/instagram.png" alt="" width={24} height={24} />
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 sm:mt-10 lg:mt-12" />

        <div className="py-6 lg:py-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#E5E5E5] sm:text-sm">
              © 2021–{year}, ScapeSync. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
