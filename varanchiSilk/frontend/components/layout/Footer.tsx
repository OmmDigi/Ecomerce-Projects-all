// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#053628] text-white">
      {/* Main Footer Content */}
      <div className="py-5 px-5 md:py-3 md:px-14">
        <Link
          href="/"
          className="text-2xl w-full h-20 font-bold flex justify-start items-center "
        >
          <img
            src="/varanchi_logo.png"
            // alt={item.name}
            className=" h-6 md:h-18  object-cover  transform "
            loading="lazy"
          />
        </Link>
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-10">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm  italic">
              Crafted with love, style & elegance
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-questrial  ">Quick Links</h4>
            <nav className="flex flex-wrap gap-2 md:gap-10 justify-start items-start">
              <Link
                href="/"
                className="text-base  font-questrial tracking-wide  transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-bas font-questrial tracking-wide  transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/"
                className="text-base font-questrial tracking-wide  transition-colors duration-300"
              >
                Store{" "}
              </Link>
            </nav>
          </div>

          {/* Social Media Icons */}
        </div>
        <div className="flex gap-5 justify-center item-center mt-5 md:mt-[-30]">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-white/30 border border-black/10 rounded-full  hover:bg-white/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaFacebookF className="text-lg" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-white/30 border border-black/10 rounded-full  hover:bg-white/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaInstagram className="text-lg" />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center bg-white/30 border border-black/10 rounded-full  hover:bg-white/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaWhatsapp className="text-lg" />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-[#053628]  py-1 px-5 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-center items-center gap-2 md:gap-8 text-center">
          <p className=" text-sm">
            © 2026 Trianket & Casa. All rights reserved.
          </p>
          <div className="grid grid-cols-2  gap-5 ">
            <Link
              href="/privacy"
              className="text-xs  transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs  transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
