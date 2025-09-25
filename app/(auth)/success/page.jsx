import Image from "next/image";
import Link from "next/link";

export default function AccountCreatedPage() {
  return (
    <div className="w-full text-center mt-[-150px]">
      <div className="flex justify-center">
        <Image
          src="/assets/Group.png"
          alt="Account created successfully"
          width={280}
          height={220}
          priority
          className="h-auto w-auto"
        />
      </div>

      <h1 className="mt-[35px] text-2xl md:text-[32px] font-bold text-[#111827]">
        Account Created Successfully!
      </h1>

      <p className="mt-4 text-[16px] text-[#6B7280]">
Your account is set up! Just verify your email to get started.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block w-full rounded-lg bg-[#49AE44] py-3 text-white font-bold text-[16px]
                   shadow-[0_2px_0_rgba(0,0,0,0.1)] transition"
      >
        Go To Home
      </Link>
    </div>
  );
}
