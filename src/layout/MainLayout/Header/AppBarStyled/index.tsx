import { AppBar, useTheme } from "@mui/material";
import React from "react";

type AppBarStyledProps = {
  open: boolean;
  children: JSX.Element;
};

const AppBarStyled = ({ open, children }: AppBarStyledProps) => {
  const theme = useTheme();
  const drawerWidth = 100;
  const styles = open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
  return (
    <>
      <AppBar
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
        {...styles}
      >
        {children}
      </AppBar>
    </>
  );
};

export default AppBarStyled;
