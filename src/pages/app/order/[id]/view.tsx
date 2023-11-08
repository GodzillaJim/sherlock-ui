import React, { useEffect } from "react";
import MainLayout from "../../../../layout/MainLayout";
import {
  GetOrderDocument,
  useGetOrderLazyQuery,
} from "../../../../Apollo/schema/GetOrder.generated";
import { useSearchParams } from "next/navigation";
import { Alert, Grid } from "@mui/material";
import CustomLoader from "../../../../components/CustomLoader";
import OrderDetailsComponent from "../../../../components/orders/OrderDetailsComponent";
import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../../../Apollo";

const OrderDetails = () => {
  const params = useSearchParams();
  const [getOrder, { loading, error, data }] = useGetOrderLazyQuery();

  useEffect(() => {
    const orderId = params.get("id");

    if (orderId) {
      getOrder({ variables: { orderId } }).then();
    }
  }, [params]);

  return (
    <Grid container>
      <Grid item>
        {error && (
          <Alert variant={"outlined"} color={"error"}>
            {error.message}
          </Alert>
        )}
        {loading && <CustomLoader />}
        {data?.getOrder && <OrderDetailsComponent order={data.getOrder} />}
      </Grid>
    </Grid>
  );
};

OrderDetails.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const authToken = context.req.cookies.authToken;
    if (!authToken) {
      return { props: { error: { message: "Login to continue" } } };
    }
    const client = createApolloClient(authToken);

    const orderId = context?.params?.id;
    if (!orderId) return;

    const { data, error } = await client.query({
      query: GetOrderDocument,
      variables: { orderId },
    });
    if (error) {
      return { props: { error } };
    }

    return { props: { order: data.getOrder } };
  } catch (error: any /*tslint:disable-line:no-explicit-any*/) {
    console.log("Error: ", error);
    return {
      props: { error: { message: error?.message || "Something went wrong" } },
    };
  }
}

export default OrderDetails;
