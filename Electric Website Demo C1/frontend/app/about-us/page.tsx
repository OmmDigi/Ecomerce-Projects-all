import DreamSection from "../component/About/DreamSection";
import ServiceCards from "../component/About/ServiceCards";
import StorySection from "../component/About/StorySection";
import TeamSection from "../component/About/TeamSection";
import ClientTestimonials from "../component/ClientTestimonials";

export default function page() {
  return (
    <main className="*:font-open">
      <div className="w-full py-10 bg-gray-100">
        <div className="container mx-auto px-4 space-y-3.5 flex items-center justify-center flex-col">
          <h3 className="text-3xl font-bold font-open tracking-wide">
            About Us
          </h3>
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-[#666]">
            <span>Home</span>
            <span>/</span>
            <span>About</span>
          </div>
        </div>
      </div>

      <DreamSection />
      <ServiceCards />
      <StorySection />
      <TeamSection />
      <ClientTestimonials />
    </main>
  );
}
