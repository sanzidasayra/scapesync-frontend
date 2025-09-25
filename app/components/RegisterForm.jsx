"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";   
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterForm() {
  const router = useRouter();                   
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!formData.email || !formData.password || formData.password !== formData.password_confirmation) {
      setErrMsg("Please fill all fields and make sure passwords match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://apitest.softvencefsd.xyz/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed. Try again.");
      }

      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      setErrMsg(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <div className="relative w-1/2">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <label className="pointer-events-none absolute left-2 -top-2 bg-white px-1 text-xs text-gray-400">
            First Name
          </label>
        </div>

        <div className="w-1/2">
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last name"
            className="w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
      />

      <div className="relative">
        <input
          type={showPwd ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-3 border rounded-md pr-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
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

      <div className="relative">
        <input
          type={showConfirmPwd ? "text" : "password"}
          name="password_confirmation"
          placeholder="Confirm Password"
          value={formData.password_confirmation}
          onChange={handleChange}
          className="w-full px-3 py-3 border rounded-md pr-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPwd((s) => !s)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          aria-label={showConfirmPwd ? "Hide password" : "Show password"}
        >
          {showConfirmPwd ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      <label className="flex items-center text-sm text-gray-700 gap-2">
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 accent-green-600"
        />
        <span>
          I agree to Tech Takes{" "}
          <Link href="/terms" className="underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#49AE44] text-white font-semibold py-3 rounded-[8px] shadow-sm transition disabled:opacity-70"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <div className="flex items-center gap-2 my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="text-sm text-gray-500">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition text-gray-700 font-semibold"
      >
        <FcGoogle className="h-5 w-5" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-[#49AE44] hover:underline">
          Get started
        </Link>
      </p>
    </form>
  );
}
