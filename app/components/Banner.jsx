import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <div className="relative mb-[5.1rem] flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between md:gap-6 lg:gap-10 px-4 sm:px-6 lg:px-8">
      <div className="mt-6 text-center md:mt-[5.6rem] md:text-left lg:px-0">
        <div className="relative w-fit mx-auto md:mx-0">
          <Image
            src="/assets/banner-bg1.png"
            alt=""
            width={129}
            height={134}
            className="pointer-events-none select-none absolute -top-10 left-1/2 -translate-x-1/2 -z-10 opacity-90 md:-top-16"
            aria-hidden
            priority
            sizes="(max-width: 768px) 120px, 129px"
          />

          <h1 className="font-bold leading-[1.05] text-[#212B36] max-w-[38rem] mb-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            All Your Jobs
            <br />
            <span className="relative inline-block">
              One Smart App
              <Image
                src="/assets/banner-bg3.png"
                alt=""
                width={370}
                height={28}
                className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-2 sm:left-2/3"
                aria-hidden
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 300px, 370px"
              />
            </span>
          </h1>
        </div>

        <p className="mx-auto md:mx-0 max-w-[26rem] text-[#637381] text-sm sm:text-[15px] mb-8 sm:mb-12 md:mb-[4rem]">
          Built for business owners, employees, and clients streamline job
          scheduling, service tracking, and team management in one powerful app.
        </p>

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

      <div className="w-full max-w-[720px] md:w-auto flex justify-center md:justify-end">
        <Image
          src="/assets/Hero.png"
          alt="banner"
          width={720}
          height={656}
          priority
          className="h-auto w-[88%] sm:w-[80%] md:w-[520px] lg:w-[640px] xl:w-[720px]"
          sizes="(max-width: 640px) 88vw, (max-width: 768px) 80vw, (max-width: 1024px) 520px, (max-width: 1280px) 640px, 720px"
        />
      </div>
    </div>
  );
};

export default Banner;
