import { CircleArrowUp, House, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import CartButton from "./zustandbtns/CartButton";

const bottomNavigation = [
  {
    id: 1,
    text: "Home",
    path: "/",
    icon: <House strokeWidth={1.2} size={18} />,
    actionType: "link",
  },
  {
    id: 2,
    text: "Cart",
    path: "#",
    actionType: "btn",
    icon: <ShoppingCart strokeWidth={1.2} size={18} />,
  },
  {
    id: 3,
    text: "Account",
    path: "/account",
    actionType: "link",
    icon: <User strokeWidth={1.2} size={18} />,
  },
  {
    id: 4,
    text: "On Top",
    path: "#top-span-tag",
    actionType: "link",
    icon: <CircleArrowUp strokeWidth={1.2} size={18} />,
  },
];

export default function MobileNavigationBar() {
  return (
    <aside className="md:hidden lg:hidden fixed bottom-0 z-50 bg-white left-0 right-0 border-t border-t-gray-200">
      <ul className="w-full flex items-center justify-between px-7 py-2.5">
        {bottomNavigation.map((item) =>
          item.actionType == "link" ? (
            <Link
              key={item.id}
              href={item.path}
              className="flex items-center justify-center flex-col gap-1 text-sm font-spartan"
            >
              {item.icon}
              {item.text}
            </Link>
          ) : item.id == 2 ? (
            <CartButton
              key={item.id}
              visibility={true}
              className="flex items-center justify-center flex-col gap-1 text-sm font-spartan"
            >
              {item.icon}
              {item.text}
            </CartButton>
          ) : null
        )}
      </ul>
    </aside>
  );
}
