import Image from "next/image";
import Button from "./Button";

const features = [
  { id: 1, label: "Auto Mode" },
  { id: 2, label: "Super Slim Design" },
  { id: 3, label: "Edge Clean" },
  { id: 4, label: "BoostIQ Technology" },
  { id: 5, label: "Spot Clean" },
  { id: 6, label: "Dual Multi-surface Rubber" },
  { id: 7, label: "Quick Clean" },
  { id: 8, label: "Smart Mapping" },
];

export default function PromosonalSection() {
  return (
    <section className="overflow-hidden flex items-center justify-end relative min-h-200 md:min-h-auto lg:min-h-auto">
      <Image
        src="/promosonal-section.webp"
        alt="Promosonal Section"
        height={755}
        width={1920}
        className="size-full min-h-200 object-cover md:min-h-auto lg:min-h-auto"
      />

      <div className="absolute w-full inset-0 md:w-auto lg:w-auto md:inset-auto lg:inset-auto p-10 right-16 bg-[#ffffff34] backdrop-blur-sm rounded-2xl space-y-4">
        <span className="tracking-wider font-inter text-sm inline-block">
          NEW ARRIVAL!
        </span>

        <h2 className="font-bold font-open text-3xl">Robotic Vacuum Cleaner</h2>

        <p className="tracking-wider text-sm font-inter">
          Smartwatches provide quick access to notifications, calls, messages,
          and
        </p>
        <p className="tracking-wider text-sm font-inter">
          apps right on your wrist, reducing the constantly check your phone.
        </p>

        <ul className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <Image src="/done-icon.svg" alt="" height={16} width={16} />
              <h4 className="font-bold font-open">{item.label}</h4>
            </li>
          ))}
        </ul>

        <Button className="font-500! bg-black! text-white! text-sm tracking-widest">Learn More</Button>
      </div>
    </section>
  );
}
