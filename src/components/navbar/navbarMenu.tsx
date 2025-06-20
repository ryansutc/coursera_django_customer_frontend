import { useContext } from "react";

import { StateContext } from "@/contexts";
import {
  Button,
  Fade,
  styled,
} from "@mui/material";

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
}));

export default function NavBarMenu() {
  // page state
  const { cartItems, page, user, setPage, setUser, setCartOpen, cartOpen } =
    useContext(StateContext);

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
            {"Cart"}
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
          onClick={() => {
            if (user) {
              // Logout logic
              setUser(null);
            }
            setPage("login");
          }}
        >
          {user ? "Logout" : "Login"}
        </StyledButton>
      </Fade>
    </>
  );
}
