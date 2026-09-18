"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const instagramPosts = [
  {
    id: 1,
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/301257608_848049789431904_2527837842555690076_n-1-320x320.jpg',
    link: 'https://www.instagram.com/p/ChtTplHLRWp/'
  },
  {
    id: 2,
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/301781958_590565369388335_2330168434949671069_n-1-320x320.jpg',
    link: 'https://www.instagram.com/p/ChtTnoPrQGo/'
  },
  {
    id: 3,
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/301036435_3110569585832212_3445598791031889929_n-1-320x320.jpg',
    link: 'https://www.instagram.com/p/ChtTlZNLUY1/'
  },
  {
    id: 4,
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/301365479_804975623865195_4702622905431017422_n-1-320x320.jpg',
    link: 'https://www.instagram.com/p/ChtTjWTrfGZ/'
  },
  {
    id: 5,
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/301308679_1034921237207162_7172600330563620749_n-1-320x320.jpg',
    link: 'https://www.instagram.com/p/ChtThaYLmn5/'
  },
  {
    id: 6,
    image: 'https://glowing.g5plus.net/demo-01/wp-content/uploads/2022/08/301703803_610444000640907_3177738339658195643_n-1-320x320.jpg',
    link: 'https://www.instagram.com/p/ChtTfSTLC68/'
  }
];

export default function InstagramSection() {
  const marqueeItems = Array(10).fill('@glowing.store');

  return (
    <section className="w-full bg-[#f8f8f8] pt-5 md:pt-10 pb-4 md:pb-8 overflow-hidden">

      {/* Marquee Text */}
      <div className="relative w-full overflow-hidden whitespace-nowrap mb-12 flex">
        <div className="animate-marquee inline-block whitespace-nowrap">
          {marqueeItems.map((text, i) => (
            <span key={i} className="text-3xl font-bold text-gray-900 mx-8 tracking-tighter">
              {text}
            </span>
          ))}
        </div>

      </div>

      {/* Instagram Feed Grid */}
      <div className="w-full px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group block rounded-md"
            >
              <Image
                src={post.image}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .ml-full {
          left: 100%;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
