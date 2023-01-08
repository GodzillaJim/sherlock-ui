import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Search from "./Search";
import Notification from "./Notification";
import Profile from "./Profile";
import MobileSection from "./MobileSection";

const HeaderContent = () => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {!matchesXS && <Search />}
      <Notification />
      {!matchesXS && <Profile />}
      {matchesXS && <MobileSection />}
    </>
  );
};

export default HeaderContent;
