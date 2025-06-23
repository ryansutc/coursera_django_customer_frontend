import { createContext, useContext } from "react";

import type { CartItemType } from "./types/django_api_types";
import type { PageType } from "./types/state_types";

type StateContextType = {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
// Import or define createApiClient and API_BASE_URL
export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

export function useStateContext() {
  const ctx = useContext(StateContext);
  if (!ctx) {
    throw new Error(
      "useStateContext must be used within a StateContext.Provider"
    );
  }
  return ctx;
}
