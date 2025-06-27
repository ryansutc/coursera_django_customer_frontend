import { useStateContext } from "@/contexts";
import { useCartOpenOnChange } from "@/hooks/cartOpen";
import { useCartItems } from "@/hooks/useCartItems";
import useUserInfo from "@/hooks/userInfo";
import { Grid } from "@mui/material";
import CartDrawer from "../cart/cartDrawer";
import LoginForm from "../login/loginForm";
import MenuList from "../menuitems/menulist";

export default function MainWrapper() {
  // page state

  const { page, user, cartOpen, setCartOpen, setUser } = useStateContext();
  const { data: cartItems = [] } = useCartItems(user);

  useCartOpenOnChange(cartItems, setCartOpen);
  useUserInfo(user, setUser);
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
        <CartDrawer
          open={cartOpen}
          onClose={() => {
            // I want to first save any changed cart item values back to the server
            setCartOpen(false);
          }}
        />
      ) : null}
    </Grid>
  );
}
