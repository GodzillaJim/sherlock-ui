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
import React, { useRef, useState } from "react";
import ProfileTab from "./ProfileTab";
import avatar1 from "../../../../../assets/images/users/avatar1.jpg";
import MainCard from "../../../../../components/MainCard";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Transitions from "../../../../../components/Transitions";
import SettingsTab from "./SettingsTab";

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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
    //
  };
  const iconBackColorOpen = `grey.300`;

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };
  return (
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
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            src={avatar1}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle1">John Doe</Typography>
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
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
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
                              <Avatar
                                alt="profile user"
                                src={avatar1}
                                sx={{ width: 32, height: 32 }}
                              />
                              <Stack>
                                <Typography variant="h6">John Doe</Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  UI/UX Designer
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
                              <LogoutOutlined />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                      {open && (
                        <>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                                icon={
                                  <UserOutlined
                                    style={{
                                      marginBottom: 0,
                                      marginRight: "10px",
                                    }}
                                  />
                                }
                                label="Profile"
                                {...allyProps(0)}
                              />
                              <Tab
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  textTransform: "capitalize",
                                }}
                                icon={
                                  <SettingOutlined
                                    style={{
                                      marginBottom: 0,
                                      marginRight: "10px",
                                    }}
                                  />
                                }
                                label="Setting"
                                {...allyProps(1)}
                              />
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
                </ClickAwayListener>
              </Paper>
            ) : (
              <div />
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
