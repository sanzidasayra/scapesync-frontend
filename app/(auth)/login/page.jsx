"use client";

import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
        Welcome to ScapeSync
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Please share your login details so you can access the website.
      </p>
      <LoginForm />
    </>
  );
}
