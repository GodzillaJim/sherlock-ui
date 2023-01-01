import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MainContext } from "../../Context/MainContext";
import Header from "./Header";
import CustomDrawer from "./Drawer";

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const mainContext = useContext(MainContext);

  const [open, setOpen] = React.useState<boolean>(
    Boolean(mainContext?.layout.drawerIsOpen)
  );

  const handleDrawerToggle = () => {
    setOpen(!open);
    mainContext?.layout.setDrawerIsOpen(!open);
  };

  useEffect(() => {
    setOpen(!matchDownLG);
    mainContext?.layout.setDrawerIsOpen(!matchDownLG);
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== mainContext?.layout.drawerIsOpen) {
      setOpen(Boolean(mainContext?.layout.drawerIsOpen));
    }
  }, [mainContext?.layout.drawerIsOpen]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <CustomDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ width: "100%", flexGrow: "1", p: { xs: 2, sm: 3 } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
