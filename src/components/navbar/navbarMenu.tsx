import { Badge, Button, CircularProgress, Fade, styled } from "@mui/material";
import { useMemo, useState } from "react";

import { useStateContext } from "@/contexts";
import { useCartItems } from "@/hooks/useCartItems";
import { zodiosAPI } from "@/types/axiosClient";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useQueryClient } from "@tanstack/react-query";
import LogoutDialog from "./LogoutDialog";

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
}));

export default function NavBarMenu() {
  const { page, user, setPage, setUser, setCartOpen, cartOpen } =
    useStateContext();
  const queryClient = useQueryClient();
  const { data: cartItems } = useCartItems(user);

  const cartQuantity = useMemo(() => {
    if (cartItems && cartItems.length > 0) {
      return cartItems.reduce(
        (total, item) => total + (item?.quantity ?? 0),
        0
      );
    } else return 0;
  }, [cartItems]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLoginLogout = async () => {
    if (user) {
      // Check if user has items in cart
      if (cartItems?.length) {
        setShowLogoutDialog(true);
        return;
      }
      // Proceed with logout if no cart items
      await performLogout();
    } else {
      setPage("login");
    }
  };

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);
      // Clear cart items for the current user
      await zodiosAPI.api_cart_items_delete_destroy(undefined);
      queryClient.setQueryData(["cartItems", user], []);
      // Remove all cart-related queries
      queryClient.removeQueries({ queryKey: ["cartItems"] });
      localStorage.clear();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setTimeout(() => setIsLoggingOut(false), 500);
    }
    setPage("login");
    setCartOpen(false);
    setUser(null);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    void performLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
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
              color: cartItems?.length ? "primary.main" : "primary.dark",
            }}
            onClick={() => setCartOpen(!cartOpen)}
          >
            Cart{" "}
            <Badge badgeContent={cartQuantity} color="error">
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
          onClick={() => void handleLoginLogout()}
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

      <LogoutDialog
        open={showLogoutDialog}
        cartQuantity={cartQuantity}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
}
