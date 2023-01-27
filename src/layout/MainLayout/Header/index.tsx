import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";

type HeaderProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const Header = ({ open, handleDrawerToggle }: HeaderProps) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  const iconBackColor = "grey.100";
  const iconBackColorOpen = "grey.200";

  const mainHeader = (
    <Toolbar>
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        sx={{
          color: "text.primary",
          bgColor: open ? iconBackColorOpen : iconBackColor,
          ml: { xs: 0, lg: -2 },
        }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          {mainHeader}
        </AppBar>
      )}
    </>
  );
};

export default Header;
