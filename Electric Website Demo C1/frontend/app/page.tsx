import React from "react";
import Banner from "./component/Banner";
import CategoryListing from "./component/CategoryListing";
import ClientTestimonials from "./component/ClientTestimonials";
import ProductListingPage from "./component/ProductListingPage";
import PromosonalSection from "./component/PromosonalSection";
import TagsSection from "./component/TagsSection";
import WhyChooseUs from "./component/WhyChooseUs";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="md:space-y-20 lg:space-y-20 space-y-10">
      <Banner />
      <React.Suspense
        fallback={
          <p className="text-center text-sm text-gray-500">
            Loading category...
          </p>
        }
      >
        <CategoryListing />
      </React.Suspense>
      <React.Suspense
        fallback={
          <p className="text-center text-sm text-gray-500">
            Loading products...
          </p>
        }
      >
        <ProductListingPage
          heading="Best Selling Products"
          subtext={
            <>
              Electronics products continue to drive innovation and shape the
              <br /> way we live, work, and interact with our environment.
            </>
          }
          viewMoreLink="/products"
          filter={{
            limit: "8",
          }}
        />
      </React.Suspense>

      <PromosonalSection />

      <React.Suspense
        fallback={
          <p className="text-center text-sm text-gray-500">
            Loading tags...
          </p>
        }
      >
        <TagsSection />
      </React.Suspense>

      <React.Suspense
        fallback={
          <p className="text-center text-sm text-gray-500">
            Loading products...
          </p>
        }
      >
        <ProductListingPage
          heading="Recommended Product For You"
          subtext={
            <>
              Electronics products continue to drive innovation and shape the
              <br /> way we live, work, and interact with our environment.
            </>
          }
          viewMoreLink="/products"
          filter={{
            limit: "4",
          }}
        />
      </React.Suspense>

      <WhyChooseUs />
      <ClientTestimonials />
    </main>
  );
}
