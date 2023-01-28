import React from "react";
import { NavItemProps } from "./NavItem";
import {
  CheckCircleFilled,
  BookOutlined,
  ToolFilled,
  EditFilled,
} from "@ant-design/icons";

const getMenuItems = (): NavItemProps["item"][] => {
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
