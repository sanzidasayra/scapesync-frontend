import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <div className="relative flex justify-between mb-[5.1rem]">
      <div className="mt-[5.6rem]">
        <div className="relative w-fit">
          <Image
            src="/assets/banner-bg1.png"
            alt=""
            width={129}
            height={134}
            className="pointer-events-none select-none absolute -top-16 left-1/2 -translate-x-1/2 -z-10 opacity-90"
            aria-hidden
            priority
          />

          <h1 className="font-bold text-7xl text-[#212B36] max-w-[38rem] mb-2 leading-[1.05]">
            All Your Jobs
            <br />
            <span className="relative inline-block">
              One Smart App
              <Image
                src="/assets/banner-bg2.png"
                alt=""
                width={300}
                height={28}
                className="pointer-events-none select-none absolute left-2/3 -translate-x-1/2 bottom-0 translate-y-2"
                aria-hidden
              />
            </span>
          </h1>
        </div>

        <p className="max-w-[26rem] text-[#637381] text-[14px] mb-[4rem]">
          Built for business owners, employees, and clients streamline job
          scheduling, service tracking, and team management in one powerful app.
        </p>

        <div className="flex gap-[1.125rem]">
          <button className="flex items-center gap-3 border border-[#ABDAA9] rounded-[6px] px-3.5">
            <Image src="/assets/Apple.png" alt="App Store" height={27} width={22} />
            <div className="py-[0.6rem]">
              <p className="text-[9px]">Download on the</p>
              <h3 className="font-semibold text-[18px]">App Store</h3>
            </div>
          </button>

          <button className="flex items-center gap-3 border border-[#ABDAA9] rounded-[6px] px-3.5">
            <Image src="/assets/Playstore.png" alt="Play Store" height={27} width={22} />
            <div className="py-[0.6rem]">
              <p className="text-[9px]">Download on the</p>
              <h3 className="font-semibold text-[18px]">Google Play</h3>
            </div>
          </button>
        </div>
      </div>

      <div>
        <Image src="/assets/Hero.png" alt="banner" width={720} height={656} />
      </div>
    </div>
  );
};

export default Banner;
