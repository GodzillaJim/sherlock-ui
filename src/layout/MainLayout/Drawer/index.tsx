import React from "react";
import { Person3 } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import { HomeFilled } from "@ant-design/icons";
import { useRouter } from "next/router";

type CustomDrawerProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const CustomDrawer = ({ open, handleDrawerToggle }: CustomDrawerProps) => {
  const drawerWidth = open ? 250 : 0;
  const theme = useTheme();
  const router = useRouter();
  const handleNavigation = async (url: string) => {
    await router.push(url);
  };

  const isActive = (url: string) => {
    return router.pathname === url;
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "60px",
          padding: 2,
        },
        transition: "width 0.5s ease-out",
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <DrawerHeader />
      <Divider />
      <List>
        {[
          {
            id: 1,
            title: "Home",
            type: "item",
            icon: <HomeFilled />,
            url: "/app",
          },
          {
            id: 2,
            title: "My Profile",
            type: "item",
            icon: <Person3 />,
            url: "/app/profile",
          },
        ].map((item) => (
          <ListItem
            key={item.title}
            disablePadding
            onClick={() => {
              if (item.url) {
                handleNavigation(item.url);
              }
            }}
          >
            <ListItemButton
              sx={{
                color: isActive(item.url)
                  ? theme.palette.primary.dark
                  : "inherit",
                bgcolor: isActive(item.url) ? theme.palette.divider : "inherit",
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.url)
                    ? theme.palette.primary.dark
                    : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
