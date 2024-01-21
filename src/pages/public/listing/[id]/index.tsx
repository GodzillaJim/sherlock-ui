import React, { ReactNode, useMemo } from "react";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { createApolloClient } from "../../../../Apollo";
import PublicLayout from "../../../../layout/PublicLayout";
import { Button, Grid, styled } from "@mui/material";
import GoBackComponent from "../../../../components/common/GoBackComponent";
import {
  GetOrderDocument,
  GetOrderQuery,
} from "../../../../Apollo/schema/GetOrder.generated";
import NotFound from "../../../../components/common/NotFound";
import OrderDetailsComponent from "../../../../components/orders/OrderDetailsComponent";
import { isAdmin, isWriter } from "../../../../helpers/User";
import { useAuth } from "../../../../Context/AuthManager";

type PublicOrderDetailsProps = {
  order: Order;
  error: any;
};

const Container = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const PublicOrderDetails = ({ order }: PublicOrderDetailsProps) => {
  const auth = useAuth();

  const canRespond = useMemo(() => {
    console.log("CanResponse: ", {
      user: auth.localUser,
      isAdmin: auth.localUser ? isAdmin(auth?.localUser) : false,
      isWriter: auth.localUser ? isWriter(auth?.localUser) : false,
    });
    if (!auth.localUser) return false;
    if (isAdmin(auth?.localUser)) return true;
    return !!isWriter(auth.localUser);
  }, [auth]);

  return (
    <Container>
      <GoBackComponent />
      {!order && <NotFound message={"This order does not exist."} />}
      {order && <OrderDetailsComponent order={order} hideEditButton={true} />}
      {order && canRespond && (
        <Grid container p={3}>
          <Grid item>
            <NextLink href={`/app/order/${order.orderId}/respond`}>
              <Button>Write an answer</Button>
            </NextLink>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

PublicOrderDetails.getLayout = (page: ReactNode) => (
  <PublicLayout>{page}</PublicLayout>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const authToken = context.req.cookies.authToken;
    if (!authToken) {
      return { props: { error: { message: "Login to continue" } } };
    }

    const client = createApolloClient(authToken);
    const orderId = context.params?.id;

    if (!orderId) {
      return { props: { error: { message: "Path ID found" } } };
    }

    const { data, error } = await client.query<GetOrderQuery>({
      query: GetOrderDocument,
      variables: { orderId },
    });

    if (error) {
      return { props: { error: { message: error?.message, stack: error } } };
    }

    console.log(data);
    return { props: { order: data.getOrder } };
  } catch (e: any /*tslint:disable-line:no-explicit-any*/) {
    return {
      props: {
        error: {
          message: e?.message || "Something went wrong",
          stack: JSON.stringify(e),
        },
      },
    };
  }
};
export default PublicOrderDetails;
