"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const LINES = {
  top: "/assets/banner-bg2.png",
  r1: "/assets/greenline1.png",
  r2: "/assets/greenline2.png",
  r3: "/assets/greenline3.png",
};

const audiences = [
  {
    badge: "Users",
    title: "Book services, track progress and stay updated",
    desc:
      "Easily schedule appointments, get real-time updates, and enjoy a smooth, transparent service experience.",
    bullets: [
      "Book services in seconds",
      "Track real-time job updates",
      "Schedule at your convenience",
    ],
    image: "/assets/build1.png",
    imageAlt: "User app screens",
  },
  {
    badge: "Business Owners",
    title: "Assign jobs, monitor performance, and streamline operations.",
    desc:
      "Gain full control of your workflow with real-time tracking, smart scheduling, and service management in one app.",
    bullets: [
      "Assign jobs to the right team member",
      "Monitor performance in real time",
      "Manage clients and services seamlessly",
    ],
    image: "/assets/build2.png",
    imageAlt: "Owner dashboard phone",
  },
  {
    badge: "Employees",
    title: "See tasks, track time, and navigate routes with ease.",
    desc:
      "Everything you need to manage your workday—from job assignments to routes and time logging.",
    bullets: [
      "Assign jobs to the right team member",
      "Monitor performance in real time",
      "Manage clients and services seamlessly",
    ],
    image: "/assets/build3.png",
    imageAlt: "Employee app phone",
  },
];

const bulletColors = ["#3BA334", "#62B55D", "#89C885"];

function Bullet({ children, color = "#3BA334" }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="self-stretch min-h-5 w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <span>{children}</span>
    </li>
  );
}

function RowDecor({ row }) {
  if (row === 1)
    return (
      <Image
        src={LINES.r1}
        alt=""
        width={215}
        height={120}
        className="hidden xl:block pointer-events-none absolute opacity-90"
        sizes="(max-width: 1536px) 520px, 640px"
        style={{ top: 90, right: "70%" }}
      />
    );
  if (row === 2)
    return (
      <Image
        src={LINES.r2}
        alt=""
        width={341}
        height={1253}
        className="hidden xl:block pointer-events-none absolute opacity-90"
        sizes="(max-width: 1920px) 600px, 760px"
        style={{ top: 120, left: "30%" }}
      />
    );
  return (
    <Image
      src={LINES.r3}
      alt=""
      width={308}
      height={732}
      className="hidden xl:block pointer-events-none absolute opacity-90"
      sizes="(max-width: 1920px) 560px, 720px"
      style={{ top: 80, right: -8 }}
    />
  );
}

export default function BuildForEveryone() {
  const reduce = useReducedMotion();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    show: reduce
      ? { opacity: 1 }
      : { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const textLeft = {
    hidden: { opacity: 0, x: -60 },
    show: reduce
      ? { opacity: 1, x: 0 }
      : { opacity: 1, x: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
  };

  const textRight = {
    hidden: { opacity: 0, x: 60 },
    show: reduce
      ? { opacity: 1, x: 0 }
      : { opacity: 1, x: 0, transition: { type: "spring", stiffness: 110, damping: 18 } },
  };

  const imagePop = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    show: reduce
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 16 } },
  };

  const floatAnim = reduce
    ? {}
    : {
        animate: {
          y: [0, -6, 0],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        },
      };

  return (
    <motion.section
      aria-labelledby="bfe-heading"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="relative"
      data-aos="fade-up"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -z-10 hidden xl:block"
      >
        <Image
          src={LINES.top}
          alt=""
          width={1400}
          height={600}
          className="absolute opacity-95"
          sizes="(max-width: 1280px) 1000px, 1400px"
          style={{ top: 45, width: "15%", right: "5%", left: "50%" }}
          priority
        />
        <RowDecor row={1} />
        <RowDecor row={2} />
        <RowDecor row={3} />
      </div>

      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[103rem] z-auto">
        
        <header className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <h2
            id="bfe-heading"
            className="font-bold text-3xl sm:text-4xl lg:text-[48px]"
          >
                  <span className="build-for-everyone-bg "></span>

            Build for Everyone
          </h2>
          <p className="mt-2 text-[13px] sm:text-sm md:text-base text-[#637381]">
            Whether you’re booking services, managing tasks, or tracking operations,
            we’ve designed the perfect experience for you.
          </p>
        </header>

        <div className="mt-10 sm:mt-12 md:mt-16 space-y-12 sm:space-y-14 md:space-y-16">
          {audiences.map((a, i) => {
            const swap = i % 2 === 1;

            return (
              <div
                key={a.badge}
                className="
                  relative grid items-center gap-8 sm:gap-10
                  md:grid-cols-2
                  xl:[grid-template-columns:minmax(0,56ch)_minmax(0,610px)]
                  xl:justify-between
                "
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <motion.div
                  variants={swap ? textRight : textLeft}
                  className={(swap ? "md:order-2 " : "") + "xl:max-w-[56ch]"}
                >
                  <button
                    type="button"
                    aria-label={a.badge}
                    className="inline-flex items-center rounded-[3.75rem] px-[1.25rem] py-1.5 text-[12px] sm:text-[13px] md:text-[14px] border bg-transparent text-[#3BA334] border-[#3BA334] font-semibold"
                  >
                    {a.badge}
                  </button>

                  <h3 className="mt-[14px] sm:mt-[16px] md:mt-[18px] font-bold text-xl sm:text-2xl md:text-3xl">
                    {a.title}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-[#637381] text-base sm:text[17px] md:text-[18px] leading-relaxed">
                    {a.desc}
                  </p>

                  <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 font-medium text-base sm:text-lg md:text-[18px]">
                    {a.bullets.map((b, idx) => (
                      <Bullet key={b} color={bulletColors[idx % bulletColors.length]}>
                        {b}
                      </Bullet>
                    ))}
                  </ul>
                </motion.div>

             <motion.div
  variants={imagePop}
  className={(swap ? "md:order-1 " : "") + "xl:w-[610px] xl:justify-self-end"}
  whileHover={
    reduce
      ? undefined
      : { scale: 1.02, rotate: 0.2, transition: { type: "spring", stiffness: 180, damping: 14 } }
  }
>
  <motion.div {...floatAnim} className="will-change-transform relative">
    <span className="build-for-everyone-bg-2 " />

    <Image
      src={a.image}
      alt={a.imageAlt}
      width={610}
      height={516}
      className="w-full h-auto bfe-phone-fade relative z-[1]"
      priority={i === 0}
      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 610px"
    />

    <Image
      src={a.image}
      alt=""
      aria-hidden="true"
      width={610}
      height={516}
      className="w-full h-auto bfe-phone-tail absolute left-1/2 -translate-x-1/2 bottom-0 z-0 pointer-events-none"
      priority={false}
      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 610px"
    />
  </motion.div>
</motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
