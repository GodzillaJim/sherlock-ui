import { Box, IconButton, Link, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Search from "./Search";
import { GithubOutlined } from "@ant-design/icons";
import Notification from "./Notification";
import Profile from "./Profile";
import MobileSection from "./MobileSection";

const HeaderContent = () => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {!matchesXS && <Search />}
      {matchesXS && <Box sx={{ width: "100%", ml: 1 }}></Box>}
      <IconButton
        LinkComponent={Link}
        href="http://github.com/godzillajim"
        disableRipple
        color="secondary"
        title="Download Now"
        sx={{ color: "text.primary", bgColor: "grey.100" }}
      >
        <GithubOutlined />
      </IconButton>
      <Notification />
      {!matchesXS && <Profile />}
      {matchesXS && <MobileSection />}
    </>
  );
};

export default HeaderContent;
