import FAQ from "./components/FAQ";
import UserReview from "./components/UserReview";
import Banner from "./components/Banner";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturesSection />
      <UserReview />
      <FAQ />
    </div>
  );
}
