import UserReview from "./components/UserReview";
import Banner from "./components/Banner";
import FeaturesSection from "./components/FeaturesSection";
import BuildForEveryone from "./components/BuildForEveryone";
import FAQSection from "./components/FAQSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturesSection />
      <BuildForEveryone />
      <UserReview />
      <FAQSection />
    </div>
  );
}
