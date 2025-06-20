import {
  useContext,
  useState,
} from "react";

import { StateContext } from "@/contexts";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginForm() {
  const { setUser, setPage } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any login for now
    if (username && password) {
      setUser({ username });
      setPage("menu");
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
          <form onSubmit={handleSubmit}>
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
