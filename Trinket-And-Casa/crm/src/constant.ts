export const SIDEBAR_OPTIONS = {
  dropdownOptions: ["Logout"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Categories",
          url: "/categories",
        },
        {
          title: "Sub Categories",
          url: "/sub-categories",
        },
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Coupons",
          url: "/discount",
        },
        {
          title: "Orders",
          url: "/orders",
        },
        {
          title: "Reviews",
          url: "/reviews",
        },
        {
          title: "Recipient",
          url: "/recipient",
        },
        // {
        //   title: "Demo Webhook",
        //   url: "/demo-webhook",
        // },
        // {
        //   title: "Media Gallery",
        //   url: "/media-gallery",
        // },
        // {
        //   title: "Contact List",
        //   url: "/contact-list",
        // },
      ],
    },
  ],
};

export const DEFAULT_PRODUCT_VARIANT_OPTIONS = [
  {
    id: 1,
    name: "Color",
    values: [
      { id: 1, value: "Red" },
      { id: 2, value: "Blue" },
    ],
  },
];

export const ORDER_PENDING = "PENDING";
export const ORDER_CONFIRMED = "CONFIRMED";
export const ORDER_PACKED = "PACKED";
export const ORDER_SHIPPED = "SHIPPED";
export const ORDER_DELIVERED = "DELIVERED";
export const ORDER_CANCELLED = "CANCELLED";
export const ORDER_RETURNED = "RETURNED";
export const ORDER_RETURN_INITIATED = "RETURN INITIATED";
export const OUT_FOR_DELIVERY = "OUT FOR DELIVERY";

export const PAYMENT_PENDING = "PENDING";
export const PAYMENT_PAID = "PAID";
export const PAYMENT_FAILED = "FAILED";
export const PAYMENT_REFUNDED = "REFUNDED";

export const REVIEW_STATUS_NOT_APPROVED = 1;
export const REVIEW_STATUS_APPROVED = 2;

export const ORDER_STATUS = [
  {
    text: "Pending",
    value: ORDER_PENDING,
  },
  {
    text: "Confirmed",
    value: ORDER_CONFIRMED,
  },
  {
    text: "Packed",
    value: ORDER_PACKED,
  },
  {
    text: "Shipped",
    value: ORDER_SHIPPED,
  },
  {
    text: "Our For Delivery",
    value: OUT_FOR_DELIVERY,
  },
  {
    text: "Delivered",
    value: ORDER_DELIVERED,
  },
  {
    text: "Cancled",
    value: ORDER_CANCELLED,
  },
  {
    text: "Returned",
    value: ORDER_RETURNED,
  },
  {
    text: "Return Initiated",
    value: ORDER_RETURN_INITIATED,
  },
];

export const PAYMENT_STATUS = [
  {
    text: "Pending",
    value: PAYMENT_PENDING,
  },
  {
    text: "Paid",
    value: PAYMENT_PAID,
  },
  {
    text: "Failed",
    value: PAYMENT_FAILED,
  },
  {
    text: "Refunded",
    value: PAYMENT_REFUNDED,
  },
];
