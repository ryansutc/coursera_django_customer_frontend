import { useEffect, useRef } from "react";

export function useCartOpenOnChange(cartItems: any[], setCartOpen: (open: boolean) => void) {
  const prevItemsRef = useRef<any[]>(cartItems);

  useEffect(() => {
    if (prevItemsRef.current !== cartItems && prevItemsRef.current.length !== cartItems.length) {
      setCartOpen(true);
    }
    prevItemsRef.current = cartItems;
  }, [cartItems, setCartOpen]);
}
