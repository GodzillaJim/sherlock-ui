import React from "react";
import { Button, Divider, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import NextLink from "next/link";
import MainLayout from "../../../layout/MainLayout";
import ResponsesComponent from "../../../components/orders/ResponsesComponent";

const Responses = (): JSX.Element => {
  return (
    <Grid container padding={3} spacing={5} direction={"column"}>
      <Grid item width={"100%"} textAlign={"end"}>
        <NextLink href={"/app/create"}>
          <Button color="secondary" variant="contained" startIcon={<Add />}>
            Create Order
          </Button>
        </NextLink>
      </Grid>
      <Grid item>
        <Divider flexItem />
      </Grid>
      <Grid item>
        <ResponsesComponent />
      </Grid>
    </Grid>
  );
};

Responses.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Responses;
