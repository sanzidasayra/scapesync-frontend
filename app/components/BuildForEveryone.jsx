"use client";
import Image from "next/image";
import React from "react";

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

const Bullet = ({ children, color = "#3BA334" }) => (
  <li className="flex items-start gap-3">
    <span
      className="self-stretch min-h-5 w-[3px] rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden
    />
    <span>{children}</span>
  </li>
);

const bulletColors = ["#3BA334", "#62B55D", "#89C885"];

const BuildForEveryone = () => {
  return (
    <section aria-labelledby="bfe-heading">
      <div className="px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="bfe-heading"
            className="font-bold text-3xl sm:text-4xl lg:text-[48px]"
          >
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
                className="grid items-center gap-8 sm:gap-10 md:grid-cols-2"
              >
                <div className={swap ? "md:order-2" : ""}>
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

                  <p className="mt-3 sm:mt-4 text-[#637381] text-base sm:text-[17px] md:text-[18px] leading-relaxed">
                    {a.desc}
                  </p>

                  <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 font-medium text-base sm:text-lg md:text-[18px]">
                    {a.bullets.map((b, idx) => (
                      <Bullet key={b} color={bulletColors[idx % bulletColors.length]}>
                        {b}
                      </Bullet>
                    ))}
                  </ul>
                </div>

                <div className={swap ? "md:order-1" : ""}>
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    width={610}
                    height={516}
                    className="w-full h-auto"
                    priority={i === 0}
                    sizes="(max-width: 640px) 92vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 610px"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BuildForEveryone;
