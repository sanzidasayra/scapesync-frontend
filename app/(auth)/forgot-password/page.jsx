"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const SEND_OTP_URL = "https://apitest.softvencefsd.xyz/api/resend_otp";

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(SEND_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.status === false) {
        const firstErr =
          data?.message ||
          (data?.errors?.email && data.errors.email[0]) ||
          "Could not send OTP.";
        throw new Error(firstErr);
      }

      setInfo("OTP sent to your email.");
      if (typeof window !== "undefined") {
        localStorage.setItem("forgot_email", email);
      }
      router.push(`/reset-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-1 text-sm text-[#2F7A45] hover:opacity-90"
      >
        <FiChevronLeft className="h-5 w-5" />
        Back
      </button>

      <h1 className="text-2xl md:text-[28px] font-semibold text-[#111827]">
        Forgot your password?
      </h1>

      <p className="mt-2 text-sm text-[#6B7280]">
        Enter the email associated with your account. We’ll send a 6-digit code to reset your password.
      </p>

      {error && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {info && (
        <p className="mt-4 rounded-md border border-[#2F7A45]/20 bg-[#2F7A45]/5 px-3 py-2 text-sm text-[#2F7A45]">
          {info}
        </p>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-[#2F7A45] focus:border-transparent
                     placeholder:text-gray-400"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[#2F7A45] py-3 text-white font-semibold
                     shadow-[0_2px_0_rgba(0,0,0,0.1)] hover:bg-[#2a6c3e] disabled:opacity-70"
        >
          {submitting ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
