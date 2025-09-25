"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";


const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "Password must contain letters and numbers"),
  remember_me: z.boolean().optional(),
});

export default function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember_me: true,
  });

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const verified = search.get("verified");
    const reset = search.get("reset");
    const email = search.get("email");

    if (email) setForm((p) => ({ ...p, email }));

    if (verified === "1") {
      toast.success("Email verified successfully — please log in.");
    }
    if (reset === "1") {
      toast.success("Password reset successful — please log in.");
    }
  }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const parsed = LoginSchema.safeParse(form);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues?.[0];
      const msg = firstIssue?.message || "Please fix the highlighted fields.";
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://apitest.softvencefsd.xyz/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.status === false) {
        const serverMsg =
          data?.message ||
          (data?.errors?.email && data.errors.email[0]) ||
          (data?.errors?.password && data.errors.password[0]) ||
          "Invalid email or password.";
        throw new Error(serverMsg);
      }

      if (data?.token) localStorage.setItem("auth_token", data.token);
      if (data?.token_type) localStorage.setItem("token_type", data.token_type);

      toast.success("Logged in successfully.");
      router.replace("/");
    } catch (err) {
      const msg = err.message || "Login failed. Try again.";
      setErrMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Toaster position="top-right" />

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="relative">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="eddie_lake@gmail.com"
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2F7A45]"
          />
          <span className="pointer-events-none absolute -top-2 left-3 bg-white px-1 text-xs text-gray-400">
            Email address
          </span>
        </div>

        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            placeholder="Password"
            className="w-full rounded-md border border-gray-300 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2F7A45]"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.remember_me}
              onChange={(e) =>
                setForm((p) => ({ ...p, remember_me: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-[#2F7A45] focus:ring-[#2F7A45] accent-[#2F7A45]"
            />
            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#2F7A45] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {errMsg ? (
          <p className="text-sm text-red-600">{errMsg}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-lg bg-[#2F7A45] py-3 text-white font-semibold shadow-[0_3px_0_rgba(0,0,0,0.08)] hover:bg-[#2a6c3e] disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="my-5 flex items-center gap-2">
          <div className="flex-grow border-t border-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        <button
          type="button"
          className="w-full rounded-md border border-gray-300 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2"
          onClick={() => toast("Google login not connected yet.", { icon: "⚙️" })}
        >
          <FcGoogle className="h-5 w-5" />
          Log in with Google
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-[#2F7A45] font-medium hover:underline">
            Get started
          </Link>
        </p>
      </form>
    </div>
  );
}
