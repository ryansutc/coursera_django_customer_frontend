// create a new zustand store:
import type {} from "@redux-devtools/extension"; // required for devtools typing

import { combine, devtools } from "zustand/middleware";

import type { ExtractState } from "zustand";
import type { PageType } from "@/types/state_types";
import { create } from "zustand";

// Instead of explicitly defining the store structure for typescript,
// we can use the ExtractState function to extract it for us.
// We use this with combine() below, which infers the state for us
export type State = ExtractState<typeof useStore>;

type RestaurantState = {
  page: PageType;
  setPage: (page: PageType) => void;
  user: string | null;
  setUser: (user: string | null) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export const useStore = create<RestaurantState>()(
  devtools(
    combine(
      {
        cartOpen: false,
        page: "menu" as PageType,
        user: null as string | null,
      } as RestaurantState,
      (set) => ({
        setPage: (page: PageType) => set({ page }, undefined, "page/setPage"),
        setUser: (user: string | null) =>
          set({ user }, undefined, "user/setUser"),
        setCartOpen: (open: boolean) =>
          set({ cartOpen: open }, undefined, "cart/setCartOpen"),
      })
    )
  )
);
