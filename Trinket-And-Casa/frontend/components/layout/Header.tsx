"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";

import { MdOutlineShoppingCart } from "react-icons/md";
import { SlLogin, SlLogout, SlUser } from "react-icons/sl";
import { useCartStore } from "@/store/useCartStore";
import { message } from "antd";
import { FaRegHeart } from "react-icons/fa";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useIsLoggedIn, useUserStore } from "@/store/useUserStore";
import SearchBar from "./searchBar";

export default function Header({ color, colorText }: any) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [messageApi, contextHolder] = message.useMessage();
  const { wishlist } = useWishlistStore();

  const { cart } = useCartStore();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // console.log("globat_cart", cart);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/product" },
    { name: "About", href: "/about" },
    { name: "Profile", href: "/profile" },
  ];
  const [slideLeft, setSlideLeft] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTicking, setIsTicking] = useState(false);
  const [currentScrollY1, setCurrentScrollY1] = useState(0);

  const isLoggedIn = useIsLoggedIn();
  const { logout, setUser, user } = useUserStore();

  const [searchPlaceholder, setSearchPlaceholder] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const searchKeywords = [
    "necklace",
    "ring",
    "nose pin",
    "bracelet",
    "earrings",
    "anklet",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY1(window.scrollY);
      const currentScrollY = window.scrollY;

      if (!isTicking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY + 10) {
            // Scroll down
            setSlideLeft(true);
          } else if (currentScrollY < lastScrollY - 10) {
            // Scroll up
            setSlideLeft(false);
          }
          setLastScrollY(currentScrollY);
          setIsTicking(false);
        });
        setIsTicking(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isTicking]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchPlaceholder((prev) => (prev + 1) % searchKeywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const toggleLogin = () => {};

  // console.log("headerColoreqw", colorText);

  const logoutMessage = () => {
    localStorage.removeItem("token");
    messageApi.open({
      type: "success",
      content: "Logout Successfull",
    });
  };

  return (
    <div
      className={`sticky   ${
        currentScrollY1 > 150
          ? " transform transition-all duration-600  md:top-5"
          : ""
      }  top-0 z-50 bg-transparent transform transition-all duration-600 `}
    >
      {contextHolder}
      <header
        style={
          currentScrollY1 > 150
            ? { boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px" }
            : {}
        }
        className={` bg-[#d9667a]  shadow-2xl rounded-0 ${
          currentScrollY1 > 150
            ? " md:rounded-4xl md:mt-4   md:mx-8 transform transition-all duration-600 "
            : ""
        }  border-gray-200 dark:border-gray-700 transform transition-all duration-600`}
      >
        <div className="max-w-7xl mx-auto px-2 py-1 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl  h-18 font-bold flex justify-start items-center "
          >
            <img
              src="/images/logo/casa-logo.png"
              // alt={item.name}
              className=" h-12 md:h-14 ml-4 object-cover rounded-xl transform"
              loading="lazy"
            />
            <img
              src="/images/logo/casa-name.png"
              className={`md:h-8 h-6  object-cover rounded-xl transform transition-all duration-700 ease-in-out ${
                slideLeft
                  ? "-translate-x-10 md:-translate-x-20 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
              loading="lazy"
              alt="Casa Name"
            />
            {/* Trianket
          <span className="text-gray-700 dark:text-gray-300">&Casa</span> */}
          </Link>

          <div className=" hidden md:flex  max-w-2xl mx-4 relative">
            {/* <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#fbe25e] w-5 h-5 z-10 group-focus-within:text-[#fbe25e] transition-colors" />
              <input
                type="text"
                placeholder={`Search for ${searchKeywords[searchPlaceholder]}...`}
                className="w-full pl-12 pr-4 py-3  rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#fbe25e] placeholder-[#fbe25e] focus:outline-none focus:ring-2 focus:ring-[#faf48c] focus:border-transparent transition-all duration-300 text-sm md:text-base"
              />
            </div> */}
            <SearchBar />
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex justify-between gap-8 text-xl"
            ref={dropdownRef}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-lg font-questrial transition-colors relative group capitalize ${
                  pathname === link.href
                    ? "text-[#fbe25e] opacity-100 "
                    : " text-[#fbe25e] opacity-80 hover:opacity-100"
                }`}
                // style={{ color: colorText }}
              >
                {link.name}
                <span
                  className={`absolute bottom-[-5px] left-0 h-[3px] bg-white transition-all duration-300 ${
                    pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full "
                  }`}
                ></span>
              </Link>
            ))}

            {/* wishlist  */}
            <Link
              key="1"
              href="/wishlist"
              className={`font-bold transition-colors relative group capitalize  ${
                pathname === "/checkout"
                  ? "text-[#fbe25e] opacity-100 "
                  : "text-[#fbe25e] opacity-80 hover:opacity-100"
              }`}
              style={{ color: colorText }}
            >
              <div className="flex">
                <FaRegHeart className="text-2xl" />
                <p className="bg-gray-900 rounded-[50%] text-xs h-4 w-4 p-0 flex justify-center">
                  {wishlist.length}
                </p>
              </div>
              <span
                className={`absolute bottom-[-5px] left-0 h-[3px] bg-[#faf48c] transition-all duration-300 ${
                  pathname === "/checkout"
                    ? "w-full"
                    : "w-0 group-hover:w-full "
                }`}
              ></span>
            </Link>
            {/* checkout  */}
            <Link
              href="/checkout"
              className={`font-bold transition-colors relative group capitalize ${
                pathname === "/checkout"
                  ? "text-[#fbe25e] opacity-100 "
                  : "text-[#fbe25e] opacity-80 hover:opacity-100"
              }`}
              style={{ color: colorText }}
            >
              <div className="flex">
                <MdOutlineShoppingCart className="text-2xl" />
                <p className="bg-gray-900 rounded-[50%] text-xs h-4 w-4 p-0 flex justify-center">
                  {cart?.length}
                </p>
              </div>
              <span
                className={`absolute bottom-[-5px] left-0 h-[3px] bg-[#faf48c] transition-all duration-300 ${
                  pathname === "/checkout"
                    ? "w-full"
                    : "w-0 group-hover:w-full "
                }`}
              ></span>
            </Link>
            <div
              key="same"
              onClick={toggleLogin}
              className={`font-bold transition-colors pr-3 relative group capitalize ${
                pathname === "cart"
                  ? " text-[#fbe25e] opacity-100 "
                  : "text-[#fbe25e] opacity-80 hover:opacity-100"
              }`}
              style={{ color: colorText }}
            >
              <div className="relative">
                {/* Profile Icon */}
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    {isLoggedIn ? (
                      <img
                        src="/images/profile/man.png"
                        alt="/images/profile/man.png"
                        title="You are logged in"
                        className="w-full h-full object-cover mb-0.5 rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <SlUser className="text-xl text-gray-700" />
                    )}
                  </div>
                </button>
                {/* Dropdown Menu */}
              </div>

              {/* <Link href="/authenteaction">
                  <div className="flex gap-2 items-center">
                    <SlLogin className="text-2xl transition-transform duration-300" />
                    <p className="text-lg">Login</p>
                  </div>
                </Link> */}
            </div>

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-12 w-40 bg-white shadow-lg rounded-lg border
               border-gray-200 z-50"
              >
                <Link
                  href={` ${isLoggedIn ? "/profile" : "/"}  `}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      logout();
                      logoutMessage();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <SlLogout className="text-lg rotate-180" /> Logout
                  </button>
                ) : (
                  <Link
                    href="/authenteaction"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <SlLogin className="text-2xl transition-transform duration-300" />
                      <p className="text-lg">Login</p>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#fbe25e] dark:text-gray-300"
          >
            {/* {isOpen ? (
              <X className="text-[#fbe25e]" size={24} />
            ) : (
              <div className="flex justify-end items-end gap-5">
                <Search className=" left-4  text-[#fbe25e]  z-10 group-focus-within:text-[#fbe25e] transition-colors" />
                <Menu className="text-[#fbe25e] " size={24} />
              </div>
            )} */}
            <div className="flex gap-5">
              {isOpen ? (
                ""
              ) : (
                <div className="flex justify-end items-end gap-5">
                  <Search className=" left-4  text-[#fbe25e]  z-10 group-focus-within:text-[#fbe25e] transition-colors" />
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col justify-center items-center gap-[5px] cursor-pointer relative w-[25px] h-[25px]"
              >
                <span
                  className={`w-[25px] h-[3px] bg-[#fbe25e] rounded transition-all duration-300 ${
                    isOpen ? "rotate-45 translate-y-[8px]" : ""
                  }`}
                ></span>
                <span
                  className={`w-[25px] h-[3px] bg-[#fbe25e] rounded transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`w-[25px] h-[3px] bg-[#fbe25e] rounded transition-all duration-300 ${
                    isOpen ? "-rotate-45 -translate-y-[8px]" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav
            className={`absolute md:hidden w-full bg-[#d9667a] border-t rounded-b-2xl border-gray-200 
               dark:border-gray-700 px-0 pb-3 overflow-hidden transition-all duration-700 ease-in-out 
              ${isOpen ? "max-h-120 opacity-100 " : "max-h-0 opacity-0"}`}
          >
            <SearchBar />
            <hr className="border-t-1 border-white " />

            {navLinks.map((link) => (
              <div className="px-3">
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-1  text-lg font-medium relative ${
                    pathname === link.href
                      ? "text-[#fbe25e] text-xl"
                      : "text-[#fbe25e] opacity-80 hover:opacity-100"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-[-1px] left-0 h-0.5  bg-[#faf48c] transition-all duration-300 ${
                      pathname === link.href
                        ? "w-14 "
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </div>
            ))}
            <hr className="border-t-1 border-white mt-5" />

            <div className="flex justify-around mt-2">
              <Link
                key="1"
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                className={`font-bold transition-colors relative  ${
                  pathname === "/checkout"
                    ? "text-[#fbe25e] opacity-100 "
                    : "text-[#fbe25e] opacity-80 hover:opacity-100"
                }`}
                style={{ color: colorText }}
              >
                <div className="flex">
                  <FaRegHeart className="text-2xl" />
                  <p className="bg-gray-900 rounded-[50%] text-xs h-4 w-4 p-0 flex justify-center">
                    {wishlist.length}
                  </p>
                </div>
                <span
                  className={`absolute bottom-[-5px] left-0 h-[3px] bg-[#faf48c] transition-all duration-300 ${
                    pathname === "/checkout"
                      ? "w-full"
                      : "w-0 group-hover:w-full "
                  }`}
                ></span>
              </Link>
              <Link
                key="1"
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className={`font-bold transition-colors relative  ${
                  pathname === "/checkout"
                    ? "text-[#fbe25e] opacity-100 "
                    : "text-[#fbe25e] opacity-80 hover:opacity-100"
                }`}
                style={{ color: colorText }}
              >
                <div className="flex">
                  <MdOutlineShoppingCart className="text-2xl" />
                  <p className="bg-gray-900 rounded-[50%] text-xs h-4 w-4 p-0 flex justify-center">
                    {cart.length}
                  </p>
                </div>
                <span
                  className={`absolute bottom-[-5px] left-0 h-[3px] bg-[#faf48c] transition-all duration-300 ${
                    pathname === "/checkout"
                      ? "w-full"
                      : "w-0 group-hover:w-full "
                  }`}
                ></span>
              </Link>
              <div
                key="same"
                onClick={() => {
                  toggleLogin();
                  setIsOpen(false);
                }}
                className={`font-bold transition-colors pr-3 relative group capitalize ${
                  pathname === "cart"
                    ? " text-[#fbe25e] opacity-100 "
                    : "text-[#fbe25e] opacity-80 hover:opacity-100"
                }`}
                style={{ color: colorText }}
              >
                {isLoggedIn ? (
                  <Link href="#" onClick={logout}>
                    <div className="flex  gap-2">
                      <SlLogout className="text-2xl transition-transform duration-300 rotate-180" />
                      <p className="text-lg">Logout</p>
                    </div>
                  </Link>
                ) : (
                  <Link href="/authenteaction">
                    <div className="flex gap-2">
                      <SlLogin className="text-2xl transition-transform duration-300 " />{" "}
                      <p className="text-lg">Login</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
