import React from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "./assets/global/Theme-variable";
import Themeroutes from "./routes";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "https://salessmith-api.onrender.com"
const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>;
};
export default App;
