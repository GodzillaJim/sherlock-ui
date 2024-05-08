import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import HomepageLayout from "../layout/HomepageLayout";
import Landing from "../components/homepage/Landing";
import Services from "../components/homepage/Services";

const HomePage = (): JSX.Element => {
  return (
    <Grid
      container
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={3}
      flexDirection={"column"}
      maxWidth={"xl"}
    >
      <Grid item width={"100%"}>
        <Landing />
      </Grid>
      <Grid item>
        <Services />
      </Grid>
    </Grid>
  );
};

HomePage.getLayout = (page: ReactNode) => (
  <HomepageLayout>{page}</HomepageLayout>
);

export default HomePage;
