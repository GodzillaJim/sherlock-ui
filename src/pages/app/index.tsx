import React, { useMemo } from "react";
import MainLayout from "../../layout/MainLayout";
import { Alert, Button, Divider, Grid, Typography } from "@mui/material";
import { useGetMyOrdersQuery } from "../../Apollo/schema/GetMyOrders.generated";
import { Add } from "@mui/icons-material";
import NextLink from "next/link";
import CustomLoader from "../../components/CustomLoader";
import dayjs from "dayjs";
import SummaryCard from "../../components/SummaryCard";
import { withRequireAuth } from "../../Context/AuthManager/withRequireAuth";
import { Order } from "../../../graphql/common";

const Dashboard = (): JSX.Element => {
  const { loading, error, data } = useGetMyOrdersQuery({
    variables: { pagination: {} },
  });

  const orders = useMemo(() => {
    let temp: Order[] = [];

    if (data?.getMyOrders?.docs?.length) {
      temp = [...(data.getMyOrders.docs as Order[])];
    }

    temp = temp.sort((a, b) => {
      if (dayjs(a.createdAt).isAfter(b.createdAt)) {
        return 1;
      }

      if (dayjs(b.createdAt).isAfter(a.createdAt)) {
        return -1;
      }

      return 0;
    });

    return temp;
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
        <Divider />
      </Grid>

      {loading ? (
        <Grid item>
          <CustomLoader />
        </Grid>
      ) : (
        ""
      )}

      {error ? (
        <Grid item>
          <Alert color="error" variant="filled">
            {error?.message || "Something went wrong. "}
          </Alert>
        </Grid>
      ) : (
        ""
      )}
      {orders.length ? (
        <>
          <Grid item>
            <Typography variant="h4">Recent papers</Typography>
          </Grid>
          <Grid item>
            <Grid container gap={2} flexWrap={"wrap"}>
              {orders.map((order) => (
                <Grid item key={`order-${order.orderId}`} md={3}>
                  <SummaryCard order={order} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid item>
          <Grid container flexDirection={"column"}>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant={"h4"}>Hey... </Typography>
            </Grid>
            <Grid item mt={2}>
              <Typography variant={"body1"}>
                Get a hand written paper as soon as you need it.{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = withRequireAuth();

export default Dashboard;
