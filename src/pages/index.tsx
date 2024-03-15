import React from "react";
import { Box, Button, Grid } from "@mui/material";
import NextLink from "next/link";

const HomePage = (): JSX.Element => {
  return (
    <Grid
      container
      width={"100%"}
      height={"70vh"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={3}
    >
      <Grid item>
        <Box display={"flex"} gap={2}>
          <NextLink href={"/auth/login?next=/app"}>
            <Button variant={"contained"}>Log in</Button>
          </NextLink>
          <NextLink href={"/auth/signup"}>
            <Button variant={"contained"}>Sign up</Button>
          </NextLink>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
