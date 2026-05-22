import { INavItem } from "./types";

export const navItems: INavItem[] = [
    { id: "home", name: "Home", link: "/", children: [] },
    { id: "products", name: "Products", link: "/products", children: [] },
    // { id: "about", name: "About us", link: "/about-us", children: [] },
    { id: "contact", name: "Contact us", link: "/contact-us", children: [] },
];

export const RETURN_INITIATED = "RETURN INITIATED";
export const ORDER_PENDING = "PENDING";
export const ORDER_CONFIRMED = "CONFIRMED";
export const ORDER_PACKED = "PACKED";
export const ORDER_SHIPPED = "SHIPPED";
export const ORDER_DELIVERED = "DELIVERED";
export const ORDER_CANCELLED = "CANCELLED";
export const ORDER_RETURNED = "RETURNED";
export const ORDER_RETURN_INITIATED = RETURN_INITIATED;
// export const ORDER_RETURN_CANCELLED = "RETURN CANCELLED";
export const OUT_FOR_DELIVERY = "OUT FOR DELIVERY";
export const REPLACE_INITIATED = "REPLACE INITIATED";
export const REPLACED = "REPLACED";