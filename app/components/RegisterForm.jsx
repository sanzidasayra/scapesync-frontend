"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "Password must contain letters and numbers"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms & Privacy Policy" }),
    }),
  })
  .refine((vals) => vals.password === vals.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

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
  const [fieldErrors, setFieldErrors] = useState({}); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    const parsed = RegisterSchema.safeParse(formData);

    if (!parsed.success) {
      
      const issues = parsed.error.issues || [];
      const firstMsg = issues[0]?.message || "Please fix the highlighted fields.";
      toast.error(firstMsg);
      const map = {};
      issues.forEach((i) => {
        const key = i.path?.[0];
        if (key && !map[key]) map[key] = i.message;
      });
      setFieldErrors(map);
      return;
    }

    setLoading(true);
    const tId = toast.loading("Creating account...");
    try {
      const res = await fetch("https://apitest.softvencefsd.xyz/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.status === false) {
        const serverMsg =
          data?.message ||
          (data?.errors?.email && data.errors.email[0]) ||
          "Registration failed. Try again.";
        throw new Error(serverMsg);
      }

      toast.success("Registered successfully. Verify your email.", { id: tId });
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Try again.", { id: tId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="relative w-1/2">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder=" "
              className={`peer w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600`}
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

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600`}
          />
          {fieldErrors.email ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          ) : null}
        </div>

        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded-md pr-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600`}
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? (
              <FiEyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {fieldErrors.password ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
          ) : null}
        </div>

        <div className="relative">
          <input
            type={showConfirmPwd ? "text" : "password"}
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            className={`w-full px-3 py-3 border rounded-md pr-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPwd((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            aria-label={showConfirmPwd ? "Hide password" : "Show password"}
          >
            {showConfirmPwd ? (
              <FiEyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {fieldErrors.password_confirmation ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.password_confirmation}</p>
          ) : null}
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
            <span className="text-gray-400 underline underline-offset-2 cursor-not-allowed pointer-events-none select-none">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-gray-400 underline underline-offset-2 cursor-not-allowed pointer-events-none select-none">
              Privacy Policy
            </span>
            .
          </span>
        </label>
        {fieldErrors.terms ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.terms}</p>
        ) : null}

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
          className="w-full rounded-md border border-gray-300 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2"
          onClick={() => toast("Google login not connected yet.")}
        >
          <FcGoogle className="h-5 w-5" />
          Log in with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#49AE44] hover:underline">
            Get started
          </a>
        </p>
      </form>
    </>
  );
}
