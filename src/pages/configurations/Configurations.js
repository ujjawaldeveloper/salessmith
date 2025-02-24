import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Configurations = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      toast.warn("Please login first");
    }
  });
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h3">Configure Upload Paths</Typography>
        <Box
          sx={{
            overflow: {
              xs: "auto",
              sm: "unset",
            },
          }}
        >
          <Grid container spacing={2}>
            {[
              "Zoom Info",
              "Intent",
              "Hotlead",
              "Accounts",
              "MAL",
              "Product",
              "User TPID",
            ].map((index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 0,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                    padding: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    {index}
                  </Typography>
                  <Divider />
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography> FolderName:</Typography>
                        <Typography>FileName:</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Configurations;
