import React, { useMemo } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Order } from "../../../../graphql/common";
import OrderList from "../../../components/orders/OrderList";
import { Button, Divider, Grid } from "@mui/material";
import NextLink from "next/link";
import { Add } from "@mui/icons-material";
import { useGetUserOrders } from "../../../helpers/orders/useGetUserOrders";

const Dashboard = (): JSX.Element => {
  const { data, loading, error } = useGetUserOrders({ status: ["DRAFT"] });

  const orders = useMemo(() => {
    if (data?.getMyOrders?.docs) {
      return data.getMyOrders.docs as Order[];
    }
    return [];
  }, [data]);

  return (
    <Grid container flexDirection={"column"} padding={3} spacing={2}>
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
        <OrderList error={error?.message} orders={orders} loading={loading} />
      </Grid>
    </Grid>
  );
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
