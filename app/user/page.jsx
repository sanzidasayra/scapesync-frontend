"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDetailsPage() {
  const router = useRouter();
  const [role, setRole] = useState(""); 

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("user_role") : null;
    if (saved) setRole(saved);
  }, []);

  const choose = (val) => {
    setRole(val);
    if (typeof window !== "undefined") localStorage.setItem("user_role", val);

    router.push(val === "client" ? "/onboarding/client" : "/onboarding/owner");
  };

  return (
    <main className="min-h-[calc(100vh-100px)]"> 
      <div className="mx-auto max-w-4xl px-4 pb-24 text-center">
        <div className="mt-[9.3rem] mb-6 flex justify-center">
          <Image
            src="/Logo.png"
            alt="ScapeSync"
            width={117}
            height={48}
            priority
            className="h-auto w-[140px]"
          />
        </div>

        <h1 className="text-[32px] font-bold text-[#111827]">Who Are You?</h1>
        <p className="mt-2 font-semibold text-[16px] text-[#6B7280]">
          Choose the option that best describes you so we can tailor your experience.
        </p>

        <div className="mt-[7.5rem] grid gap-8 sm:grid-cols-2 place-items-center">
          <Link
            href="/login"
            className={`group w-full max-w-[380px] rounded-xl border bg-[#EDF7EC] p-6 text-left transition
                        hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7A45]
                        ${role === "client" ? "border-[#49AE44]" : "border-[#D1E7D7]"}`}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/assets/client.png"  
                alt="Client"
                width={120}
                height={120}
                className="h-[110px] w-[110px] object-contain"
              />
            </div>

            <h3 className="mt-4 text-center text-[22px] font-semibold text-[#2F7A45]">
              I’m a Client
            </h3>
            <p className="mt-1.5 font-medium text-center text-[14px] text-[#2F7A45]">
              Discover services & track projects effortlessly.
            </p>
          </Link>

          <Link
            href="/login"
            className={`group w-full max-w-[380px] rounded-xl border bg-[#F7FAFC] p-6 text-left transition
                        hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7A45]
                        ${role === "owner" ? "border-[#C9D7E5]" : "border-gray-300"}`}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/assets/owner.png" 
                alt="Business Owner"
                width={120}
                height={120}
                className="h-[110px] w-[110px] object-contain"
              />
            </div>

            <h3 className="mt-4 text-center text-[18px] font-semibold text-[#1F3B64]">
              I’m a Business Owner
            </h3>
            <p className="mt-2 text-center text-xs text-[#6B7280]">
              Manage jobs, staff & clients with ease.
            </p>
          </Link>
        </div>

      </div>
    </main>
  );
}
