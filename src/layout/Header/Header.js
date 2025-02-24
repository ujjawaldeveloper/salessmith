import React, { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginRegister from "../../pages/loginregister/LoginRegister";
import {toast} from "react-toastify"

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";

import userimg from "../../assets/images/user.jpg";

const Header = (props) => {
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setOpenModal(true);
    setAnchorEl4(false);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const tokencheck = localStorage.getItem("token");
    if (tokencheck) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [token]);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm("Are you sure to Logout?");
    if (!token) {
      toast.success("Already logged out");
    } else if(confirm){
      localStorage.removeItem("token");
      toast.success("Logged out Successfully");
      setToken(false);
      navigate("/");
    }
  };

  const tokencheck = (e) => {
    setToken(e);
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          <Typography
            sx={{ cursor: "pointer" }}
            variant="h1"
            component="span"
            onClick={() => navigate("/")}
          >
            SalesSmith{" "}
          </Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            variant="h4"
            component="span"
            onClick={() => navigate("/")}
          >
            Optic
          </Typography>
        </Typography>
        {token ? (
          <>
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleClick4}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={userimg}
                  alt={userimg}
                  sx={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </Box>
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl4}
              keepMounted
              open={Boolean(anchorEl4)}
              onClose={handleClose4}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              sx={{
                "& .MuiMenu-paper": {
                  width: "250px",
                  right: 0,
                  top: "70px !important",
                },
              }}
            >
              <MenuItem
                component={NavLink}
                to={"/profile"}
                onClick={handleClose4}
              >
                <Avatar
                  sx={{
                    width: "35px",
                    height: "35px",
                  }}
                />
                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  My Profile
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem
                component={NavLink}
                to={"/configurations"}
                onClick={handleClose4}
              >
                <ListItemIcon>
                  <AdminPanelSettingsIcon fontSize="small" />
                </ListItemIcon>
                Upload Configurations
              </MenuItem>
              <MenuItem
                component={NavLink}
                to={"/changepassword"}
                onClick={handleClose4}
              >
                <ListItemIcon>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
      <LoginRegister
        open={openModal}
        onClose={handleModalClose}
        tokencheck={tokencheck}
      />
    </AppBar>
  );
};

export default Header;
