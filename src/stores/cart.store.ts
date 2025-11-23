import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemList } from "@/types/cart.type";

type CartState = {
  items: CartItemList[];
  addItem: (item: CartItemList) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
