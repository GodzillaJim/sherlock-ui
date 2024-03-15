import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../Apollo";
import { GetMyOrdersDocument } from "../../Apollo/schema/GetMyOrders.generated";

export const getSharedServerSideProps = async (
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