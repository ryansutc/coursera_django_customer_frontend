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
  const { page, user, setPage } = useContext(StateContext);

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

      <Fade in timeout={300}>
        <StyledButton
          variant="text"
          color="primary"
          sx={{
            color: page === "login" ? "primary.main" : "primary.dark",
          }}
          onClick={() => setPage("login")}
        >
          {user ? "Logout" : "Login"}
        </StyledButton>
      </Fade>
    </>
  );
}
