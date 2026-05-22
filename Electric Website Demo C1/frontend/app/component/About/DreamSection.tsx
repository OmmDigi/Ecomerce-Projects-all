import Button from "../Button";
import Image from "next/image";

export default function DreamSection() {
  const features = [
    'Latest Technology',
    'Global Marketing',
    '3 Years Warranty',
    '24 hours Support',
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1761494296583-99b15e9063c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1NDUyNjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Electronics Store"
            className="w-full h-96 object-cover rounded-lg"
            height={1280}
            width={1280}
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-4xl mb-6 font-bold tracking-wide">
            Our Dream is to be a Global Electronic Brand
          </h2>
          <p className="text-gray-600 mb-6">
            At Clexry, we are committed to delivering high-quality electronics
            that cater to your needs. From state-of-the-art gadgets to essential
            household appliances, we strive to be a household name globally. Our
            products are crafted with precision and care to ensure the best
            customer experience.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Button varient="fill" className="bg-black! text-white!">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
