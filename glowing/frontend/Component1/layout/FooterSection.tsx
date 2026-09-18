import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="w-full bg-white pt-16 md:pt-24 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">
          
          {/* Newsletter Column */}
          <div className="w-full lg:w-5/12 pr-0 lg:pr-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Good emails.</h2>
            <p className="text-gray-600 mb-10 text-base leading-relaxed">
              Smile with the reflection of the glow.<br />
              Let your Skin define your age and not the years
            </p>
            <form className="flex w-full max-w-md border-b-2 border-gray-300 pb-3 transition-colors focus-within:border-black">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-transparent outline-none text-gray-900 placeholder-gray-500"
                required 
              />
              <button 
                type="submit" 
                className="uppercase font-bold text-gray-900 tracking-wider text-sm hover:text-gray-600 transition-colors ml-4"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links Columns Container */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Company</h3>
              <ul className="space-y-4">
                {['About us', 'Careers', 'Store Locations', 'Our Blog', 'Reviews'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 hover:text-black transition-colors text-base">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Useful links</h3>
              <ul className="space-y-4">
                {['New Products', 'Best Sellers', 'Bundle & Save', 'Online Gift Card'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 hover:text-black transition-colors text-base">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Information</h3>
              <ul className="space-y-4">
                {['Start a Return', 'Contact Us', 'Shipping FAQ', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 hover:text-black transition-colors text-base">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-8 gap-6 md:gap-4">
          
          {/* Copyright & Socials */}
          <div className="w-full md:w-1/3 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 order-2 md:order-1">
            <span className="text-gray-500 text-sm">© Glowing 2022</span>
            <div className="flex items-center gap-4 text-gray-900">
              <Link href="#" className="hover:text-gray-500 transition-colors" aria-label="Facebook"><Facebook size={18} /></Link>
              <Link href="#" className="hover:text-gray-500 transition-colors" aria-label="Twitter"><Twitter size={18} /></Link>
              <Link href="#" className="hover:text-gray-500 transition-colors" aria-label="YouTube"><Youtube size={18} /></Link>
              <Link href="#" className="hover:text-gray-500 transition-colors" aria-label="Instagram"><Instagram size={18} /></Link>
            </div>
          </div>

          {/* Logo */}
          <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2 mb-4 md:mb-0">
            <Image 
              src="https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/logo-126x47.png" 
              alt="Glowing Logo" 
              width={126} 
              height={47} 
            />
          </div>

          {/* Payment Icons */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end order-3">
            <Image 
              src="https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/icon-pay.png" 
              alt="Payment Methods" 
              width={313} 
              height={28} 
              className="object-contain"
            />
          </div>

        </div>

      </div>
    </footer>
  );
}
