import { create } from "zustand";

interface WishlistItem {
  [key: string]: any; // allows storing the full product object
}

interface WishlistState {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
}

// 🔥 Load from localStorage
const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load wishlist:", error);
    return [];
  }
};

// 🔥 Save to localStorage
const saveWishlistToLocalStorage = (wishlist: WishlistItem[]) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  } catch (error) {
    console.error("Failed to save wishlist:", error);
  }
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: loadWishlistFromLocalStorage(),

  toggleWishlist: (item) =>
    set((state) => {
      const exists = state.wishlist.find((i) => i.id === item.id);

      const updatedWishlist = exists
        ? state.wishlist.filter((i) => i.id !== item.id)
        : [...state.wishlist, item]; // store full product item

      saveWishlistToLocalStorage(updatedWishlist);

      return { wishlist: updatedWishlist };
    }),
}));
