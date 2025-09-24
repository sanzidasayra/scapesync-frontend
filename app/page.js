import Image from "next/image";
import FAQ from "./components/FAQ";
import UserReview from "./components/UserReview";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <div>
      <Banner />
      <UserReview />
      <FAQ />
    </div>
  );
}
