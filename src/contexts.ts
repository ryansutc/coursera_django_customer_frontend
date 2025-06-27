import React, { createContext, useContext } from "react";

import type { PageType } from "./types/state_types";

type StateContextType = {
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
