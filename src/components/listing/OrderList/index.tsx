import React from "react";
import { OrderPage } from "../../../generated";

type OrderListProps = {
  orderPage: OrderPage;
};
const OrderList = ({ orderPage }: OrderListProps) => {
  return <div>{"TotalDocs: " + orderPage?.totalDocs || 0}</div>;
};
export default OrderList;
