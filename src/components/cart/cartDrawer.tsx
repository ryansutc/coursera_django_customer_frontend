import type { CartItemType, MenuItemType } from "@/types/django_api_types";
import { Container, Drawer, IconButton, CircularProgress, Typography } from "@mui/material";

import CartItemCard from "./cartItemCard";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo } from "react";
import { useStateContext } from "@/contexts";
import { useCartItems } from "@/hooks/useCartItems";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { menuItems } = useStateContext();
  const { data: cartItems = [], isLoading, error } = useCartItems();

  type UserCartItemType = CartItemType & Pick<MenuItemType, "title" | "price">;
  const handleClose = () => {
    onClose(); // Call the onClose function passed as a prop
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
            sx={{ display: "block", margin: "auto", marginTop: "20px" } } />)}
        {error && (
          <Typography color="error" sx={{ textAlign: "center", marginTop: "20px" }}>
            Error loading cart items: {error.message}
          </Typography>
        )}
        {!error && !isLoading && userCartItems.map((item) => (
          <CartItemCard
            id={item.id}
            key={item.menuitem}
            title={item.title}
            price={item.price}
            quantity={item.quantity ?? 0}
          />
        ))}
      </Container>
    </Drawer>
  );
}
