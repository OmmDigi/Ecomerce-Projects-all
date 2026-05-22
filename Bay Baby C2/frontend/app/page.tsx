import BestSellersHeader from "@/components/ui/bestsellers";
import CategorySection from "@/components/ui/categorysection";
import BabyCollections from "@/components/ui/collections";
import CommunityBlogSection from "@/components/ui/communityBlogSection";
import FeaturesSection from "@/components/ui/featuresSection";
import HeroSection from "@/components/ui/herosection";
import OrganicMatters from "@/components/ui/organic-matters";
import WhyUs from "@/components/ui/whyus";
import ShippingFeatures from "@/components/ui/whyus";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <BabyCollections />
      <BestSellersHeader />
      <FeaturesSection />
      <CommunityBlogSection />
      <OrganicMatters />

      <WhyUs />
    </>
  );
}
