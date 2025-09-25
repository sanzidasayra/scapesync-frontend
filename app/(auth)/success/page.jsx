import Image from "next/image";
import Link from "next/link";

export default function AccountCreatedPage() {
  return (
    <div className="w-full text-center">
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

      <h1 className="mt-6 text-2xl md:text-[28px] font-semibold text-[#111827]">
        Account Created Successfully!
      </h1>

      <p className="mt-2 text-sm text-[#6B7280]">
        Your account is set up! Just verify your email to get started.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block w-full rounded-lg bg-[#2F7A45] py-3 text-white font-semibold
                   shadow-[0_2px_0_rgba(0,0,0,0.1)] hover:bg-[#2a6c3e] transition"
      >
        Go To Home
      </Link>
    </div>
  );
}
