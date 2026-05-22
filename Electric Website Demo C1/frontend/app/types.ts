export interface INavItem {
  id: string;
  name: string;
  link: string;
  children: INavItem[];
}

export interface IServerRes<T = null> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  key: string[];
  totalPage: number;
}

export interface ISubCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  image: string;
  alt_tag: string | null;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  alt_tag: string | null;
  sub_categories: ISubCategory[];
}

export interface IVarient {
  id: number;
  sku: string;
  price: string;
  compareAtPrice: string;
  quantity: number;
  available: boolean;
  combination: string[];
  images: { image: string; alt_tag: string | null }[];
}

export interface IProduct {
  id: number;
  sku_id: string;
  name: string;
  description: string;
  price: string;
  compare_at_price: string;
  available_quantity: number;
  meta_title: string | null;
  meta_description: string | null;
  status: number;
  tags: string;
  slug: string;
  category_slug: string;
  images: { id: number; image: string; alt_tag: string | null }[];
  rating: string;
  total_ratings: number;

  options: { id: number; name: string; values: { id: 31; value: string }[] }[];
  variants: IVarient[];
}

export interface ITags {
  id: number;
  tag_name: string;
  image: string;
  alt_tag: string | null;
  status: number;
}

export interface OrderItem {
  images: { alt_tag: string | null; image : string, product_variant_id: number | null };
  product_name: string;
  quantity: number;
  sku: string;
  price : string
}

export interface IUserOrderList {
  invoice_avilable: boolean;
  is_cancelable: boolean;
  is_replaceable: boolean;
  is_returnable: boolean;
  order_date: string;
  order_id: number;
  order_number: string;
  order_status: string;
  payment_method : string;
  ordered_products: OrderItem[];
  total_amount: string;
  tracking_id: string | null;
}
