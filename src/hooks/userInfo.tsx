import React, { useEffect } from "react";

export default function useUserInfo(
  user: string | undefined | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>
) {
  useEffect(() => {
    // get user and their cart items if they have a jwt token that works in their
    // local storage
    async function setUserFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        // @ts-expect-error method does not exist.
        const res = await zodiosAPI.auth_users_me_retrieve(token);
        setUser(res.username);
      }
    }
    if (!user && localStorage.getItem("token")) {
      // If user is not set and there is a token, try to set user from token
      try {
        setUserFromToken();
      } catch (error) {
        console.error("Error setting user from token:", error);
      }
    }
  }, [user]);
}
