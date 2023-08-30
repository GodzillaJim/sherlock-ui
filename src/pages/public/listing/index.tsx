import React, { ReactNode, useEffect } from "react";
import PublicLayout from "../../../layout/PublicLayout";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TopSearchBar from "../../../layout/PublicLayout/Header";
import Filters from "../../../components/listing/Filters";
import OrderList from "../../../components/listing/OrderList";
import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../../Apollo";
import GetPublicOrders from "../../../Apollo/schema/GetPublicOrders";
import { OrderPage } from "../../../generated";

type ListingProps = {
  orderPage: OrderPage;
};
const Listing = ({ orderPage }: ListingProps) => {
  useEffect(() => {
    console.log("OrderPage: ", orderPage);
  });
  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={3}
      flexDirection={"column"}
      p={3}
    >
      <Grid item>
        <Box
          sx={{ display: "flex", justifyContent: "center", minWidth: "100%" }}
        >
          <TopSearchBar />
        </Box>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item xs={12} sm={12} md={3}>
            <Box>
              <Typography variant={"caption"}>Filters</Typography>
              <Divider />
              <Filters />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <OrderList orderPage={orderPage} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Listing.getLayout = function (page: ReactNode) {
  return <PublicLayout>{page}</PublicLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const authToken = context.req.cookies.authToken;
    if (!authToken) {
      return { props: { error: { message: "Login to continue" } } };
    }
    const client = createApolloClient(authToken);

    const { data, error } = await client.query({ query: GetPublicOrders });
    if (error) {
      return { props: { error } };
    }

    console.log(data);
    return { props: { orderPage: data.getPublicOrders } };
  } catch (error: any) {
    console.log("Error: ", error);
    return {
      props: { error: { message: error?.message || "Something went wrong" } },
    };
  }
};
export default Listing;
