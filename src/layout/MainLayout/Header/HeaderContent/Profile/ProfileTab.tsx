import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  Logout,
  ModeEditOutline,
  PersonOutline,
  WalletRounded,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAuth } from "../../../../../Context/AuthManager";
import { isAdmin } from "../../../../../helpers/User";

type ProfileTabProps = {
  handleLogout: () => void;
};

const ProfileTab = ({ handleLogout }: ProfileTabProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handlePathChange = (path: string) => {
    router.push(path);
  };

  const auth = useAuth();
  const userIsAdmin = auth.localUser ? isAdmin(auth.localUser) : false;

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
          <ModeEditOutline />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <PersonOutline />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <WalletRounded />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton>
      {userIsAdmin && (
        <ListItemButton onClick={() => handlePathChange("/admin")}>
          <ListItemIcon>
            <AdminPanelSettingsOutlined />
          </ListItemIcon>
          <ListItemText primary={"Admin"} />
        </ListItemButton>
      )}
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => {
          handleListItemClick(event, 4);
          handleLogout();
        }}
      >
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
