import React, { useEffect } from "react";

import type { CartItemType } from "@/types/django_api_types";
import { zodiosAPI } from "@/types/axiosClient";

export default function useUserInfo(
  user: string | undefined | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>
) {
  useEffect(() => {
    // get user and their cart items if they have a jwt token that works in their
    // local storage
    async function setUserFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        const me = await zodiosAPI.auth_users_me_retrieve();
        console.log("User info from token:", me.username);
        setUser(me.username);

        // Sync our cart w. the server:
        const cartItems = await zodiosAPI.api_cart_items_list();
        setCartItems(cartItems);
      }
    }

    if (!user && localStorage.getItem("token")) {
      // If user is not set and there is a token, try to set user from token
      try {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setUserFromToken();
      } catch (error) {
        console.error("Error setting user from token:", error);
      }
    }
  }, [user]);
}
