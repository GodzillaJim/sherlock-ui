import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useAuth } from "../../../../../Context/AuthManager";
import Image from "next/image";
import { AdminPanelSettings, LogoutRounded } from "@mui/icons-material";
import { isAdmin } from "../../../../../helpers/User";
import { useRouter } from "next/router";

const Profile = () => {
  const isClientSide = typeof window !== undefined;
  const { signOut } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const auth = useAuth();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const user = useMemo(() => {
    if (auth?.localUser) return auth?.localUser;
    return null;
  }, [auth]);

  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    signOut && signOut();
  };
  const iconBackColorOpen = `grey.300`;
  const profilePic = user?.picture || auth.user?.photoURL;

  const displayName = useMemo(() => {
    if (user && user.firstName) {
      return user.firstName;
    }
    return auth.user?.displayName;
  }, [auth, user]);


  const handleAdmin = () => {
    router.push('/admin')
  }

  return (
    <>
      {!isClientSide && <div />}
      {isClientSide && (
        <>
          <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
              <ButtonBase
                sx={{
                  p: 0.25,
                  bgcolor: open ? iconBackColorOpen : "transparent",
                  borderRadius: 1,
                  "&:hover": { bgcolor: "secondary.lighter" },
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? "profile-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                component={Box}
                role={"button"}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    px: 1,
                    py: 0.5,
                    ":hover": { color: theme.palette.primary.dark },
                  }}
                >
                  <Avatar alt="profile user" sx={{ width: 32, height: 32 }}>
                    {user && profilePic ? (
                      <Image
                        width={32}
                        height={32}
                        src={profilePic}
                        alt={"profile user"}
                      />
                    ) : (
                      <Avatar />
                    )}
                    {!profilePic && <Avatar />}
                  </Avatar>
                  <Typography color="inherit" variant="subtitle1">
                    {displayName}
                  </Typography>
                </Stack>
              </ButtonBase>
              <Menu
                open={open}
                onClose={handleClose}
                sx={{ mt: "45px" }}
                id="profile-menu"
                anchorEl={anchorRef.current}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                
                {user && isAdmin(user) ? <MenuItem>
                  <ListItem>
                    <ListItemButton onClick={handleAdmin}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <AdminPanelSettings/>
                      </ListItemIcon>
                      <ListItemText primary="Admin Panel" />
                    </ListItemButton>
                  </ListItem>
                </MenuItem> :""}
                <MenuItem>
                  <ListItem>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <LogoutRounded />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                </MenuItem>
              </Menu>
            </Box>
          </ClickAwayListener>
        </>
      )}
    </>
  );
};

export default Profile;
