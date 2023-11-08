import React, { useMemo } from "react";
import MainLayout from "../../layout/MainLayout";
import { Order, OrderPage } from "../../generated";
import { Grid } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../Apollo";
import { ApolloError } from "@apollo/client";
import { GetMyOrdersDocument } from "../../Apollo/schema/GetMyOrders.generated";
import DraftsComponent from "../../components/orders/DraftsComponent";
import PublishedComponent from "../../components/orders/PublishedComponent";
import { TabGroup } from "../../components/common/TabPanel";
import ResponsesComponent from "../../components/orders/ResponsesComponent";

type DashboardProps = {
  error?: ApolloError | { message: string };
  myOrders: OrderPage;
};

const Dashboard = ({ myOrders }: DashboardProps): JSX.Element => {
  const drafts = useMemo(() => {
    if (myOrders && myOrders.docs?.length) {
      const orders = myOrders.docs as Order[];
      return orders.filter((order) => !order?.published);
    }
    return [];
  }, [myOrders]);

  const published = useMemo(() => {
    if (myOrders && myOrders.docs?.length) {
      const orders = myOrders.docs as Order[];
      return orders.filter((order) => Boolean(order?.published));
    }
    return [];
  }, [myOrders]);

  return (
    <Grid container padding={3} spacing={5} direction={"column"}>
      <TabGroup
        items={[
          {
            label: "Drafts",
            contents: <DraftsComponent drafts={drafts} />,
          },
          {
            label: "Published",
            contents: <PublishedComponent orders={published} />,
          },
          {
            label: "Responses",
            contents: <ResponsesComponent />,
          },
        ]}
      />
    </Grid>
  );
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
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

    const { data, error } = await client.query({ query: GetMyOrdersDocument });
    if (error) {
      return { props: { error } };
    }

    return { props: { myOrders: data.getMyOrders } };
  } catch (error: any /*tslint:disable-line:no-explicit-any*/) {
    console.log("Error: ", error);
    return {
      props: { error: { message: error?.message || "Something went wrong" } },
    };
  }
};

export default Dashboard;
