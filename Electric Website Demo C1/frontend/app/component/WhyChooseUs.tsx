import EarnPoint from "../svgs/EarnPoint";
import FlexiblePayment from "../svgs/FlexiblePayment";
import FreeShipping from "../svgs/FreeShipping";

const why_us_data = [
  {
    heading: "Free Shipping",
    subheading: "On all orders over $75.00",
    icon: <FreeShipping className="text-white" />,
  },
  {
    heading: "Flexible Payment",
    subheading: "30 days money back guarantee",
    icon: <FlexiblePayment className="text-white" />,
  },
  {
    heading: "Earn Point",
    subheading: "Team always ready for you",
    icon: <EarnPoint className="text-white" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#121212] w-full py-4">
      <ul className="w-full flex md:items-center lg:items-center justify-between flex-col md:flex-row lg:flex-row gap-y-6 h-full container mx-auto px-4">
        {why_us_data.map((item, index) => (
          <li key={index} className="flex items-center gap-2.5">
            <div className="p-3 border rounded-full border-white flex items-center justify-center">{item.icon}</div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-white font-open tracking-wider">
                {item.heading}
              </h3>
              <h4 className="text-gray-300 text-sm">
                {item.subheading}
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
