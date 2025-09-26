'use client';

import Image from "next/image";
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  {
    icon: "/assets/appointment-02.png",
    title: "Easy Service Booking",
    desc: "Streamlined booking process for clients with service catalogs and availability.",
    iconAlt: "Calendar",
  },
  {
    icon: "/assets/tracking.png",
    title: "Real-Time Tracking",
    desc: "Monitor job progress, employee hours, and project timelines with live updates.",
    iconAlt: "Real-time tracking",
  },
  {
    icon: "/assets/performance.png",
    title: "Performance Analytics",
    desc: "Comprehensive reporting and insights to improve business operations and efficiency.",
    iconAlt: "Analytics",
  },
  {
    icon: "/assets/secure.png",
    title: "Secure & Reliable",
    desc: "Enterprise-grade security with 99.9% uptime guarantee and data protection.",
    iconAlt: "Shield security",
  },
];

const FeaturesSection = () => {
  const reduce = useReducedMotion();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 650,
      easing: "ease-out-cubic",
      offset: 60,
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: reduce
      ? { opacity: 1 }
      : {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: reduce
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 120, damping: 18 },
        },
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className=" mb-[5rem] sm:mb-[8rem] md:mb-[10.9rem] lg:mb-[12.9rem]"
      data-aos="fade-up"
    >
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#F4F6F8]">
          {features.map((itemData, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="py-6 lg:px-8"
              data-aos="fade-up"
              data-aos-delay={idx * 80} 
            >
              <div className="items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#ECFCEB] ring-1 ring-green-200/60">
                  <Image
                    src={itemData.icon}
                    alt={itemData.iconAlt ?? ""}
                    width={20}
                    height={20}
                    className="object-contain"
                    priority={idx === 0}
                    sizes="40px"
                  />
                </span>
                <div>
                  <h3 className="text-[#212B36] font-semibold mt-[1.2rem]">
                    {itemData.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#637381]">{itemData.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;