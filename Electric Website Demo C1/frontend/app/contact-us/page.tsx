import { Send } from "lucide-react";

export default function ContactUs() {
  return (
    <main className="*:font-open">
      <div className="w-full py-10 bg-gray-100">
        <div className="container mx-auto px-4 space-y-3.5 flex items-center justify-center flex-col">
          <h3 className="text-3xl font-bold font-open tracking-wide">
            Contact Us
          </h3>
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-[#666]">
            <span>Home</span>
            <span>/</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl mb-6 font-open font-bold">
                Let's Collaborate
              </h1>
              <p className="text-gray-600 leading-relaxed">
                The Best electronics products continue to drive innovation we
                live, work, and interact with our environment opportunities
                customers to test out products before making a purchase
                innovation, we live, work, and interact with our environment,
                opportunities
              </p>
            </div>

            <div>
              <h3 className="text-gray-600 mb-2 font-open font-bold">Phone:</h3>
              <p className="text-xl">+(2) 123 -456 -789</p>
            </div>

            <div>
              <h3 className="text-gray-600 mb-2 font-open font-bold">Email:</h3>
              <p className="text-xl">support@example.com</p>
            </div>

            <div>
              <h3 className="text-gray-600 mb-2 font-open font-bold">
                Head office:
              </h3>
              <p className="text-xl">
                70 Washington SquareNew York, NY 10012, USA
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-100 rounded-3xl p-8 lg:p-12">
            <h2 className="text-3xl mb-8">Say hello</h2>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2">
                  Phone number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                ></textarea>
                <div className="flex justify-end mt-2">
                  <Send className="w-5 h-5 text-teal-600" />
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Send Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
