import Image from "next/image";
import HeroSlideshow from "./Component/heroSection";
import Segment from "./Component/segment";
import NewDesign from "./Component/newDesign";
import BodyBanner from "./Component/bodyBanner";
import Trending from "./Component/trending/Trending";
import CustomerReview from "./Component/customerReview";
import HeroSection from "@/Component1/HeroSection";
import ShopSection from "@/Component1/ShopSection";
import VideoSection from "@/Component1/VideoSection";
import BestSellersSection from "@/Component1/BestSellersSection";
import CollectionsSection from "@/Component1/CollectionsSection";
import StylesAndWear from "@/Component1/StylesAndWear";
import BlogSection from "@/Component1/BlogSection";
import CategoryShowcaseSection from "@/Component1/CategoryShowcaseSection";
import FeaturedProductsSection from "@/Component1/FeaturedProductsSection";
import PromotionSection from "@/Component1/PromotionSection";
import WhyShopSection from "@/Component1/WhyShopSection";
import TimeForYourselfSection from "@/Component1/TimeForYourselfSection";
import InstagramSection from "@/Component1/InstagramSection";
import FooterSection from "@/Component1/layout/FooterSection";

export default function Home() {
  return (
    // <>
    //   <HeroSlideshow />
    //   <Segment />
    //   <NewDesign />
    //   <Trending />
    //   <BodyBanner />
    //   <CustomerReview />
    // </>
    <>
      <HeroSection />
      <CategoryShowcaseSection />
      <FeaturedProductsSection />
      <PromotionSection />
      {/* <ShopSection /> */}
      <VideoSection />
      <WhyShopSection />
      <TimeForYourselfSection />
      <InstagramSection />
      {/* <BestSellersSection /> */}
      {/* <CollectionsSection /> */}
      {/* <StylesAndWear /> */}
      {/* <BlogSection /> */}
    </>
  );
}
