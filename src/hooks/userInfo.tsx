import React, { useEffect } from "react";

import { zodiosAPI } from "@/types/axiosClient";
import { setToken } from "@/utils/tokenStore";

/**
 * Hook that will get user info from the API
 * when the app loads if there is already a token
 * present in cookies.
 * @param user
 * @param setUser
 */
export default function useUserInfo(
  user: string | undefined | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>
) {
  useEffect(() => {
    // get user and their cart items if they have a jwt token that works in their
    // local storage
    async function setUserFromToken() {
      const userinfo = localStorage.getItem("userinfo");
      if (userinfo) {
        try {
          const resp = await zodiosAPI.api_token_refresh_create();
          setToken(resp.access);
        } catch (error) {
          console.error("Error trying to refresh token:", error);
          localStorage.removeItem("userinfo");
          return;
        }
        try {
          const me = await zodiosAPI.auth_users_me_retrieve();
          localStorage.setItem("userinfo", JSON.stringify(me));
          console.log("User info from token:", me.username);
          setUser(me.username);
        } catch (error) {
          console.error("Error fetching user info:", error);
          return;
        }
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
