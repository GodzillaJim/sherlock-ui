import React from "react";
import { Check, Drafts, NoteAddOutlined, NoteOutlined, Person3, QuestionAnswer } from "@mui/icons-material";
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
import NavGroup from "./MenuItems/NavGroup";
import { NavItemProps } from "./MenuItems/NavItem";

type CustomDrawerProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const navItems: NavItemProps["item"][] = [{
  id: 1,
  title: "Projects",
  type: "group",
  icon: <NoteOutlined/>,
  url: "/app",
  children: [
    {
      id: 1.1,
      title: "Drafts",
      type:"item",
      icon: <Drafts/>,
      url: "/app/drafts"
    },
    {
      id: 1.2,
      title: "Active",
      type:"item",
      icon: <Check/>,
      url: "/app/published"
    },
    {
      id: 2,
      title: "Responses",
      type:"item",
      url: "/app/responses",
      icon: <QuestionAnswer/>
    }
  ] 
}]

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
      <Divider />
      <List>
        {navItems.map((item) => (
          <NavGroup item={item} key={`nav-item-${item.id}`} />
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
