import { createContext } from "react";

export const StateContext = createContext({
  page: "menu",
  user: null,
  setPage: (page: string) => {},
  setUser: (user: any) => {},
  cartItems: [{ id: 1, quantity: 0 }],
  setCartItems: (items: any[]) => {},
  cartOpen: false,
  setCartOpen: (open: boolean) => {},
});
