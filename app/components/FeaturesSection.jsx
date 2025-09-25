import Image from "next/image";
import React from "react";


const features = [
  {
    icon: "/assets/appointment-02.png",
    title: "Easy Service Booking",
    desc: "Streamlined booking process for clients with service catalogs and availability.",
    iconAlt: "Calendar",
  },
  {
    icon: "/assets/tracking.png",
    title: "Real-Time Tracking",
    desc: "Monitor job progress, employee hours, and project timelines with live updates.",
    iconAlt: "Real-time tracking",
  },
  {
    icon: "/assets/performance.png",
    title: "Performance Analytics",
    desc: "Comprehensive reporting and insights to improve business operations and efficiency.",
    iconAlt: "Analytics",
  },
  {
    icon: "/assets/secure.png",
    title: "Secure & Reliable",
    desc: "Enterprise-grade security with 99.9% uptime guarantee and data protection.",
    iconAlt: "Shield security",
  },
];

const FeaturesSection = () => {
  return (
    <section className="mb-[10.9rem]">
      <div>
        <div className="lg:flex lg:items-start lg:justify-between lg:divide-x lg:divide-[#F4F6F8]">
          {features.map((item, idx) => (
            <div key={idx} className="py-6 lg:px-8 max-w-sm">
              <div className="items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#ECFCEB] ring-1 ring-green-200/60">
                  <Image
                    src={item.icon}
                    alt={item.iconAlt ?? ""}
                    width={20}
                    height={20}
                    className="object-contain"
                    priority={idx === 0}
                  />
                </span>
                <div>
                  <h3 className="text-[#212B36] font-semibold mt-[1.2rem]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#637381]">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
