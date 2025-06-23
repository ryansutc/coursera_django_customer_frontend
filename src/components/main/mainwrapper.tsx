import CartDrawer from "../cart/cartDrawer";
import { Grid } from "@mui/material";
import LoginForm from "../login/loginForm";
import MenuList from "../menuitems/menulist";
import { useCartOpenOnChange } from "@/hooks/cartOpen";
import { useStateContext } from "@/contexts";
import useUserInfo from "@/hooks/userInfo";

export default function MainWrapper() {
  // page state

  const {
    page,
    user,
    cartItems,
    cartOpen,
    setCartItems,
    setCartOpen,
    setUser,
  } = useStateContext();
  useCartOpenOnChange(cartItems, setCartOpen);
  useUserInfo(user, setUser, setCartItems);
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
