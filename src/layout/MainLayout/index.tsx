import { Box, BoxProps, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import { MainContext } from "../../Context/MainContext";
import Header from "./Header";
import CustomDrawer from "./Drawer";

interface ContentProps extends BoxProps {
  drawerIsOpen: boolean;
}

const Content = styled(Box)<ContentProps>`
  flex-grow: 1;
  top: ${({ theme }) => theme.spacing(5)};
  display: block;
  position: relative;
  transition: margin-left ${({ theme  }) => theme.transitions.duration.standard}ms;
  transition: width ${({ theme  }) => theme.transitions.duration.standard}ms;
`;

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const mainContext = useContext(MainContext);

  const open = useMemo(() => mainContext?.layout.drawerIsOpen || false, [mainContext?.layout.drawerIsOpen])

  const setOpen = (value: boolean) => {
    mainContext?.layout.setDrawerIsOpen(value)
  }

  const handleDrawerToggle = () => {
    mainContext?.layout.setDrawerIsOpen(!open);
  };

  useEffect(() => {
    setOpen(!matchDownLG);
    mainContext?.layout.setDrawerIsOpen(!matchDownLG);
  }, [matchDownLG]);


  const drawerWidth = useMemo(() => open ? 250 : 0, [open])

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <CustomDrawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Content
        drawerIsOpen={Boolean(mainContext?.layout.drawerIsOpen)}
        component="main"
        sx={{
          p: { xs: 1, sm: 3 },
          display: "flex",
          flexDirection: "column",
          marginLeft: { md: `${drawerWidth}px` },
        }}
      >
        {children}
      </Content>
    </Box>
  );
};

export default MainLayout;
