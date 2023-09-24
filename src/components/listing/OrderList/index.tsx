import React, {useMemo} from "react";
import {Order, OrderPage} from "../../../generated";
import OrderCard from "./OrderCard";
import {Grid, Pagination, styled} from "@mui/material";

type OrderListProps = {
  orderPage: OrderPage;
};

const OrderListParent = styled('div')(({ theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxHeight: '120vh'
}))
const OrderList = ({ orderPage }: OrderListProps) => {
  const orders = useMemo(() => {
    let temp: Order[] = [];
    if(orderPage.docs) {
      temp = orderPage.docs as Order[];
    }

    return temp;
  }, [orderPage])
  return <OrderListParent>
    <Grid container px={3} mt={5} gap={3}>
      {orders.map((order) => {
        return <Grid item key={order.orderId} sx={{ width: '100%'}}>
          <OrderCard order={order} />
        </Grid>
      })}
    </Grid>
    <Grid container justifyContent={'center'} py={3}>
      <Grid item>
        <Pagination count={orderPage.totalPages || undefined} variant={"outlined"} />
      </Grid>
    </Grid>
  </OrderListParent>
};

export default OrderList;
