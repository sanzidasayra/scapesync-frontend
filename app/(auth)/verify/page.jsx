"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function VerifyEmailPage() {
  const router = useRouter();
  const search = useSearchParams();
  const email = search.get("email") || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);
  inputsRef.current = Array.from({ length: 6 }, (_, i) => inputsRef.current[i] || null);

  const code = useMemo(() => digits.join(""), [digits]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const onChangeDigit = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const onKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        setDigits(next);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        const next = [...digits];
        next[idx - 1] = "";
        setDigits(next);
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const onPaste = (e) => {
    const text = (e.clipboardData?.getData("text") || "").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.split("");
    while (next.length < 6) next.push("");
    setDigits(next);
    const focusIdx = Math.min(text.length, 5);
    inputsRef.current[focusIdx]?.focus();
  };

  const verify = async () => {
    setError("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://apitest.softvencefsd.xyz/api/verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.status === false) {
        throw new Error(data?.message || "Verification failed");
      }

      setDigits(["", "", "", "", "", ""]);

      router.replace(`/login?verified=1&email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!email) return;
    setResending(true);
    setError("");
    try {
      const res = await fetch("https://apitest.softvencefsd.xyz/api/resend_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Unable to resend code");
    } catch (err) {
      setError(err.message || "Unable to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full mt-[-100px]">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-1 text-sm text-[#2F7A45] hover:opacity-90"
      >
        <FiChevronLeft className="h-5 w-5" />
        Back
      </button>

      <h1 className="text-2xl md:text-[28px] font-semibold text-[#111827]">
        Please check your email!
      </h1>

      <p className="mt-2 text-sm text-[#6B7280] max-w-md mx-auto">
        We’ve emailed a 6-digit confirmation code to{" "}
        <span className="font-medium text-[#111827]">{email || "your inbox"}</span>,
        please enter the code in the boxes below to verify your email.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={d}
            onChange={(e) => onChangeDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            className="h-12 w-12 rounded-md border border-gray-300 text-center text-lg
                       focus:outline-none focus:ring-2 focus:ring-[#2F7A45] focus:border-transparent"
          />
        ))}
      </div>

      {error ? (
        <div className="mt-3 text-sm text-red-600 text-center">{error}</div>
      ) : null}

      <button
        type="button"
        onClick={verify}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-[#49AE44] py-3 text-white font-semibold
                   shadow-sm disabled:opacity-70"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      <p className="mt-4 text-center text-sm text-[#6B7280]">
        Don’t have a code?{" "}
        <button
          type="button"
          onClick={resend}
          disabled={resending}
          className="text-[#2F7A45] font-medium hover:underline disabled:opacity-70"
        >
          {resending ? "Resending..." : "Resend code"}
        </button>
      </p>
    </div>
  );
}
