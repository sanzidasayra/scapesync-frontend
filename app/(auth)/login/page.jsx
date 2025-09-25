"use client";

import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 mt-[-50px]">
        Welcome to ScapeSync
      </h2>
      <p className="text-[16px] text-gray-400 text-center mb-[3rem]">
        Please share your login details so you can access the website.
      </p>
      <LoginForm />
    </>
  );
}
