import Image from "next/image";
import FAQ from "./components/FAQ";
import UserReview from "./components/UserReview";

export default function Home() {
  return (
    <div>
      <UserReview />
      <FAQ />
    </div>
  );
}
