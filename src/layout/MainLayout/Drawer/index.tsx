import React, { useEffect } from "react";
import {
  CancelOutlined,
  Check,
  Drafts,
  Newspaper,
  NoteOutlined,
  PunchClock,
} from "@mui/icons-material";
import { Divider, Drawer, List } from "@mui/material";
import { useRouter } from "next/router";
import NavGroup from "./MenuItems/NavGroup";
import { NavItemProps } from "./MenuItems/NavItem";

type CustomDrawerProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const adminItems: NavItemProps["item"][] = [
  {
    id: 1,
    title: "Orders",
    type: "group",
    icon: <NoteOutlined />,
    url: "/admin",
    children: [
      {
        id: 1.1,
        title: "New",
        type: "item",
        icon: <Newspaper />,
        url: "/admin/new",
      },
    ],
  },
];

const navItems: NavItemProps["item"][] = [
  {
    id: 1,
    title: "Projects",
    type: "group",
    icon: <NoteOutlined />,
    url: "/app",
    children: [
      {
        id: 1.1,
        title: "Drafts",
        type: "item",
        icon: <Drafts />,
        url: "/app/drafts",
      },
      {
        id: 1.2,
        title: "Active",
        type: "item",
        icon: <PunchClock />,
        url: "/app/published",
      },
      {
        id: 2,
        title: "Completed",
        type: "item",
        url: "/app/complete",
        icon: <Check />,
      },
      {
        id: 3,
        title: "Canceled",
        type: "item",
        url: "/app/canceled",
        icon: <CancelOutlined />,
      },
    ],
  },
];

const CustomDrawer = ({ open, handleDrawerToggle }: CustomDrawerProps) => {
  const drawerWidth = open ? 250 : 0;
  const router = useRouter();
  const regex = /^\/admin(\/.*)?$/;
  const isAdmin = regex.test(router.pathname);

  const menu = isAdmin ? adminItems : navItems;

  useEffect(() => {
    console.log("Menu: ", { menu, regex, isAdmin, path: router.pathname });
  });

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
        {menu.map((item) => (
          <NavGroup item={item} key={`nav-item-${item.id}`} />
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
