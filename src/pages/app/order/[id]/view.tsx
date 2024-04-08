import React, { useEffect } from "react";
import MainLayout from "../../../../layout/MainLayout";
import {
  GetOrderDocument,
  useGetOrderLazyQuery,
} from "../../../../Apollo/schema/GetOrder.generated";
import { useSearchParams } from "next/navigation";
import { Grid } from "@mui/material";
import CustomLoader from "../../../../components/CustomLoader";
import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../../../Apollo";
import { useRouter } from "next/router";
import OrderDetailsComponent from "../../../../components/orders/OrderDetailsComponent";
import { Order } from "../../../../../graphql/common";
import ErrorMessage from "../../../../components/ErrorMessage";

const OrderDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [getOrder, { loading, error, data }] = useGetOrderLazyQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log("GetOrder: ", data);
  });

  useEffect(() => {
    const orderId = router.query.id as string;

    if (orderId) {
      getOrder({ variables: { orderId } }).then();
    }
  }, [params]);

  return (
    <Grid container>
      {error && (
        <Grid item xs={12} mt={5}>
          <ErrorMessage message={error.message} />
        </Grid>
      )}
      <Grid item>
        {loading && <CustomLoader />}
        {data?.getOrder ? (
          <OrderDetailsComponent order={data.getOrder as Order} />
        ) : (
          ""
        )}
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
      return { props: { error: error.message } };
    }

    return { props: { order: data.getOrder } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any /*tslint:disable-line:no-explicit-any*/) {
    console.log("Error: ", error);
    return {
      props: { error: { message: error?.message || "Something went wrong" } },
    };
  }
}

export default OrderDetails;
