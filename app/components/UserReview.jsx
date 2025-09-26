"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

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
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const UserReview = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic", offset: 80 });
  }, []);

  return (
    <section className="relative">
        <span className="user-review-bg hidden lg:block"></span>

      <div className="px-4 sm:px-6 lg:px-8 mt-20 sm:mt-24 md:mt-32" data-aos="fade-up">
        <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl text-[#212B36] mb-2">
          What Our Users Are Saying
        </h1>
        <p className="text-center text-sm text-[#637381] text-[14px]">
          Real stories from clients, employees, and business owners who use our app every day.
        </p>
      </div>

      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {reviews.map((t, i) => (
          <motion.figure
            key={i}
            variants={item}
            whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 18 } }}
            className="relative overflow-hidden rounded-[1.4rem] border border-white bg-white p-6 shadow-md"
            data-aos="zoom-in-up"
            data-aos-delay={120 + i * 120}
          >
       
        

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
                  <Image
              src="/assets/quote-mark.png"
              alt=""
              aria-hidden="true"
              width={64}
              height={52}
              className="card-quote-mark absolute z-1 -top-4"
              priority={i === 0}
            />
              <p className="relative z-20 max-w-sm">{t.quote}</p>
            </blockquote>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
};

export default UserReview;
