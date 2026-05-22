"use client";
import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { ArrowRight, Phone, HelpCircle, MapPin } from "lucide-react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const companyLinks = [
  { name: "Our Story", href: "/about" },
  { name: "Our Difference", href: "/our-difference" },
  { name: "Our Services", href: "/services" },
  { name: "Our Blog", href: "/our-blog" },
  { name: "Contact", href: "/contact" },
];

const resourceLinks = [
  { name: "Size Charts", href: "/size-charts" },
  { name: "Gift Cards", href: "/product/gift-card" },
  { name: "Look Books", href: "/look-books" },
  {
    name: "Customer Reviews",
    href: "https://www.trustpilot.com/review/babyepoch.com",
    external: true,
  },
];

const supportLinks = [
  { name: "Track Order", href: "/track-order" },
  { name: "Returns & Cancellations", href: "/returns-cancellations" },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com",
    color: "hover:bg-blue-600",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    color: "hover:bg-pink-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    color: "hover:bg-sky-500",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Newsletter subscription:", email);
      setIsSubmitted(true);
      setIsLoading(false);

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }, 1000);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return (
    <>
      <section className="relative bg-white pt-20 px-4 overflow-hidden">
        <img
          src="/footer/footer-envelop-mailbox.svg"
          alt="Lion illustration"
          className="absolute inset-0 px-3 md:px-10  object-cover z-0"
        />
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Mailbox Icon */}

          {/* Heading */}
          <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-center text-gray-900 mb-2">
            Newsletter
          </h3>

          {/* Description */}
          <p className="text-center text-gray-600 text-xs mb-2 max-w-2xl mx-auto">
            Subscribe to receive updates, access to exclusive deals, and more
          </p>

          {/* Subscription Form */}
          <div className="max-w-xl mx-auto">
            {!isSubmitted ? (
              <div className="bg-white  shadow-2xl p-1 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all text-gray-900 placeholder-gray-400"
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={isLoading}
                  className="bg-[#e3694b] text-white px-8 py-4  border-2 border-dotted font-semibold hover:bg-[#0a1e33] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Subscribe</span>
                      <span className="sm:hidden">Subscribe</span>
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CheckCircle
                  size={32}
                  className="text-green-500 animate-bounce"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-900">
                    Successfully Subscribed!
                  </p>
                  <p className="text-gray-600">
                    Thank you for joining our newsletter
                  </p>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <p className="text-center text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center gap-4">
            <div
              className="w-2 h-8 bg-orange-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-8 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-8 bg-orange-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div
              className="w-2 h-8 bg-orange-700 rounded-full animate-bounce"
              style={{ animationDelay: "800ms" }}
            ></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-0 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 pb-5">
            {/* FAQ Column */}
            <div className="  flex   flex-col  justify-center items-center transition-all duration-300  ">
              <div>
                <h3 className="text-[#0a1e33] text-xl font-semibold mb-1">
                  Got a question?
                </h3>
              </div>
              <div>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 text-[#0a1e33] font-medium  hover:scale-110 transition-transform duration-500 hover:text-[#e3694b]"
                >
                  <span>Read our FAQ</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Customer Support Column */}
            <div className=" flex   flex-col  justify-center items-center p-8 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg ">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-[#0a1e33] text-xl font-semibold mb-1">
                    Customer support
                  </h3>
                </div>
              </div>

              <a
                href="tel:7086385584"
                className="inline-flex items-center gap-3 text-[#0a1e33] text-2xl font-bold    hover:scale-110 transition-transform duration-500 hover:text-[#e3694b]"
              >
                (708) 638-5584
              </a>
            </div>

            {/* Find Retailer Column */}
            <div className="   flex   flex-col  justify-center items-center p-8  transition-all duration-300  ">
              <div className="flex items-center gap-4 ">
                <div>
                  <h3 className="text-[#0a1e33] text-xl font-semibold mb-1">
                    Looking for our products?
                  </h3>
                </div>
              </div>

              <a
                href="/retail-store"
                className="inline-flex items-center gap-2 text-[#0a1e33] font-bold  hover:scale-110 transition-transform duration-500 hover:text-[#e3694b]"
              >
                <span>Find a retailer</span>
                <ArrowRight
                  size={25}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white text-gray-300">
        {/* Divider */}
        <div className="border-t border-gray-300"></div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Social & Legal */}
            <div className="space-y-6">
              {/* Social Icons */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-gray-700 hover:scale-110 transition-all duration-300 rounded-full p-3 ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon size={20} className="text-white" />
                    </a>
                  );
                })}
              </div>

              {/* Legal Links */}
              <nav className="space-y-2">
                <a
                  href="/terms-conditions"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
                <a
                  href="/privacy-policy"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </nav>

              {/* Copyright */}
              <div className="text-sm text-gray-500 space-y-1">
                <p>Copyright © 2025</p>
                <p>
                  <a
                    href="https://vamtam.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    VamTam. All rights reserved.
                  </a>
                </p>
              </div>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
              <nav className="space-y-3">
                {companyLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">
                Resources
              </h3>
              <nav className="space-y-3">
                {resourceLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    {...(link.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 4: Support */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
              <nav className="space-y-3">
                {supportLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
