import { Edit, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  darken,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NextLink from "next/link";

const navItems = [
  { label: "Demo", url: "/demo" },
  { label: "Blog", url: "/blog" },
];

const RegisterButton = styled(Button)(({ theme }) =>`
  background-color: ${theme.palette.background.default};
  color: ${theme.palette.getContrastText(theme.palette.background.default)};
  border-radius: 50px;
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};
  text-transform: none;

  &:hover {
    background-color: ${darken(theme.palette.background.default, 0.2)};
    color: ${theme.palette.getContrastText(darken(theme.palette.background.default, 0.2))};
  }
`);

const LoginButton = styled(Button)(({ theme }) => `
  border: 1px solid ${theme.palette.background.default};
  border-radius: 50px;
  color: ${theme.palette.getContrastText(theme.palette.primary.main)};
  text-transform: none;
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};

  &:hover {
    background-color: ${darken(theme.palette.primary.dark, 0.2)};
    color: ${theme.palette.getContrastText(darken(theme.palette.primary.dark, 0.2))};
  }
`);

const drawerWidth = 240;

const CustomNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sherlock
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          return (
            <ListItem key={item.label} disableGutters disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ background: 'transparent' }} elevation={0}>
        <Toolbar sx={{ maxWidth: "xl", mx:'auto', width:'100%', my: 3 }}>
          <Box display={"flex"} justifyContent={"space-between"} width="100%">
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <Menu />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Sherlock
              </Typography>
            </div>
            <div>
              <Box display="flex" gap={2}>
                <div>
                  <NextLink
                    href={"/auth/register?next=/app"}
                    legacyBehavior
                    passHref
                  >
                    <RegisterButton size="large" >Sign up</RegisterButton>
                  </NextLink>
                </div>
                <div>
                  <NextLink
                    href={"/auth/login?next=/app"}
                    legacyBehavior
                    passHref
                  >
                    <LoginButton size="large" >Sign in</LoginButton>
                  </NextLink>
                </div>
              </Box>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default CustomNavbar;
