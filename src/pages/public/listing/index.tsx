import React, { ReactNode, useEffect } from "react";
import PublicLayout from "../../../layout/PublicLayout";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TopSearchBar from "../../../layout/PublicLayout/Header";
import Filters from "../../../components/listing/Filters";
import OrderList from "../../../components/listing/OrderList";
import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../../Apollo";
import GetPublicOrders from "../../../Apollo/schema/GetPublicOrders";
import {
  GetPublicOrdersQuery,
  GetPublicOrdersQueryVariables,
  OrderPage,
  ResponseStatus,
  Type,
  WritingStyle,
} from "../../../generated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFilters } from "../../../store/filters";
import { useSearchParams } from "next/navigation";

type ListingProps = {
  orderPage: OrderPage;
  error: any;
};
const Listing = ({ orderPage, error }: ListingProps) => {
  const filters = useSelector((state: RootState) => state.filters);
  const query = useSearchParams();
  const dispatch = useDispatch();

  const getFiltersFromParams = () => {
    let initialValues = { responseStatus: null };
    Object.keys(filters).map((field) => {
      if (query.has(field) && query.get(field)) {
        initialValues = {
          ...filters,
          ...initialValues,
          [field]: query.get(field),
        };
      }
    });

    if (!initialValues?.responseStatus) {
      initialValues.responseStatus = null;
    }

    return initialValues;
  };

  useEffect(() => {
    if (orderPage?.page) {
      dispatch(
        setFilters({ ...getFiltersFromParams(), currentPage: orderPage.page })
      );
    }
  }, [orderPage]);

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
          <Grid item xs={12} sm={12} md={9} lg={6}>
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

const isEmpty = (str: string) => str?.length === 0 || str === "";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const authToken = context.req.cookies.authToken;
    if (!authToken) {
      return { props: { error: { message: "Login to continue" } } };
    }
    const client = createApolloClient(authToken);

    const filters = context.query;
    console.log("Filters: ", filters);
    const variables: GetPublicOrdersQueryVariables = {
      filter: {
        responseStatus: isEmpty(filters?.responseStatus as string)
          ? null
          : (filters.responseStatus as ResponseStatus),
        typeOfWork:
          isEmpty(filters.typeOfWork as string) || filters.typeOfWork === "all"
            ? null
            : (filters.typeOfWork as Type),
        writingStyle:
          isEmpty(filters.writingStyle as string) ||
          filters.writingStyle === "all"
            ? null
            : (filters.writingStyle as WritingStyle),
        createdBefore: filters.createdBefore
          ? filters.createdBefore
          : undefined,
        createdAfter: filters.createdAfter ? filters.createdAfter : undefined,
        title: filters.title as string,
      },
      pagination: {
        currentPage: parseInt((filters.currentPage as string) || "1") || 1,
        perPage: 10,
      },
    };

    console.log("Filters: ", filters);

    const { data, error } = await client.query<GetPublicOrdersQuery>({
      query: GetPublicOrders,
      variables,
    });
    if (error) {
      return { props: { error } };
    }

    console.log(data);
    return { props: { orderPage: data.getPublicOrders } };
  } catch (error: any /*tslint:disable-line:no-explicit-any*/) {
    console.log("Error: ", error);
    return {
      props: { error: { message: error?.message || "Something went wrong" } },
    };
  }
};
export default Listing;
