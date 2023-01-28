import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import HeaderContent from "./HeaderContent";

type HeaderProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const Header = ({ open, handleDrawerToggle }: HeaderProps) => {
  const theme = useTheme();

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
          minHeight: 40,
          minWidth: 40,
        }}
      >
        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </IconButton>
      <HeaderContent />
    </Toolbar>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        {mainHeader}
      </AppBar>
    </>
  );
};

export default Header;
