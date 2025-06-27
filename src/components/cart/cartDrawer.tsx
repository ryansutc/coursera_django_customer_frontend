import type { CartItemType, MenuItemType } from "@/types/django_api_types";
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

import { useStateContext } from "@/contexts";
import { useCartItems } from "@/hooks/useCartItems";
import { useMenuItems } from "@/hooks/useMenuItems";
import { zodiosAPI } from "@/types/axiosClient";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "@tanstack/react-query";
import CartItemCard from "./cartItemCard";

export default function CartDrawer({
  open,
  onClose,
  setShowSuccessToast,
}: {
  open: boolean;
  onClose: () => void;
  setShowSuccessToast: (show: boolean) => void;
}) {
  const { user } = useStateContext();
  const queryClient = useQueryClient();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const {
    data: menuItems = [],
    isLoading: isMenuLoading,
    error: menuError,
  } = useMenuItems();
  const {
    data: cartItems = [],
    isLoading: isCartLoading,
    error: cartError,
  } = useCartItems(user);
  const isLoading = isMenuLoading || isCartLoading;
  const error = menuError || cartError;

  type UserCartItemType = CartItemType & Pick<MenuItemType, "title" | "price">;
  const handleClose = () => {
    onClose(); // Call the onClose function passed as a prop
  };

  const handlePlaceOrder = async () => {
    try {
      setIsPlacingOrder(true);
      const response = await zodiosAPI.api_checkout(undefined);
      console.log("Order placed successfully:", response);

      // Clear cart items from cache after successful checkout
      queryClient.setQueryData(["cartItems", user], []);
      queryClient.removeQueries({ queryKey: ["cartItems"] });

      // Close the drawer
      onClose();

      // Show success toast
      setShowSuccessToast(true);
    } catch (error) {
      console.error("Failed to place order:", error);
      // TODO: Add proper error handling/toast notification
    } finally {
      setIsPlacingOrder(false);
    }
  };
  const userCartItems: UserCartItemType[] | [] = useMemo(() => {
    // Keep the list of cart items in sync.
    return cartItems.map((cartItem) => {
      const menuItem = menuItems.find((item) => item.id === cartItem.menuitem);
      if (!menuItem) {
        throw new Error(`Menu item with ID ${cartItem.menuitem} not found`);
      }
      return {
        ...cartItem,
        title: menuItem.title,
        price: menuItem.price,
      };
    });
  }, [cartItems, menuItems]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      id="cart-drawer"
      sx={{ minWidth: "300px", padding: "12px" }}
    >
      <Container>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ float: "right", marginRight: "-14px" }}
        >
          <CloseIcon />
        </IconButton>
        <h2>Cart Items</h2>
        {isLoading && (
          <CircularProgress
            sx={{ display: "block", margin: "auto", marginTop: "20px" }}
          />
        )}
        {error && (
          <Typography
            color="error"
            sx={{ textAlign: "center", marginTop: "20px" }}
          >
            Error loading cart items: {error.message}
          </Typography>
        )}
        {!error &&
          !isLoading &&
          userCartItems.map((item) => (
            <CartItemCard
              id={item.id}
              key={item.menuitem}
              title={item.title}
              price={item.price}
              quantity={item.quantity ?? 0}
            />
          ))}
        {!error && !isLoading && userCartItems.length === 0 && (
          <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
            Your cart is empty.
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={userCartItems.length === 0 || isPlacingOrder}
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
          onClick={handlePlaceOrder}
        >
          {isPlacingOrder ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Place Order"
          )}
        </Button>
      </Container>
    </Drawer>
  );
}
