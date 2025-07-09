import { Alert, Grid, Snackbar } from "@mui/material";

import CartDrawer from "../cart/cartDrawer";
import LoginForm from "../login/loginForm";
import MenuList from "../menuitems/menulist";
import { useCartItems } from "@/hooks/useCartItems";
import { useCartOpenOnChange } from "@/hooks/cartOpen";
import { useState } from "react";
import { useStore } from "@/state/store";
import useUserInfo from "@/hooks/userInfo";

export default function MainWrapper() {
  // page state

  const { page, user, cartOpen, setCartOpen, setUser } = useStore();
  const { data: cartItems = [] } = useCartItems(user);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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
          setShowSuccessToast={setShowSuccessToast}
        />
      ) : null}
      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
