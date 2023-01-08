import React from "react";
import { NavItemProps } from "./NavItem";
import {
  CheckCircleFilled,
  BookOutlined,
  EditOutlined,
  MediumWorkmarkOutlined,
  ToolFilled,
  EditFilled,
} from "@ant-design/icons";
import { useTheme } from "@mui/material";

const getMenuItems = (): NavItemProps["item"][] => {
  const theme = useTheme();
  const item: NavItemProps["item"] = {
    id: 1,
    title: "Orders",
    type: "group",
    children: [
      {
        id: 2,
        title: "Completed Orders",
        type: "item",
        icon: <CheckCircleFilled />,
      },
      {
        id: 3,
        title: "Ongoing Orders",
        type: "item",
        icon: <ToolFilled />,
      },
      {
        id: 4,
        title: "Drafts",
        type: "item",
        icon: <EditFilled />,
      },
    ],
    icon: <BookOutlined />,
  };
  return [item];
};

export default getMenuItems;
