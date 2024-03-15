import { ApolloError } from "@apollo/client";
import React, { useMemo } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import NextLink from "next/link";
import { Add } from "@mui/icons-material";
import MainLayout from "../../../layout/MainLayout";
import { getSharedServerSideProps } from "../../../helpers/orders/sharedProps";
import PublishedComponent from "../../../components/orders/PublishedComponent";
import { Order, OrderPage } from "../../../../graphql/common";
import { orderStatus } from "../../../helpers/utils";

type DashboardProps = {
  error?: ApolloError | { message: string };
  myOrders: OrderPage;
};

const Dashboard = ({ myOrders }: DashboardProps): JSX.Element => {
  const published = useMemo(() => {
    if (myOrders && myOrders.docs?.length) {
      const orders = myOrders.docs as Order[];
      return orders.filter((order) => order.status === orderStatus.completed);
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
      {published.length ? (
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
