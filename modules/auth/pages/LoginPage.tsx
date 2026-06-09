import { useState, FormEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
} from "@mui/material";
import { Visibility, VisibilityOff, AlternateEmail, LockOutlined } from "@mui/icons-material";
import api from "../../../app/axios/instance";
import { User } from "../../../common/types";
import { useTheme } from "../../../src/design-system/hooks/useTheme";

interface LoginProps {
  onLoginSuccess: (user: User, token: string) => void;
  switchToRegister: () => void;
}

export default function LoginPage({ onLoginSuccess, switchToRegister }: LoginProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { identifier, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user, token);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="fade-in"
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.border} 100%)`,
        padding: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            padding: 4,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ letterSpacing: "-0.5px", mb: 1 }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Sign in to access your secure notes workspace
          </Typography>
        </Box>

        <CardContent sx={{ padding: 4 }}>
          {error && (
            <Fade in={!!error}>
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            </Fade>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username or Email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmail sx={{ color: "text.secondary", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "text.secondary", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
                mb: 3,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                borderRadius: 3,
                padding: "12px",
                textTransform: "none",
                fontWeight: "600",
                fontSize: "1rem",
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                boxShadow: `0 4px 14px rgba(79, 70, 229, 0.4)`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.colors.primaryHover} 0%, ${theme.colors.secondaryHover} 100%)`,
                },
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Button
                variant="text"
                onClick={switchToRegister}
                sx={{
                  textTransform: "none",
                  fontWeight: "600",
                  padding: 0,
                  minWidth: "auto",
                  color: theme.colors.primary,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
