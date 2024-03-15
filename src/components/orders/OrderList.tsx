import { Alert, Grid, Typography } from "@mui/material";
import CustomLoader from "../CustomLoader";
import DraftsComponent from "./DraftsComponent";
import React from "react";
import { Order } from "../../../graphql/common";

type OrderListProps = {
  error?: string;
  orders?: Order[];
  loading: boolean;
};

const OrderList = ({ error, orders, loading }: OrderListProps) => {
  return (
    <>
      {error ? (
        <Grid item>
          <Alert>{error}</Alert>
        </Grid>
      ) : (
        ""
      )}
      {loading ? (
        <Grid item>
          <CustomLoader />
        </Grid>
      ) : (
        ""
      )}
      {orders && orders.length ? (
        <DraftsComponent drafts={orders} />
      ) : (
        <Grid item>
          <Typography variant="body1">Nothing to show.</Typography>
        </Grid>
      )}
    </>
  );
};

export default OrderList;
