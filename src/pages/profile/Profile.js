import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      toast.warn("Please login first");
    }
  });
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      {/* Left side - Circular Image */}
      <Grid item lg={6} md={8} xs={12}>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Avatar
            alt="Profile Image"
            src="/path/to/your/image.jpg"
            sx={{
              width: 200,
              height: 200,
              margin: "auto",
            }}
          />
          <Button
            variant="outlined"
            sx={{
              marginTop: 2,
            }}
          >
            Edit Picture
          </Button>
        </Box>
      </Grid>

      {/* Right side - Profile Card */}
      <Grid item lg={6} md={8} xs={12}>
  <Card
    variant="outlined"
    sx={{
      p: 0,
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)", // Shadow added
    }}
  >
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
          Your Profile
        </Typography>
      </Box>
      {/* Edit Button */}
      <Button
        variant="outlined"
        onClick={() => {
          // Add functionality for editing profile
          console.log("Edit profile clicked");
        }}
      >
        Edit
      </Button>
    </Box>
    <Divider />
    <CardContent
      sx={{
        padding: "30px",
      }}
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Name:</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            {/* Horizontal line added */}
            <Typography>Email:</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            <Typography>Date Created:</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            <Typography>Created by:</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            <Typography>Access control:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Ujjawal Yadav</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            <Typography>asdf@gmail.com</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            <Typography>12 October</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            <Typography>Admin</Typography>
            <Divider sx={{ margin: "8px 0" }} />
            <Typography>Limited</Typography>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  </Card>
</Grid>

    </Grid>
  );
};

export default Profile;
