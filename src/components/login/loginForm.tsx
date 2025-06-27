import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { zodiosAPI } from "@/api/axiosClient";
import { useStateContext } from "@/contexts";
import { useCartItems } from "@/hooks/useCartItems";
import { setToken } from "@/utils/tokenStore"; // Assuming you have a utility function to set the token
import { useState } from "react";

export default function LoginForm() {
  const { setUser, setPage, user } = useStateContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const useCartItemsQuery = useCartItems(user);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // we need to hit the REST API login endpoint

    if (username && password) {
      try {
        const response = await zodiosAPI.api_token_create(
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        );

        setToken(response.access);
        localStorage.setItem("username", username);
        setUser(username);
        setPage("menu");
        // After login w. success, lets also get the users' cart-items
        try {
          await useCartItemsQuery.refetch();
        } catch (e) {
          console.error("Failed to fetch cart items:", e);
          setError("Failed to fetch cart items.");
          return;
        }
      } catch (e) {
        console.error("Login failed:", e);
        setError("Invalid username or password.");
        return;
      }
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {isSignUp ? "Sign Up" : "Log In"}
          </Typography>
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {isSignUp ? "Signup" : "Login"}
            </Button>
            {!isSignUp ? (
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, cursor: "pointer" }}
              >
                Don't have an account?
                <span>
                  <Button onClick={() => setIsSignUp(true)}>Sign Up</Button>
                </span>
              </Typography>
            ) : (
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, cursor: "pointer" }}
              >
                Go back to
                <span>
                  <Button onClick={() => setIsSignUp(false)}>Log In</Button>
                </span>
              </Typography>
            )}
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
