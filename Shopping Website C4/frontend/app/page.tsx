import Image from "next/image";
import HeroSlideshow from "./Component/heroSection";
import Segment from "./Component/segment";
import NewDesign from "./Component/newDesign";
import BodyBanner from "./Component/bodyBanner";
import Trending from "./Component/trending/Trending";
import CustomerReview from "./Component/customerReview";

export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <Segment />
      <NewDesign />
      <Trending />
      <BodyBanner />
      <CustomerReview />
    </>
  );
}
