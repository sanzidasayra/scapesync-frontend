"use client";

import RegisterForm from "@/app/components/RegisterForm";



export default function RegisterPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        Create your Account
      </h2>
      <p className="text-sm text-gray-500 text-center mb-[4rem]">
        When sports Meets smart Tech.
      </p>
      <RegisterForm />
    </>
  );
}
