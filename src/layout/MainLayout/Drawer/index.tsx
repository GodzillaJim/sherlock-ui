import React from "react";
import {
  CancelOutlined,
  Check,
  Drafts,
  HomeWorkOutlined,
  MailOutline,
  NoteOutlined,
  PunchClock,
} from "@mui/icons-material";
import { Divider, Drawer, List, useMediaQuery, useTheme } from "@mui/material";
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
    type: "item",
    icon: <NoteOutlined />,
    url: "/admin",
  },
  {
    id: 2,
    title: "Emails",
    type: "item",
    icon: <MailOutline />,
    url: "/admin/mail",
  },
];

const navItems: NavItemProps["item"][] = [
  {
    id: 1,
    title: "Home",
    icon: <HomeWorkOutlined/>,
    url: "/app",
    type:"item"
  },
  {
    id: 2,
    title: "Projects",
    type: "group",
    icon: <NoteOutlined />,
    children: [
      {
        id: 2.1,
        title: "Drafts",
        type: "item",
        icon: <Drafts />,
        url: "/app/drafts",
      },
      {
        id: 2.2,
        title: "Active",
        type: "item",
        icon: <PunchClock />,
        url: "/app/published",
      },
      {
        id: 2.3,
        title: "Completed",
        type: "item",
        url: "/app/complete",
        icon: <Check />,
      },
      {
        id: 2.4,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      variant={isMobile ? "temporary": "persistent"}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}

    >
      <Divider />
      <List>
        {menu.map((item) => (
          <NavGroup item={item} key={`nav-item-${item.id}`} />
        ))}
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
