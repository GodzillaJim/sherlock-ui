import React, { useMemo } from "react";
import { Order, OrderPage } from "../../../generated";
import OrderCard from "./OrderCard";
import { Grid, Pagination, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFilters } from "../../../store/filters";
import { useRouter } from "next/router";

type OrderListProps = {
  orderPage: OrderPage;
};

const OrderListParent = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  maxHeight: "120vh",
}));
const OrderList = ({ orderPage }: OrderListProps) => {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const router = useRouter();

  const orders = useMemo(() => {
    let temp: Order[] = [];
    if (orderPage?.docs) {
      temp = orderPage.docs as Order[];
    }

    return temp;
  }, [orderPage]);

  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    const newFilters = { ...filters, currentPage: value };
    dispatch(setFilters(newFilters));
    router.push({
      pathname: "/public/listing",
      query: Object.fromEntries(
        Object.entries(newFilters).filter((keyValue) => Boolean(keyValue[1]))
      ),
    });
  };

  return (
    <OrderListParent>
      <Grid container px={3} mt={5} gap={3}>
        {orders.map((order) => {
          return (
            <Grid item key={order.orderId} sx={{ width: "100%" }}>
              <OrderCard order={order} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container justifyContent={"center"} py={3}>
        <Grid item>
          <Pagination
            count={orderPage?.totalPages || undefined}
            variant={"outlined"}
            page={filters?.currentPage || 1}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </OrderListParent>
  );
};

export default OrderList;
