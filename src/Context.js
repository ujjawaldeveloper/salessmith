import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const AppContext = createContext();
export function AppProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [trigger, setTrigger] = useState(0)
  // const [configs, setConfigs] = useState(null);
  // const [driveToken, setDriveToken] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }
        const response = await axios.get("/v1/userlist", {
          headers: { token: token },
        });
        console.log(response)
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [trigger]);
  return (
    <AppContext.Provider
      value={{
        userData,setUserData, trigger, setTrigger
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
