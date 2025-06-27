import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainWrapper from "@components/main/mainwrapper";
import NavBar from "@components/navbar/navbar";
import { ThemeProvider } from "@emotion/react";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "@utils/muitheme";
import { useState } from "react";
import { StateContext } from "./contexts";
import type { PageType } from "./types/state_types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  const [page, setPage] = useState<PageType>("menu" as PageType);
  const [cartOpen, setCartOpen] = useState(false);

  const [user, setUser] = useState<string | null>(null);
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StateContext.Provider
            value={{
              cartOpen,
              page,
              setCartOpen,
              setPage,
              setUser,
              user,
            }}
          >
            <Container
              maxWidth="md"
              component="main"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: {
                  md: 8,
                  sm: 6,
                  xs: 5,
                },
                my: 16,
              }}
            >
              <NavBar />
              <MainWrapper />
            </Container>
          </StateContext.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
