import React from "react";
import { Inbox, Mail } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import NavItem from "./MenuItems/NavItem";
import { MailFilled } from "@ant-design/icons";
import getMenuItems from "./MenuItems";
import NavGroup from "./MenuItems/NavGroup";

type CustomDrawerProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const CustomDrawer = ({ open, handleDrawerToggle }: CustomDrawerProps) => {
  const drawerWidth = 250;
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
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <DrawerHeader />
      <Divider />
      <List>
        {getMenuItems().map((menuItem) => (
          <NavGroup item={menuItem} key={`navItem-${menuItem.id}`} />
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
