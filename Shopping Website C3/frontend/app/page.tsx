import React from "react";
import SplitVerticalHero from "./components/Banner";
import CategorySection from "./components/CategorySection";
import ClientReview from "./components/ClientReview";
import PromoSection from "./components/PromoSection";
import VideoPromoSection from "./components/VideoPromoSection";

interface IProps {
  searchParams: Promise<any>;
}

export const dynamic = "force-dynamic";

export default function Home({ searchParams }: IProps) {
  return (
    <main>
      <span id="top-span-tag"></span>
      <SplitVerticalHero />
      <React.Suspense
        fallback={
          <p className="text-center text-sm text-gray-500">
            Loading categories...
          </p>
        }
      >
        <CategorySection categoryIndex={0} searchParams={searchParams} />
      </React.Suspense>
      <VideoPromoSection />
      <React.Suspense
        fallback={
          <p className="text-center text-sm text-gray-500">
            Loading categories...
          </p>
        }
      >
        <CategorySection categoryIndex={1} searchParams={searchParams} />
      </React.Suspense>
      <ClientReview />
      <PromoSection />
    </main>
  );
}
