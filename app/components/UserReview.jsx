"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Farzana H.",
    title: "Owner, CleanPro Services",
    avatar: "/assets/user1.png",
    quote:
      "This app completely changed the way we manage our team. Assigning jobs takes minutes, and we never miss an update.",
  },
  {
    name: "Ahmed R.",
    title: "Technician",
    avatar: "/assets/user2.png",
    quote:
      "I love how easy it is to see my daily tasks and track my time. It makes my job stress-free.",
  },
  {
    name: "Rafiq M.",
    title: "Rafiq M., Homeowner",
    avatar: "/assets/user3.png",
    quote:
      "As a client, I love being able to see exactly when my service is on the way. No calls, no guessing — just clear updates.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 20 } },
};

const UserReview = () => {
  return (
    <div>
      <div>
        <h1 className="text-center font-bold text-5xl text-[#212B36] mb-2">
          What Our Users Are Saying
        </h1>
        <p className="text-center text-[#637381] text-[14px]">
          Real stories from clients, employees, and business owners who use our app every day.
        </p>
      </div>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {reviews.map((t, i) => (
          <motion.figure
            key={i}
            variants={item}
            whileHover={{ y: -3 }}
            className="relative overflow-hidden  rounded-[1.4rem] border border-white bg-white p-6 shadow-md"
          >
            <Image
              src="/assets/quote.png"
              alt="Decorative quote watermark"
              aria-hidden="true"
              width={64}
              height={52}
              className="pointer-events-none select-none absolute -left-2 top-10 h-[52px] w-[64px] opacity-60 "
            />

            <figcaption className="relative z-[1] flex items-center gap-3">
              <Image
                src={t.avatar}
                alt={`${t.name} avatar`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-500">{t.title}</div>
              </div>
            </figcaption>

            <blockquote className="relative z-[1] mt-4 text-[15px] leading-7 text-slate-700">
              <p>{t.quote}</p>
            </blockquote>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
};

export default UserReview;
