import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      toast.warn("Please login first");
    }
  });

  const handleTogglePassword = (passwordType) => {
    switch (passwordType) {
      case "current":
        setShowCurrentPassword((prevShow) => !prevShow);
        break;
      case "new":
        setShowNewPassword((prevShow) => !prevShow);
        break;
      case "confirm":
        setShowConfirmPassword((prevShow) => !prevShow);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      } else if (oldPassword=== newPassword) {
        toast.error("Old password and new password cannot be same");
        return;
      }
      const res = await axios.put(
        "/v1/changepassword",
        { oldPassword, newPassword },
        {
          headers: { token: token },
        }
      );
      console.log(res.data);
      toast.success("Password changed successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container spacing={0} alignItems="center" justifyContent="center">
      <Grid item lg={6} md={8} xs={12}>
        <Card variant="outlined" sx={{ p: 0 }}>
          <Box
            sx={{
              padding: "15px 30px",
            }}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Change Your Profile Password
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ padding: "30px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiTextField-root": { mb: 2, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="current-password"
                    label="Current password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={oldPassword}
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePassword("current")}
                            edge="end"
                          >
                            {showCurrentPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    id="new-password"
                    label="New password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePassword("new")}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    id="confirm-new-password"
                    label="Re-enter new password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePassword("confirm")}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </form>
              </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
