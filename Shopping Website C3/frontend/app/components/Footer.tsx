import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    name: "Customer Service",
    link: "#",
  },
  {
    name: "Shipping and Delivery",
    link: "#",
  },
  {
    name: "Returns",
    link: "#",
  },
  {
    name: "Size Charts",
    link: "#",
  },
  {
    name: "Email Signup",
    link: "#",
  },
  {
    name: "Contact Us",
    link: "#",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f3ee] px-6 py-12 *:font-spartan">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About The Store */}
          <div>
            <h3 className="text-xl font-bold mb-6">About The Store</h3>
            <p className="text-gray-700 mb-4 leading-relaxed font-light">
              We are design and product obsessed. Uncompromising in the style,
              quality and performance of every product we create.
            </p>
            <p className="text-gray-700 leading-relaxed font-light">
              This is a demonstration of the Symmetry theme for Shopify.
              Essentials, Outerwear & Activewear kindly donated by Varley
            </p>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-bold mb-6">Customer Support</h3>
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-gray-700 hover:text-black transition-colors font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-700 mb-6 leading-relaxed font-light">
              Get 15% off your first purchase! Plus, be the first to know about
              sales, new product launches and exclusive offers!
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border-b-2 border-black py-2 pr-10 focus:outline-none placeholder-gray-500"
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2"
                aria-label="Subscribe"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.92-.19-2.33 0-3.33l1.36-5.77s-.35-.7-.35-1.73c0-1.62.94-2.83 2.1-2.83 1 0 1.47.74 1.47 1.64 0 1-.64 2.5-.97 3.88-.28 1.17.59 2.13 1.74 2.13 2.09 0 3.7-2.2 3.7-5.38 0-2.81-2.02-4.78-4.9-4.78-3.34 0-5.3 2.5-5.3 5.08 0 1.01.39 2.09.87 2.68.1.11.11.21.08.33l-.32 1.34c-.05.2-.17.25-.39.15-1.46-.68-2.37-2.81-2.37-4.52 0-3.7 2.68-7.09 7.74-7.09 4.06 0 7.21 2.89 7.21 6.75 0 4.03-2.54 7.27-6.07 7.27-1.19 0-2.3-.62-2.68-1.35l-.73 2.78c-.26 1.02-1 2.3-1.48 3.08A12 12 0 1 0 12 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Vimeo"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Cookie Preferences
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Terms of Use
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
              >
                About Us
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
              >
                UK Careers
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="#"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Contact Us
              </a>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2">
              <select className="bg-transparent border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:border-black">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          {/* Copyright and Payment Icons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
            <p className="text-sm text-gray-600">
              Copyright © 2021 Vinovathemes. All rights reserved.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-600 border border-gray-200">
                AMEX
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center border border-gray-200">
                <div className="flex gap-0.5">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-900 border border-gray-200">
                VISA
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center text-xs font-bold text-blue-600 border border-gray-200">
                PayPal
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200">
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 12l-4.5 4.5L12 21l8.75-4.5L16.25 12 12 14.25 7.75 12zM12 3L3.25 7.5 12 12l8.75-4.5L12 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
