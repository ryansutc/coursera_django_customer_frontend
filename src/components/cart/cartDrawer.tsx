import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import type { CartItem, MenuItem } from "@/types/django_api_types";
import { useMemo, useState } from "react";

import CartItemCard from "./cartItemCard";
import CloseIcon from "@mui/icons-material/Close";
import { useCartItems } from "@/hooks/useCartItems";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/state/store";
import { zodiosAPI } from "@/api/axiosClient";

export default function CartDrawer({
  open,
  onClose,
  setShowSuccessToast,
}: {
  open: boolean;
  onClose: () => void;
  setShowSuccessToast: (show: boolean) => void;
}) {
  const user = useStore((state) => state.user);
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

  type UserCartItem = CartItem & Pick<MenuItem, "title" | "price">;
  const handleClose = () => {
    onClose(); // Call the onClose function passed as a prop
  };

  const handlePlaceOrder = async () => {
    try {
      setIsPlacingOrder(true);
      await zodiosAPI.api_checkout(undefined);

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
  const userCartItems: UserCartItem[] | [] = useMemo(() => {
    // Keep the list of cart items in sync.
    return cartItems.map((cartItem) => {
      const menuItem = menuItems.find((item) => item.id === cartItem.menuitem);
      if (!menuItem) {
        throw new Error(`Menu item with ID ${cartItem.menuitem} not found`);
      }
      return {
        ...cartItem,
        price: menuItem.price,
        title: menuItem.title,
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
            sx={{
              marginTop: "20px",
              textAlign: "center",
            }}
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
          <Typography
            sx={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Your cart is empty.
          </Typography>
        )}
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid size={6}>
            <Typography variant="h6">Total:</Typography>
          </Grid>
          <Grid size={6} textAlign="right">
            <Typography variant="h6">
              {userCartItems.reduce(
                (total, item) =>
                  total + (parseFloat(item.price) ?? 0) * (item.quantity ?? 0),
                0
              )}{" "}
              USD
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={userCartItems.length === 0 || isPlacingOrder}
          sx={{
            marginBottom: "20px",
            marginTop: "20px",
          }}
          onClick={() => void handlePlaceOrder()}
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
