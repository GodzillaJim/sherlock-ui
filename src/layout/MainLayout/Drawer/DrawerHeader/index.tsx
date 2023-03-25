import { Button, Grid } from "@mui/material";
import React from "react";
import MainCard from "../../../../components/MainCard";
import { useRouter } from "next/router";

const DrawerHeader = () => {
  const router = useRouter();
  return (
    <MainCard>
      <Grid justifyContent={"center"} container mb={3}>
        <Grid item>
          <Button
            onClick={() => router.push("/app/create")}
            type="button"
            variant="contained"
            color="success"
          >
            Place new Order
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default DrawerHeader;
