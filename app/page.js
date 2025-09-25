import FAQ from "./components/FAQ";
import UserReview from "./components/UserReview";
import Banner from "./components/Banner";
import FeaturesSection from "./components/FeaturesSection";
import BuildForEveryone from "./components/BuildForEveryone";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturesSection />
      <BuildForEveryone />
      <UserReview />
      <FAQ />
    </div>
  );
}
