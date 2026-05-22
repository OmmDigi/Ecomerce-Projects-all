import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  title: string;
  rating: number;
  review: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const ClientTestimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      title: "Smart Home Assistant",
      rating: 5,
      review:
        '"This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions."',
      author: {
        name: "Brain Armstrong",
        role: "CEO Deplex Group",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    },
    {
      id: 2,
      title: "Best quality product",
      rating: 4,
      review:
        '"This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions."',
      author: {
        name: "Lisa Decamp",
        role: "Investor, Zemlex Co.",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    },
    {
      id: 3,
      title: "Amazing build quality",
      rating: 5,
      review:
        '"This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions."',
      author: {
        name: "Cameron Williamson",
        role: "Banker, Simtom Bank Co.",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
    },
  ];

  return (
    <section className="container mx-auto px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-open tracking-wider">
            Our Client's Happiness
          </h2>
          <p className="text-gray-600 text-base max-w-3xl mx-auto leading-relaxed font-inter">
            The Best electronics products continue to drive innovation and shape
            the way we live, work, and interact with our environment.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="flex flex-col bg-white p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            strokeWidth={0.75}
            key={index}
            size={18}
            className={`${
              index < testimonial.rating
                ? "fill-[#b4976c] text-[#b4976c]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4 font-open">
        {testimonial.title}
      </h3>

      {/* Review Text */}
      <p className="text-gray-600 leading-relaxed mb-8 flex-grow font-inter">
        {testimonial.review}
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4 mt-auto">
        <Image
          src={testimonial.author.avatar}
          alt={testimonial.author.name}
          className="w-12 h-12 rounded-full object-cover"
          height={1280}
          width={1280}
        />
        <div>
          <h4 className="font-semibold text-gray-900">
            {testimonial.author.name}
          </h4>
          <p className="text-sm text-gray-500">{testimonial.author.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
