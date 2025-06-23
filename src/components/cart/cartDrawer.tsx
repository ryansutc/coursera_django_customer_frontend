import type { CartItemType, MenuItemType } from "@/types/django_api_types";
import { Container, Drawer, IconButton } from "@mui/material";

import CartItemCard from "./cartItemCard";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo } from "react";
import { useStateContext } from "@/contexts";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cartItems, menuItems } = useStateContext();

  type UserCartItemType = CartItemType & Pick<MenuItemType, "title" | "price">;
  const handleClose = () => {
    onClose(); // Call the onClose function passed as a prop
  };
  const userCartItems: UserCartItemType[] | [] = useMemo(() => {
    // This effect can be used to perform any side effects when cartItems or menuItems change
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
      open={open} // This should be controlled by a state variable
      onClose={onClose} // This should be a function to close the drawer
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
        {userCartItems.map((item) => (
          <CartItemCard
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
