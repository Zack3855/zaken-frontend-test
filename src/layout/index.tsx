import { useState } from "react";
import SideBar from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AxiosWrapper from "@/AxiosWrapper";
import { useAuth } from "@/context/authContext";

function Layout() {
  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);
  const domainId = localStorage.getItem("domainId");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {
    authState: { accessToken },
  } = useAuth();
  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!domainId) return <Navigate to="/choose-domain" replace />;

  return (
    <AxiosWrapper>
      <Box component="main">
        <SideBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
        <Box
          sx={{ paddingLeft: { xs: 3, sm: 33 } }}
          paddingTop={5}
          paddingRight={3}
        >
          <Outlet />
        </Box>
      </Box>
    </AxiosWrapper>
  );
}

export default Layout;
