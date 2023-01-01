import { Button, CardMedia, Grid } from "@mui/material";
import React from "react";
import MainCard from "../../../../components/MainCard";

const DrawerHeader = () => {
  return (
    <MainCard>
      <Grid justifyContent={"center"} container mb={3}>
        <Grid item>
          <Button type="button" variant="contained" color="success">
            Place new Order
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DrawerHeader;
