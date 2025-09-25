"use client";
import { useState } from "react";

export default function FAQ() {
  const items = [
    { q: "Is the app free to use?",
      a: 'Yes! We offer a free plan for individuals and small teams. Paid plans unlock more features for scaling businesses.' },
    { q: "Can I assign multiple employees to one job?",   a: 'Yes, you can assign multiple employees to a single job within the app.' },
    { q: "Does it work on both mobile and desktop?",
      a: 'Yes, our app is designed to work seamlessly on both mobile and desktop devices.' },
  ];

  const [openIdx, setOpenIdx] = useState(null);

  return (
    <>
    <div className="mt-[10.63rem]">
        <h1 className="text-center text-5xl font-bold text-[#212B36]">Frequently Asked Questions</h1>
        <p className="mt-2 text-center text-[#637381] text-[14px]">Quick answers to help you get the most out of our app.</p>
    </div>
    <div className="mx-auto max-w-7xl px-6 py-10 mb-[10rem]">
      <ul className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="rounded-2xl border border-[#C7E6C5] bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <p className="text-base font-semibold text-[#212B36] text-[16px]">{it.q}</p>

              <button
                type="button"
                aria-expanded={openIdx === i}
                aria-controls={`ans-${i}`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="inline-flex h-8 w-8 items-center justify-center text-gray-400"
              >
                {openIdx === i ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>

            <div id={`ans-${i}`} className={openIdx === i ? "mt-3 text-sm leading-6 text-[#637381] ml-[24px]" : "hidden"}>
              {it.a}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
