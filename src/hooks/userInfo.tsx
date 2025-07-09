import type { State } from "@/state/store";
import { setToken } from "@/utils/tokenStore";
import { useEffect } from "react";
import { zodiosAPI } from "@/api/axiosClient";

/**
 * Hook that will get user info from the API
 * when the app loads if there is already a token
 * present in cookies.
 * @param user
 * @param setUser
 */
export default function useUserInfo(
  user: string | undefined | null,
  setUser: State["setUser"]
) {
  useEffect(() => {
    // get user and their cart items if they have a jwt token that works in their
    // local storage
    const username = localStorage.getItem("username");

    async function setUserFromToken() {
      try {
        const resp = await zodiosAPI.api_token_refresh_create(undefined, {
          withCredentials: true,
        });
        setToken(resp.access);
      } catch (error) {
        console.error("Error trying to refresh token:", error);
        localStorage.removeItem("username");
        return;
      }

      try {
        const me = await zodiosAPI.auth_users_me_retrieve();
        localStorage.setItem("username", JSON.stringify(me));

        setUser(me.username);
      } catch (error) {
        console.error("Error fetching user info:", error);
        return;
      }
    }

    if (!user && username) {
      // If user is not set and there is a token, try to set user from token
      try {
        setUserFromToken();
      } catch (error) {
        console.error("Error setting user from token:", error);
      }
    }
  }, [user, setUser]);
}
