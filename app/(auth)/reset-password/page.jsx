"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Suspense } from "react";



export default function ResetPasswordPage() {
  const router = useRouter();
  const search = useSearchParams();

  const [token, setToken] = useState(search.get("token") || "");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const RESET_URL = "https://apitest.softvencefsd.xyz/api/reset-password";

  useEffect(() => {
    if (!token && typeof window !== "undefined") {
      const saved = localStorage.getItem("reset_token");
      if (saved) setToken(saved);
    }
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setDone(false);

    if (!token) {
      setError("Invalid or missing reset token. Please verify the code again.");
      return;
    }
    if (!password || !confirm) {
      setError("Please fill both password fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(RESET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          token,
          password,
          password_confirmation: confirm,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.status === false) {
        const msg =
          data?.message ||
          (data?.errors?.token && data.errors.token[0]) ||
          (data?.errors?.password && data.errors.password[0]) ||
          "Unable to reset password.";
        throw new Error(msg);
      }

      if (typeof window !== "undefined") localStorage.removeItem("reset_token");
      setDone(true);
      router.replace("/login?reset=1");
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
        <Suspense fallback={null}>

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
        Reset your password
      </h1>
      <p className="mt-2 text-sm text-[#6B7280]">Enter a new password for your account.</p>

      {!token && (
        <p className="mt-3 text-sm text-red-600">
          We couldn’t find your reset token. Please go back to the code verification step.
        </p>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-3 pr-10
                       focus:outline-none focus:ring-2 focus:ring-[#2F7A45] focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <IoEyeOff size={18} /> : <FaEye  size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-3 pr-10
                       focus:outline-none focus:ring-2 focus:ring-[#2F7A45] focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <IoEyeOff size={18} /> : <FaEye size={18} />}
          </button>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[#49AE44] py-3 text-white font-semibold
                     shadow-[0_2px_0_rgba(0,0,0,0.1)] disabled:opacity-70"
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {done && (
        <p className="mt-4 text-sm text-[#2F7A45]">
          Password reset successful. Redirecting to login…
        </p>
      )}
    </div>
    </Suspense>

  );
}
