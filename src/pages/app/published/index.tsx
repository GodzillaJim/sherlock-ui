import React, { useMemo } from "react";
import { Button, Divider, Grid } from "@mui/material";
import NextLink from "next/link";
import { Add } from "@mui/icons-material";
import MainLayout from "../../../layout/MainLayout";
import { Order } from "../../../../graphql/common";
import OrderList from "../../../components/orders/OrderList";
import { useGetUserOrders } from "../../../helpers/orders/useGetUserOrders";

const Dashboard = (): JSX.Element => {
  const { loading, data, error } = useGetUserOrders({
    status: ["ACTIVE", "IN_PROGRESS"],
  });

  const published = useMemo(() => {
    if (data?.getMyOrders?.docs.length) {
      return data?.getMyOrders?.docs as Order[];
    }
    return [];
  }, [data]);

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
      <OrderList error={error?.message} orders={published} loading={loading} />
    </Grid>
  );
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
