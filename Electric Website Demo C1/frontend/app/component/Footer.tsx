import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

const links = [
  {
    heading: "Quick Links",
    sublinks: [
      { heading: "Search", link: "#" },
      { heading: "Reviews", link: "#" },
      { heading: "About us", link: "#" },
      { heading: "Privacy Policy", link: "#" },
    ],
  },
  {
    heading: "Information",
    sublinks: [
      { heading: "Terms & Conditions", link: "#" },
      { heading: "Payment", link: "#" },
      { heading: "Return Policy", link: "#" },
      { heading: "Promotions", link: "#" },
      { heading: "Contact us", link: "#" },
      { heading: "Privacy Policy", link: "#" },
    ],
  },
  {
    heading: "Company",
    sublinks: [
      { heading: "My Account", link: "#" },
      { heading: "My Cart", link: "#" },
      { heading: "Wishlist", link: "#" },
      { heading: "Products", link: "#" },
      { heading: "Create Account", link: "#" },
    ],
  },
  {
    heading: "Contact us",
    sublinks: [
      {
        heading:
          "70 Washington Square South, New York, NY 10012, United States",
        link: "#",
      },
      { heading: "+12345 678 910", link: "#" },
      { heading: "+12345 678 109", link: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <section className="bg-[#121212] py-10">
        <ul className="container mx-auto px-4 gap-4 grid-cols-2 gap-y-11 grid md:grid-cols-3 lg:grid-cols-4">
          {links.map((item, index) => (
            <li key={index} className="text-white space-y-3">
              <h3 className="font-semibold font-open tracking-wider text-xl">
                {item.heading}
              </h3>
              <ul className="space-y-2.5">
                {item.sublinks.map((link, index) => (
                  <li key={index} className="font-inter font-300 text-sm">
                    <Link href={link.link}>{link.heading}</Link>
                  </li>
                ))}
                {index === 3 ? (
                  <li
                    title="Social Links"
                    className="flex items-center gap-3.5"
                  >
                    <div className="border border-gray-400 p-1.5">
                      <Instagram
                        strokeWidth={1.5}
                        className="text-white"
                        size={18}
                      />
                    </div>
                    <div className="border border-gray-400 p-1.5">
                      <Facebook strokeWidth={1.5} size={18} />
                    </div>

                    <div className="border border-gray-400 p-1.5">
                      <Youtube strokeWidth={1.5} size={18} />
                    </div>
                  </li>
                ) : null}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section className="container mx-auto px-4 py-5 flex items-center justify-center md:justify-between lg:justify-between flex-col md:flex-row lg:flex-row gap-y-1.5">
        <h2 className="font-open text-sm">© 2025, Omm Digital Solution</h2>

        <Link href="https://ommdigitalsolution.com/" className="font-open underline text-sm">
          Developed By Omm Digital Solution Pvt Ltd
        </Link>
      </section>
    </footer>
  );
}
