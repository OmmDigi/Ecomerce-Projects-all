import { Clock, Truck, Mail } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Fast Shipping",
      description: "We ship all orders within 2-5 business days",
      color: "from-blue-500 to-blue-600",
      hoverColor: "group-hover:shadow-blue-500/20",
    },
    {
      icon: Truck,
      title: "Free shipping",
      description: "For all orders over $100.00",
      color: "from-green-500 to-green-600",
      hoverColor: "group-hover:shadow-green-500/20",
    },
    {
      icon: Mail,
      title: "Happy to help you",
      description: "Any question? We are happy to help you by E-Mail",
      color: "from-orange-500 to-orange-600",
      hoverColor: "group-hover:shadow-orange-500/20",
      link: "mailto:support@yoursite.com",
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const ContentWrapper = feature.link ? "a" : "div";
            const wrapperProps = feature.link
              ? { href: feature.link, className: "block" }
              : { className: "block" };

            return (
              <div
                key={index}
                className={` backdrop-blur-sm rounded-2xl p-6   transition-all duration-300  ${feature.hoverColor}`}
              >
                <ContentWrapper {...wrapperProps}>
                  <div className=" flex   flex-col  justify-center items-center  gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`bg-gradient-to-br ${feature.color} rounded-xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon
                          size={32}
                          className="text-white"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className=" flex   flex-col  justify-center items-center">
                      <h4 className="text-[#0a1e33] text-xl font-semibold mb-2 group-hover:text-gray-100 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ContentWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
