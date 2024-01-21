import { ApolloError } from "@apollo/client";
import React, { useMemo } from "react";
import { Order, OrderPage } from "../../../generated";
import { Button, Divider, Grid, Typography } from "@mui/material";
import NextLink from "next/link"
import { Add } from "@mui/icons-material";
import DraftsComponent from "../../../components/orders/DraftsComponent";
import MainLayout from "../../../layout/MainLayout";
import { getSharedServerSideProps } from "../../../helpers/orders/sharedProps";
import PublishedComponent from "../../../components/orders/PublishedComponent";


type DashboardProps = {
  error?: ApolloError | { message: string };
  myOrders: OrderPage;
};

const Dashboard = ({ myOrders }: DashboardProps): JSX.Element => {
  const drafts = useMemo(() => {
    if (myOrders && myOrders.docs?.length) {
      const orders = myOrders.docs as Order[];
      return orders.filter((order) => !order?.published);
    }
    return [];
  }, [myOrders]);

  const published = useMemo(() => {
    if (myOrders && myOrders.docs?.length) {
      const orders = myOrders.docs as Order[];
      return orders.filter((order) => Boolean(order?.published));
    }
    return [];
  }, [myOrders]);

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
      {drafts.length ? (
        <PublishedComponent orders={published} />
      ) : (
        <Grid item>
          <Typography variant="body1">No orders found</Typography>
        </Grid>
      )}
    </Grid>
  );
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = getSharedServerSideProps;

export default Dashboard;
