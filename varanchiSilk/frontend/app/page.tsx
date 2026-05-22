import CasaProducts from "@/components/layout/casaProduct";
import CouponSection from "@/components/layout/CouponSection";
import Herosection from "@/components/layout/herosection";
import CasaPurposeGrid from "@/components/layout/purpose";
import CoverflowCarousel from "@/components/ui/carousal";
import InstagramGrid from "@/components/ui/insta-post";
import MarqueeBanner from "@/components/ui/marquee";
import ShopByRecipient from "@/components/ui/recepient";
import FeatureSection from "@/components/ui/ups";
import Image from "next/image";

import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { ColorPicker, Space } from "antd";
import Header from "@/components/layout/Header";
import ShopByFabric from "@/components/layout/ShopByFabric";
import TrustBadgeSection from "@/components/layout/TrustBadgeSection";
import FeaturedCollectionSection from "@/components/layout/FeaturedCollectionSection";
import ShopByCollections from "@/components/layout/ShopByCollections";
import Carousel3DCurved from "@/components/layout/Carousel3DCurved";
import FeaturedCollectionSection2 from "@/components/layout/FeaturedCollectionSection2";
export default function Home() {
  // console.log("opensdfsdfasd", colorText);
  return (
    <div className=" min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <p>Debojyoti</p> */}

      <Herosection />
      {/* <MarqueeBanner /> */}
      <ShopByFabric />
      <TrustBadgeSection />
      <FeaturedCollectionSection />
      <ShopByCollections />
      <FeaturedCollectionSection2 />
      {/* <CasaPurposeGrid /> */}
      {/* <CasaProducts /> */}
      {/* <ShopByRecipient /> */}
      {/* <CouponSection /> */}
      {/* <CoverflowCarousel /> */}
      {/* <FeatureSection /> */}
      <Carousel3DCurved />
      <InstagramGrid />
    </div>
  );
}
