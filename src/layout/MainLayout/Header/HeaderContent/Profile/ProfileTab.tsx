import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

import {
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

type ProfileTabProps = {
  handleLogout: () => void;
};

const ProfileTab = ({ handleLogout }: ProfileTabProps) => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  return (
    <List
      component={"nav"}
      sx={{
        p: 0,
        "&. MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => {
          handleListItemClick(event, 4);
          handleLogout();
        }}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
