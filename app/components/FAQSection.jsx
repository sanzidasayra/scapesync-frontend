"use client";
import { useEffect, useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FAQSection() {
  const items = [
    {
      q: "Is the app free to use?",
      a: "Yes! We offer a free plan for individuals and small teams. Paid plans unlock more features for scaling businesses.",
    },
    {
      q: "Can I assign multiple employees to one job?",
      a: "Yes, you can assign multiple employees to a single job within the app.",
    },
    {
      q: "Does it work on both mobile and desktop?",
      a: "Yes, our app is designed to work seamlessly on both mobile and desktop devices.",
    },
    {
      q: "Can I create recurring jobs or schedules?",
      a: "Absolutely. Set jobs to repeat daily, weekly, or on custom intervals with automatic reminders.",
    },
  ];

  const [openIdx, setOpenIdx] = useState(null); 

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 650,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
    >
      <div className="mb-8 sm:mb-10 md:mb-12 relative" data-aos="fade-up">
        <h1
          id="faq-heading"
          className="text-center font-bold text-[#212B36] text-3xl sm:text-4xl md:text-5xl"
        >
          <span className="faq-bg "></span>
          <span className="faq-bg-2  "></span>
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-center text-[#637381] text-sm sm:text-base">
          Quick answers to help you get the most out of our app.
        </p>
      </div>

      <dl className="space-y-3 sm:space-y-4" data-aos="fade-up" data-aos-delay="80">
        {items.map((it, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="rounded-2xl border border-[#C7E6C5] bg-white dark:bg-[#0f172a] dark:border-white/10 p-4 sm:p-5"
              data-aos="fade-up"
              data-aos-delay={120 + i * 100}
            >
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="group grid w-full grid-cols-[1fr_auto] items-start gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0f172a]"
                >
                  <span className="text-[16px] sm:text-base font-semibold text-[#212B36] dark:text-white">
                    {it.q}
                  </span>

                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition group-hover:text-[#0F3B34] dark:group-hover:text-emerald-300"
                    aria-hidden="true"
                  >
                    {isOpen ? <HiMinus className="h-5 w-5" /> : <HiPlus className="h-5 w-5" />}
                  </span>
                </button>
              </dt>

              <dd
                id={`faq-panel-${i}`}
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="text-sm sm:text-[15px] leading-6 text-[#637381] dark:text-gray-300 pl-6 sm:pl-7">
                    {it.a}
                  </p>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
