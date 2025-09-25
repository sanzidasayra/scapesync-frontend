"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

const VERIFY_URL = "https://apitest.softvencefsd.xyz/api/forgot-verify-otp";
const RESEND_URL = "https://apitest.softvencefsd.xyz/api/resend_otp";

export default function ResetOtpVerifyPage() {
  const router = useRouter();
  const search = useSearchParams();

  const emailFromQuery = search.get("email") || "";
  const [email, setEmail] = useState(emailFromQuery);

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);
  inputsRef.current = Array.from({ length: 6 }, (_, i) => inputsRef.current[i] || null);
  const code = useMemo(() => digits.join(""), [digits]);

  useEffect(() => {
    if (!emailFromQuery && typeof window !== "undefined") {
      const saved = localStorage.getItem("forgot_email");
      if (saved) setEmail(saved);
    }
    inputsRef.current[0]?.focus();
  }, [emailFromQuery]);

  const onChangeDigit = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        const next = [...digits]; next[i] = ""; setDigits(next);
      } else if (i > 0) {
        inputsRef.current[i - 1]?.focus();
        const next = [...digits]; next[i - 1] = ""; setDigits(next);
      }
    }
    if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const onPaste = (e) => {
    const text = (e.clipboardData?.getData("text") || "").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.split(""); while (next.length < 6) next.push("");
    setDigits(next);
    inputsRef.current[Math.min(text.length, 5)]?.focus();
  };

const verify = async () => {
  setError("");
  if (!email) return setError("Please enter your email first.");
  if (code.length !== 6) return setError("Please enter the 6-digit code.");

  setLoading(true);
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, otp: code }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || data?.status === false) {
      const msg = data?.message || (data?.errors?.otp && data.errors.otp[0]) || "Verification failed";
      throw new Error(msg);
    }

    const token = data?.data?.token;
    if (!token) throw new Error("Reset token not found in response.");

    if (typeof window !== "undefined") {
      localStorage.setItem("forgot_email", email);
      localStorage.setItem("reset_token", token);
    }

    const url = `/reset-password?token=${encodeURIComponent(token)}${
      email ? `&email=${encodeURIComponent(email)}` : ""
    }`;
    router.replace(url);
  } catch (err) {
    setError(err.message || "Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};


  const resend = async () => {
    setError("");
    if (!email) return setError("Please enter your email first.");
    setResending(true);
    try {
      const res = await fetch(RESEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.status === false) {
        throw new Error(data?.message || "Unable to resend code");
      }
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
        We&apos;ve emailed a 6-digit confirmation code to{" "}
        <span className="font-medium text-[#111827]">{email || "your inbox"}</span>, please
        enter the code in below box to verify your email.
      </p>

      {!email && (
        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F7A45]"
          />
          <p className="mt-1 text-xs text-gray-500">
            We couldn&apos;t read your email from the link—please enter it to continue.
          </p>
        </div>
      )}

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

      {error && <div className="mt-3 text-sm text-red-600 text-center">{error}</div>}

      <button
        type="button"
        onClick={verify}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-[#49AE44] py-3 text-white font-bold text-[16px] shadow-sm disabled:opacity-70"
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
