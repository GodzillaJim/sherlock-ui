import { ApolloError } from "@apollo/client";
import React, { useMemo } from "react";
import { Button, Divider, Grid } from "@mui/material";
import NextLink from "next/link";
import { Add } from "@mui/icons-material";
import MainLayout from "../../../layout/MainLayout";
import { Order, OrderPage } from "../../../../graphql/common";
import OrderList from "../../../components/orders/OrderList";
import { useGetUserOrders } from "../../../helpers/orders/useGetUserOrders";

type DashboardProps = {
  error?: ApolloError | { message: string };
  myOrders: OrderPage;
};

const Dashboard = ({ myOrders }: DashboardProps): JSX.Element => {
  const { loading, data, error } = useGetUserOrders({ status: ["COMPLETED"] });

  const orders = useMemo(() => {
    if (data?.getMyOrders?.docs.length) {
      return myOrders.docs as Order[];
    }
    return [];
  }, [myOrders]);

  return (
    <Grid container padding={{ xs: 0, md: 3 }} pt={{ xs: 3 }} spacing={2} direction={"column"}>
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
      <OrderList error={error?.message} orders={orders} loading={loading} />
    </Grid>
  );
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
