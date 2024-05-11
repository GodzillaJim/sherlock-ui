import React from "react";
import { Grid } from "@mui/material";
import Profile from "./Profile";
import { useAuth } from "../../../../Context/AuthManager";

const HeaderContent = () => {
  const { user } = useAuth();
  return (
    <Grid container>
      
      {user && (
        <Grid item>
          <Profile />
        </Grid>
      )}
    </Grid>
  );
};

export default HeaderContent;
