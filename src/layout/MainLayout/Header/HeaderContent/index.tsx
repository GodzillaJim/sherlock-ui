import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Notification from "./Notification";
import Profile from "./Profile";
import MobileSection from "./MobileSection";
import { useAuth } from "../../../../Context/AuthManager";

const HeaderContent = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const matchesXS = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container>
      {user && (
        <Grid item>
          <Notification />
        </Grid>
      )}
      {!matchesXS && user && (
        <Grid item>
          <Profile />
        </Grid>
      )}
      {matchesXS && user && (
        <Grid item>
          <MobileSection />
        </Grid>
      )}
    </Grid>
  );
};

export default HeaderContent;
