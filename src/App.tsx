import "./App.css";

import { useState } from "react";

import MainWrapper from "@components/main/mainwrapper";
import NavBar from "@components/navbar/navbar";
import { ThemeProvider } from "@emotion/react";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@utils/muitheme";

import { StateContext } from "./contexts";

function App() {
  const [page, setPage] = useState("menu");
  const [cartItems, setCartItems] = useState<
    { id: number; quantity: number }[] | []
  >([]);

  const [cartOpen, setCartOpen] = useState(false);

  const [user, setUser] = useState(null);
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <StateContext
          value={{
            cartItems,
            page,
            setPage,
            user,
            setUser,
            setCartItems,
            cartOpen,
            setCartOpen,
          }}
        >
          <Container
            maxWidth="md"
            component="main"
            sx={{
              display: "flex",
              flexDirection: "column",
              my: 16,
              gap: { xs: 5, sm: 6, md: 8 },
            }}
          >
            <NavBar />
            <MainWrapper />
          </Container>
        </StateContext>
      </ThemeProvider>
    </>
  );
}

export default App;
