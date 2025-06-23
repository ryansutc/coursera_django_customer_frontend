import { Badge, Button, CircularProgress, Fade, styled } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useStateContext } from "@/contexts";
import { zodiosAPI } from "@/types/axiosClient";

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
}));

export default function NavBarMenu() {
  // page state
  const { cartItems, page, user, setPage, setUser, setCartOpen, cartOpen } =
    useStateContext();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLoginLogout = async () => {
    if (user) {
      // Logout logic
      try {
        setIsLoggingOut(true);

        // we need to make a method to remove ALL cart items when a user logs out.
        await zodiosAPI.api_cart_items_delete_destroy();
        localStorage.clear();
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setTimeout(() => setIsLoggingOut(false), 500);
      }
    }
    setPage("login");
    setUser(null);
  };
  return (
    <>
      <Fade in timeout={600}>
        <StyledButton
          variant="text"
          color="primary"
          sx={{
            color: page === "menu" ? "primary.main" : "primary.dark",
          }}
          onClick={() => setPage("menu")}
        >
          Menu
        </StyledButton>
      </Fade>
      {user && page === "menu" ? (
        <Fade in timeout={300}>
          <StyledButton
            variant="text"
            color="primary"
            sx={{
              color: cartItems.length ? "primary.main" : "primary.dark",
            }}
            onClick={() => setCartOpen(!cartOpen)}
          >
            Cart{" "}
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </StyledButton>
        </Fade>
      ) : null}
      <Fade in timeout={300}>
        <StyledButton
          variant="text"
          color="primary"
          sx={{
            color: page === "login" ? "primary.main" : "primary.dark",
          }}
          onClick={handleLoginLogout}
          title={user ? user : "Login to make an order!"}
        >
          {isLoggingOut ? (
            <CircularProgress size={24} color="inherit" />
          ) : user ? (
            "Logout"
          ) : (
            "Login"
          )}
        </StyledButton>
      </Fade>
    </>
  );
}
