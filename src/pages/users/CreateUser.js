import React, { useState } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Grid,
  Switch,
  FormGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../Context";
import {toast} from "react-toastify"

const CreateUser = () => {
  const navigate = useNavigate();
  const { trigger, setTrigger } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    description: "",
    status: true,
    isCustomer: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }
      const res = await axios.post("/v1/user", formData, {
        headers: { token: token },
      });
      console.log(res.data);
      toast.success("User created successfully");
      navigate("/users");
      setTrigger(trigger + 1);
    } catch (error) {
      console.log(error);
      toast.error("Failed, e-mail already exists");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container spacing={0} alignItems="center" justifyContent="center">
      <Grid item lg={6} md={8} xs={12}>
        <div>
          <Card variant="outlined" sx={{ p: 0 }}>
            <Box
              sx={{ padding: "15px 30px" }}
              display="flex"
              alignItems="center"
            >
              <Box flexGrow={1}>
                <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                  Create a New User
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
                    id="name"
                    label="Full name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    inputProps={{ maxLength: 17 }}
                  />
                  <TextField
                    id="email"
                    label="User email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <TextField
                    id="profession"
                    label="User profession"
                    type="text"
                    required
                    value={formData.profession}
                    onChange={handleChange}
                    inputProps={{ maxLength: 17 }}
                  />
                  <TextField
                    id="description"
                    label="User needs"
                    type="text"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    inputProps={{ maxLength: 25 }}
                  />
                  <FormGroup
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          id="isCustomer"
                          defaultChecked={formData.isCustomer}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isCustomer: e.target.checked,
                            })
                          }
                        />
                      }
                      label="Customer Status"
                      sx={{ width: 200 }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          id="status"
                          defaultChecked={formData.status}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              status: e.target.checked,
                            })
                          }
                        />
                      }
                      label="Activity Status"
                      sx={{ width: 200 }}
                    />
                  </FormGroup>
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
        </div>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
