import Hero from "../components/Hero";
import CategoryBanners from "../components/CategoryBanners";
import TrendingProducts from "../components/TrendingProducts";
import HandpickCollection from "../components/HandpickCollection";
import BrandLogos from "../components/BrandLogos";
import BlogSection from "../components/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CategoryBanners />
      <TrendingProducts />
      <HandpickCollection />
      <BrandLogos />
      <BlogSection />
    </main>
  );
}
