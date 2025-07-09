import { useEffect, useRef } from "react";

import type { CartItem as CartItemType } from "@/types/django_api_types";

export function useCartOpenOnChange(
  cartItems: CartItemType[],
  setCartOpen: (open: boolean) => void
) {
  const prevItemsRef = useRef<CartItemType[]>(cartItems);

  useEffect(() => {
    if (
      prevItemsRef.current !== cartItems &&
      prevItemsRef.current.length !== cartItems.length &&
      cartItems.length > prevItemsRef.current.length
    ) {
      setCartOpen(true);
    }
    prevItemsRef.current = cartItems;
  }, [cartItems, setCartOpen]);
}
