"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";

interface NavLink {
  label: string;
  href: string;
}

interface ProductNotification {
  id: number;
  buyer: string;
  time: string;
  title: string;
  image: string;
  phone: string;
  address: string;
  url: string;
}

interface FooterProps {
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  products?: NavLink[];
  usefulLinks?: NavLink[];
  currentNotification?: number;
}

const defaultProducts: NavLink[] = [
  { label: "Bestsellers", href: "#" },
  { label: "New In", href: "#" },
  { label: "Chairs", href: "#" },
  { label: "Sofas", href: "#" },
];

const defaultUsefulLinks: NavLink[] = [
  { label: "About Us", href: "#" },
  { label: "Blog", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact", href: "#" },
];

const defaultNotifications: ProductNotification[] = [
  {
    id: 1,
    buyer: "SRawat",
    time: "25 minutes ago",
    title: "Miro Dining Table",
    image: "/images/brown-bear-sweater.jpg",
    phone: "+91-7256600",
    address: "1822 Prairie Ave South Bend",
    url: "#",
  },
  {
    id: 2,
    buyer: "DKomor",
    time: "8 minutes ago",
    title: "Teapot",
    image: "/images/hummingbird-tshirt.jpg",
    phone: "+91-6979889",
    address: "1822 Prairie Ave South Bend",
    url: "#",
  },
  {
    id: 3,
    buyer: "jhh",
    time: "5 minutes ago",
    title: "Janus Table Lamp",
    image: "/images/table-lamp.jpg",
    phone: "+91-099167444",
    address: "street 123 paris",
    url: "#",
  },
];

export default function Footer({
  companyName = "Auros",
  address = "2593 Timbercrest Road, Chisana, Alaska Badalas",
  phone = "(+91)7-723-46089867",
  email = "demo@demo.com",
  products = defaultProducts,
  usefulLinks = defaultUsefulLinks,
  currentNotification = 0,
}: FooterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeNotification, setActiveNotification] =
    useState(currentNotification);
  const [email_input, setEmailInput] = useState("");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Email submitted:", email_input);
    setEmailInput("");
  };

  const notification = defaultNotifications[activeNotification];

  return (
    <footer className="bg-white text-gray-800">
      {/* Product Notification */}
      {/* <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl p-4 border border-gray-200 z-50">
        <button
          onClick={() =>
            setActiveNotification(
              (prev) => (prev + 1) % defaultNotifications.length
            )
          }
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
        <div className="mb-3">
          <p className="text-xs text-gray-500">
            Purchase by {notification.buyer} • {notification.time}
          </p>
        </div>
        <div className="flex gap-3">
          <img
            src={notification.image}
            alt={notification.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-sm hover:text-blue-600">
              {notification.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{notification.phone}</p>
            <p className="text-xs text-gray-500">{notification.address}</p>
          </div>
        </div>
      </div> */}

      {/* Footer Top (Empty in original) */}
      <div className="border-b border-gray-200" />

      {/* Footer Center */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <Image
                  src="/logo.jpg"
                  alt={companyName}
                  width={150}
                  height={50}
                  className="h-auto"
                />
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">{address}</p>
                <p className="font-semibold text-gray-700">{phone}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:text-blue-800 block"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <button
                onClick={() => toggleSection("products")}
                className="w-full md:w-auto flex items-center justify-between md:justify-start mb-4 group"
              >
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  Our Products
                </h4>
                <span className="md:hidden text-xl">
                  {expandedSection === "products" ? "−" : "+"}
                </span>
              </button>
              <ul
                className={`space-y-2 overflow-hidden transition-all duration-300 md:block ${
                  expandedSection === "products"
                    ? "max-h-48"
                    : "md:max-h-48 max-h-0"
                }`}
              >
                {products.map((product) => (
                  <li key={product.label}>
                    <Link
                      href={product.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {product.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links Section */}
            <div>
              <button
                onClick={() => toggleSection("links")}
                className="w-full md:w-auto flex items-center justify-between md:justify-start mb-4 group"
              >
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  Useful Links
                </h4>
                <span className="md:hidden text-xl">
                  {expandedSection === "links" ? "−" : "+"}
                </span>
              </button>
              <ul
                className={`space-y-2 overflow-hidden transition-all duration-300 md:block ${
                  expandedSection === "links"
                    ? "max-h-48"
                    : "md:max-h-48 max-h-0"
                }`}
              >
                {usefulLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Newsletter signup
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Stay Updated on all that's new and noteworthy
              </p>
              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <div className="flex gap-2 mb-4">
                  <input
                    type="email"
                    placeholder="Your email..."
                    value={email_input}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-gray-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-xl transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 text-xl transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-600 text-xl transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.pinterest.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-red-500 text-xl transition-colors"
                  aria-label="Pinterest"
                >
                  <FaPinterest />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 text-xl transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Copyright & Payment */}
      <div className="border-t border-gray-200 py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm text-gray-600">
                Copyright © 2024 <strong>{companyName}</strong>. All rights
                reserved.
              </p>
            </div>
            <div className="md:text-right">
              <img
                src="/logo.jpg"
                alt="Payment methods"
                className="h-8 md:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
