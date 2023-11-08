import { Box, BoxProps, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { MainContext } from "../../Context/MainContext";
import Header from "./Header";
import CustomDrawer from "./Drawer";
import { useRouter } from "next/router";

interface ContentProps extends BoxProps {
  drawerIsOpen: boolean;
}

const Content = styled(Box)<ContentProps>`
  top: ${({ theme }) => theme.spacing(5)};
  display: block;
  position: relative;
  transition: width 0.5s ease-out;
`;

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const mainContext = useContext(MainContext);
  const router = useRouter();

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
      <Content
        drawerIsOpen={Boolean(mainContext?.layout.drawerIsOpen)}
        component="main"
        sx={{ width: "100%", p: { xs: 2, sm: 3 } }}
      >
        {children}
      </Content>
    </Box>
  );
};

export default MainLayout;
