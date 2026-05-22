import { Clock, Truck, DollarSign } from 'lucide-react';

export default function ServiceCards() {
  const services = [
    {
      icon: Clock,
      title: '24/7 SERVICE',
      description: 'We provide our best services',
    },
    {
      icon: Truck,
      title: 'FAST SHIPPING',
      description: 'We provide our best services',
    },
    {
      icon: DollarSign,
      title: 'MONEY BACK',
      description: '30 day money back services',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-gray-300 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black">
                <service.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-semibold">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
