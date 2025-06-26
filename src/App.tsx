import "./App.css";

import type { CartItemType, MenuItemType } from "@/types/django_api_types";

import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MainWrapper from "@components/main/mainwrapper";
import NavBar from "@components/navbar/navbar";
import type { PageType } from "./types/state_types";
import { StateContext } from "./contexts";
import { ThemeProvider } from "@emotion/react";
import theme from "@utils/muitheme";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const [page, setPage] = useState<PageType>("menu" as PageType);
  const [cartItems, setCartItems] = useState<CartItemType[] | []>([]);
  const [menuItems, setMenuItems] = useState<MenuItemType[] | []>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [user, setUser] = useState<string | null>(null);
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StateContext.Provider
            value={{
              cartItems,
              menuItems,
              setMenuItems,
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
          </StateContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
