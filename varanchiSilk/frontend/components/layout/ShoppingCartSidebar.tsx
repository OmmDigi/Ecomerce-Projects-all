import React, { useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

interface CartVariation {
  name: string;
  value: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  url: string;
  sku: string;
  cartItemKey: string;
  variations?: CartVariation[];
  maxQuantity?: number;
}

const ShoppingCartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { removeFromCart, updateQuantity, cart } = useCartStore();

  const changeQty = (item: any, diff: number) => {
    const newQty = item.quantity + diff;
    if (newQty <= 0) {
      removeFromCart(item.id, item.variantId);
      return;
    }
    updateQuantity(item.id, item.variantId, newQty);
  };

  const deleteItem = (item: any) => {
    removeFromCart(item.id, item.variantId);
  };
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const TrashIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 19"
      width="17"
      className="fill-current"
    >
      <g fillRule="nonzero">
        <path d="M16.227 3.03h-5l-.433-1.87c-.086-.37-.394-.63-.749-.63h-3.09c-.355 0-.664.26-.75.632L5.771 3.03H.773c-.427 0-.773.373-.773.833v.834c0 .46.346.833.773.833h15.454c.427 0 .773-.373.773-.833v-.834c0-.46-.346-.833-.773-.833ZM15 6.53H3v9.75a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 15 16.28V6.53Z" />
      </g>
    </svg>
  );

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center   py-2 text-sm font-medium text-gray-50 hover:text-amber-600 transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-[#053628] text-white text-xs font-medium rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-0 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-light text-gray-900">Cart</h2>
              <span className="text-xl font-light text-gray-500">
                ({totalItems})
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/product/${item?.product?.slug}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item?.product?.images?.[0].image}
                        alt={item?.product?.images?.[0].alt_tag}
                        className="w-20 h-24 object-cover rounded"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item?.product?.slug}`}
                        className="text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors block mb-2"
                      >
                        {item?.product?.name}
                      </Link>
                      <p></p>
                      {/* Variations */}
                      {/* {item.product?.variations.find(item.)} */}
                      {item?.product?.variations &&
                        item?.product?.variations.length > 0 && (
                          <dl className="text-xs text-gray-600 space-y-1 mb-3">
                            {item?.product?.variations.map(
                              (variation: any, index: number) => (
                                <div key={index} className="flex gap-1">
                                  <dt className="font-medium">
                                    {variation.name}:
                                  </dt>
                                  <dd>{variation.value}</dd>
                                </div>
                              ),
                            )}
                          </dl>
                        )}
                      {/* Quantity and Price */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => changeQty(item, -1)}
                            className="px-2 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-sm">{item.quantity}</span>

                          <button
                            onClick={() => changeQty(item, 1)}
                            className="px-2 py-1 hover:bg-gray-100 transition-colors text-gray-600"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          ₹{(item?.product?.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => deleteItem(item)}
                      className="flex-shrink-0 self-start p-2 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600"
                      aria-label="Remove item"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-5 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-gray-900">Subtotal:</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">(ex. VAT)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {/* <a
                  href="/cart"
                  className="block w-full py-3 px-4 bg-white border-2 border-gray-900 text-gray-900 text-center text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                >
                  View cart
                </a> */}
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 px-4 bg-gray-900 text-white text-center text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCartSidebar;
