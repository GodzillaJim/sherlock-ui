import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import ProfileTab from "./ProfileTab";
import MainCard from "../../../../../components/MainCard";
import Transitions from "../../../../../components/Transitions";
import SettingsTab from "./SettingsTab";
import { useAuth } from "../../../../../Context/AuthManager";
import { RoleType } from "../../../../../generated";
import Image from "next/image";
import {
  LogoutRounded,
} from "@mui/icons-material";

type TabPanelProps = {
  children: JSX.Element;
  value: number;
  index: number;
};

const TabPanel = ({ value, index, children }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
};

const allyProps = (index: number) => {
  return {
    id: `profile-tab-${index}`,
    "aria-controls": `profile-tabpanel-${index}`,
  };
};

const Profile = () => {
  const isClientSide = typeof window !== undefined;
  const { signOut } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const auth = useAuth();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const user = useMemo(() => {
    if (auth?.localUser) return auth?.localUser;
    return null;
  }, [auth]);

  const getAccountType = () => {
    if (user && user.roles) {
      const roles = user.roles;
      const isAdmin = roles.find((role) => role?.name === RoleType.Admin);
      const isEditor = roles.find((role) => role?.name === RoleType.Editor);
      const isWriter = roles.find((role) => role?.name === RoleType.Writer);

      if (isAdmin) return "Admin Account";
      if (isEditor) return "Editor Account";
      if (isWriter) return "Writer Account";
      return "Customer Account";
    }
  };

  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current?.contains(event.target as Node)
    ) {
      return;
    }
    setOpen(false);
  };
  const handleLogout = () => {
    signOut && signOut();
  };
  const iconBackColorOpen = `grey.300`;

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const profilePic = user?.picture || auth.user?.photoURL;

  const displayName = useMemo(() => {
    if (user && user.firstName) {
      return user.firstName;
    }
    return auth.user?.displayName;
  }, [auth, user]);

  return (
    <>
      {!isClientSide && <div />}
      {isClientSide && (
        <>
          {!user && (
            <ClickAwayListener onClickAway={handleClose}>
              <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <ButtonBase
                  component={Box}
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
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      p: 0.5,
                      ":hover": { color: theme.palette.primary.dark },
                    }}
                  >
                    <IconButton>
                      <Avatar />
                    </IconButton>
                  </Stack>
                </ButtonBase>
                <Popper
                  placement="bottom-end"
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  popperOptions={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 9],
                        },
                      },
                    ],
                  }}
                  sx={{
                    left: "calc(100% - 430px) !important",
                    top: "auto !important",
                    right: "auto !important",
                  }}
                >
                  {({ TransitionProps }) => (
                    <Transitions
                      position="bottom"
                      type="fade"
                      in={open}
                      {...TransitionProps}
                    >
                      {open ? (
                        <Paper
                          sx={{
                            boxShadow: theme.shadows[1],
                            width: 290,
                            minWidth: 240,
                            maxWidth: 290,
                            [theme.breakpoints.down("md")]: {
                              maxWidth: 250,
                            },
                          }}
                        >
                          <MainCard
                            elevation={0}
                            border={false}
                            content={false}
                          >
                            <>
                              <CardContent sx={{ px: 2.5, pt: 3 }}>
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Stack
                                      direction="row"
                                      spacing={1.25}
                                      alignItems="center"
                                    >
                                      {profilePic && (
                                        <Avatar
                                          alt="profile user"
                                          src={profilePic}
                                          sx={{ width: 32, height: 32 }}
                                        />
                                      )}
                                      {!profilePic && <Avatar />}
                                      <Stack></Stack>
                                    </Stack>
                                  </Grid>
                                  <Grid item>
                                    <IconButton
                                      size="large"
                                      color="secondary"
                                      onClick={handleLogout}
                                    >
                                      <LogoutRounded />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </>
                          </MainCard>
                        </Paper>
                      ) : (
                        <div />
                      )}
                    </Transitions>
                  )}
                </Popper>
              </Box>
            </ClickAwayListener>
          )}

          {user && (
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
                      {profilePic && (
                        <Image
                          width={32}
                          height={32}
                          src={profilePic}
                          alt={"profile user"}
                        />
                      )}
                      {!profilePic && <Avatar />}
                    </Avatar>
                    <Typography color="inherit" variant="subtitle1">
                      {displayName}
                    </Typography>
                  </Stack>
                </ButtonBase>
                <Popper
                  placement="bottom-end"
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  popperOptions={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 9],
                        },
                      },
                    ],
                  }}
                  sx={{
                    left: "calc(100% - 430px) !important",
                    top: "auto !important",
                    right: "auto !important",
                  }}
                >
                  {({ TransitionProps }) => (
                    <Transitions
                      position="bottom"
                      type="fade"
                      in={open}
                      {...TransitionProps}
                    >
                      {open ? (
                        <Paper
                          sx={{
                            boxShadow: theme.shadows[1],
                            width: 290,
                            minWidth: 240,
                            maxWidth: 290,
                            [theme.breakpoints.down("md")]: {
                              maxWidth: 250,
                            },
                          }}
                        >
                          <MainCard
                            elevation={0}
                            border={false}
                            content={false}
                          >
                            <>
                              <CardContent sx={{ px: 2.5, pt: 3 }}>
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    <Stack
                                      direction="row"
                                      spacing={1.25}
                                      alignItems="center"
                                    >
                                      {profilePic && (
                                        <Avatar
                                          alt="profile user"
                                          src={profilePic}
                                          sx={{ width: 32, height: 32 }}
                                        />
                                      )}
                                      {!profilePic && <Avatar />}
                                      <Stack>
                                        <Typography variant="h6">
                                          {displayName}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          {getAccountType()}
                                        </Typography>
                                      </Stack>
                                    </Stack>
                                  </Grid>
                                  <Grid item>
                                    <IconButton
                                      size="large"
                                      color="secondary"
                                      onClick={handleLogout}
                                    >
                                      <LogoutRounded />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </CardContent>
                              {open && (
                                <>
                                  <Box
                                    sx={{
                                      borderBottom: 1,
                                      borderColor: "divider",
                                    }}
                                  >
                                    <Tabs
                                      variant="fullWidth"
                                      value={value}
                                      onChange={handleChange}
                                      aria-label="profile tabs"
                                    >
                                      <Tab
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          textTransform: "capitalize",
                                        }}
                                        // icon={
                                        //   <AccountBoxOutlined
                                        //     style={{
                                        //       marginBottom: 0,
                                        //       marginRight: "10px",
                                        //     }}
                                        //   />
                                        // }
                                        label=""
                                        {...allyProps(0)}
                                      />
                                      {/* <Tab
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          textTransform: "capitalize",
                                        }}
                                        icon={
                                          <SettingsApplications
                                            style={{
                                              marginBottom: 0,
                                              marginRight: "10px",
                                            }}
                                          />
                                        }
                                        label="Setting"
                                        {...allyProps(1)}
                                      /> */}
                                    </Tabs>
                                  </Box>
                                  <TabPanel value={value} index={0}>
                                    <ProfileTab handleLogout={handleLogout} />
                                  </TabPanel>
                                  <TabPanel value={value} index={1}>
                                    <SettingsTab />
                                  </TabPanel>
                                </>
                              )}
                            </>
                          </MainCard>
                        </Paper>
                      ) : (
                        <div />
                      )}
                    </Transitions>
                  )}
                </Popper>
              </Box>
            </ClickAwayListener>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
