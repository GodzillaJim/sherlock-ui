import {
  CommentOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React from "react";

const SettingsTab = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
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
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Account Settings" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton>
    </List>
  );
};

export default SettingsTab;
