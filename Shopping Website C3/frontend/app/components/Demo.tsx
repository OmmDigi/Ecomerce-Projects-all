"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [qty, setQty] = useState(1);

  return (
    <main className="min-h-screen bg-white text-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-neutral-500">
          <a href="#" className="hover:underline">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="#" className="hover:underline">
            Men
          </a>
          <span className="mx-2">/</span>
          <span>Shirts</span>
        </nav>

        {/* Product grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left – images */}
          <section className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-neutral-200">
              <Image
                src="/shirt-main.jpg" // <-- place your image in /public
                alt="Levi's Essential Western Denim Shirt"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="relative aspect-square w-20 overflow-hidden rounded border border-neutral-200 hover:border-black"
                >
                  <Image
                    src={`/shirt-thumb${i}.jpg`}
                    alt={`thumb ${i}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Right – details */}
          <section className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Levi&apos;s Essential Western Denim Shirt
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-neutral-500">(4.8 / 5)</span>
              </div>
            </div>

            <div className="text-3xl font-bold">$120.00</div>

            {/* Color swatches */}
            <div>
              <p className="mb-2 text-sm font-medium">
                Color: <span className="font-normal">Light Wash</span>
              </p>
              <div className="flex gap-2">
                {["bg-blue-300", "bg-blue-600", "bg-neutral-800"].map(
                  (c, idx) => (
                    <button
                      key={idx}
                      className={`h-8 w-8 rounded-full border ${c} ${
                        idx === 0 ? "ring-2 ring-offset-2 ring-black" : ""
                      }`}
                      aria-label="color"
                    />
                  )
                )}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Size</span>
                <a href="#" className="underline">
                  Size guide
                </a>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    className="rounded border border-neutral-300 py-2 text-sm font-medium hover:border-black"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to bag */}
            <div className="flex gap-4">
              <div className="flex h-12 w-32 items-center justify-between rounded border border-neutral-300 px-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-lg"
                >
                  −
                </button>
                <span className="font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-lg">
                  +
                </button>
              </div>
              <button className="flex-1 rounded bg-black py-3 text-white hover:bg-neutral-800">
                Add to Bag
              </button>
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-3">
              <Image src="/paypal.svg" alt="PayPal" width={60} height={20} />
              <Image src="/visa.svg" alt="Visa" width={40} height={20} />
              <Image
                src="/mastercard.svg"
                alt="Mastercard"
                width={40}
                height={20}
              />
            </div>

            {/* Shipping note */}
            <p className="text-sm text-green-700">✓ Ships free to the US</p>

            {/* Wishlist */}
            <button className="flex items-center gap-2 text-sm underline">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
              Add to Wishlist
            </button>

            {/* Accordion details */}
            <Accordion
              items={[
                {
                  title: "Description",
                  body: "Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                },
                {
                  title: "Delivery Policy",
                  body: "Standard shipping takes 5-7 business days. Express options available at checkout.",
                },
                {
                  title: "Returns & Exchanges",
                  body: "Free returns within 30 days of delivery. Item must be unworn with tags attached.",
                },
                {
                  title: "Care Instructions",
                  body: (
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Machine wash at max. 30 °C – normal process</li>
                      <li>Do not bleach</li>
                      <li>Do not tumble dry</li>
                      <li>Iron at max. 110 °C without steam</li>
                      <li>Do not dry clean</li>
                    </ul>
                  ),
                },
              ]}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

/* Re-usable accordion */
function Accordion({
  items,
}: {
  items: { title: string; body: string | any }[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
      {items.map((item, idx) => (
        <div key={idx}>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="flex w-full items-center justify-between py-4 text-left"
          >
            <span className="font-medium">{item.title}</span>
            <span className="text-xl">{openIdx === idx ? "−" : "+"}</span>
          </button>
          {openIdx === idx && (
            <div className="pb-4 text-sm text-neutral-600">{item.body}</div>
          )}
        </div>
      ))}
    </div>
  );
}
