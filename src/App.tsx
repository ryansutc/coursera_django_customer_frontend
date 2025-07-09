import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MainWrapper from "@components/main/mainwrapper";
import NavBar from "@components/navbar/navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@emotion/react";
import theme from "@utils/muitheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
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

          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
