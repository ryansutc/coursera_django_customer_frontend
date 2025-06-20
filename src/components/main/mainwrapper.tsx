import { useContext } from "react";

import { StateContext } from "@/contexts";
import { useCartOpenOnChange } from "@/hooks/cartOpen";
import { Grid } from "@mui/material";

import CartDrawer from "../cart/cartDrawer";
import LoginForm from "../login/loginForm";
import MenuList from "../menuitems/menulist";

export default function MainWrapper() {
  // page state
  
  const { page, user, cartItems, cartOpen, setCartOpen } = useContext(StateContext);
  useCartOpenOnChange(cartItems, setCartOpen);
  return (
    <Grid
      id="rootWrapper"
      container
      spacing={2}
      justifyContent="center"
      style={{ width: "100%" }}
      size={12}
    >
      {page === "menu" ? <MenuList /> : <LoginForm />}
      {page === "menu" ? (
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      ) : null}
    </Grid>
  );
}
