import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {toast} from "react-toastify"

const LoginRegister = ({ open, onClose, tokencheck }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Set loading state to true on login button click
      const response = await axios.post("v1/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("You are logged in successfully");
      onClose();
      tokencheck(true);
      navigate("/users");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false); // Reset loading state after API response
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true); // Set loading state to true on register button click
      await axios.post("/v1/register", {
        name,
        email,
        password,
      });
      toast.success("You are registered successfully. Login now");
      setIsLogin(true);
    } catch (error) {
      toast.error("Email already exists");
    } finally {
      setIsLoading(false); // Reset loading state after API response
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle
        sx={{ textAlign: "center", position: "relative", fontSize: "2rem" }}
      >
        {isLogin ? "Login" : "Register"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {!isLogin && (
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            autoFocus={!isLogin}
            margin="normal"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <Typography variant="body2" color="textSecondary">
              Password must be at least 8 characters long
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Typography variant="body2" color="textSecondary">
            {isLogin ? "Don't have an account? " : "Already a user? "}
            <Button onClick={toggleForm} color="primary">
              {isLogin ? "Register Now" : "Login Now"}
            </Button>
          </Typography>
        </DialogActions>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            sx={{ paddingX: "4rem", borderRadius: "2rem" }}
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? <CircularProgress size={24} /> : isLogin ? "Login" : "Register"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginRegister;
