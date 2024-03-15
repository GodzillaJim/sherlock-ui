import React, { useMemo } from "react";
import { Button, Divider, Grid } from "@mui/material";
import NextLink from "next/link";
import { Add } from "@mui/icons-material";
import MainLayout from "../../../layout/MainLayout";
import { Order } from "../../../../graphql/common";
import { orderStatus } from "../../../helpers/utils";
import OrderList from "../../../components/orders/OrderList";
import { useGetUserOrders } from "../../../helpers/orders/useGetUserOrders";

const Dashboard = (): JSX.Element => {
  const { loading, data, error } = useGetUserOrders({ status: ["CANCELED"] });

  const orders = useMemo(() => {
    if (data?.getMyOrders?.docs?.length) {
      const orders = data?.getMyOrders.docs as Order[];
      return orders.filter((order) => order.status === orderStatus.canceled);
    }
    return [];
  }, [data]);

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
      <OrderList error={error?.message} orders={orders} loading={loading} />
    </Grid>
  );
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
