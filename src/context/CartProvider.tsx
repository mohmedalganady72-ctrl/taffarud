"use client";

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CatalogProduct } from "@/types/catalog";

const STORAGE_KEY = "tafarrud-cart:v1";

export type CartItemData = {
  product: CatalogProduct;
  quantity: number;
};

type CartContextValue = {
  items: CartItemData[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (product: CatalogProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

function isStoredCart(value: unknown): value is { version: 1; items: CartItemData[] } {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { version?: unknown; items?: unknown };
  return candidate.version === 1 && Array.isArray(candidate.items);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemData[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const stored: unknown = raw ? JSON.parse(raw) : null;
      if (isStoredCart(stored)) setItems(stored.items);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items }));
  }, [hydrated, items]);

  const addItem = useCallback((product: CatalogProduct, quantity = 1) => {
    if (product.stock < 1) return;
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) return [...current, { product, quantity: Math.min(quantity, product.stock) }];
      return current.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => current.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const value = useMemo(() => ({
    items, itemCount, subtotal, hydrated, addItem, removeItem, updateQuantity, clearCart,
  }), [items, itemCount, subtotal, hydrated, addItem, removeItem, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
