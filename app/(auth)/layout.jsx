import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6">
          <Image
          src="/Logo.png"
          alt="Logo"
          width={137}
          height={56}
          priority
        />
      </div>

      <div className="flex-grow flex items-center justify-center px-4">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
