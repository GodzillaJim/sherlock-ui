import { Order, OrderPage } from "../../../graphql/common";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { priceWithCurrency } from "../../helpers/orders/pricing";
import dayjs from "dayjs";
import { Button, Grid } from "@mui/material";
import NextLink from "next/link";
import { Visibility } from "@mui/icons-material";

type OrderListTableProps = {
  orderPage: OrderPage;
  page: number;
  setPage: (page: number) => void;
};
const OrderListTable = ({ orderPage }: OrderListTableProps) => {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
    },
    {
      field: "deadline",
      headerName: "Deadline",
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "numberOfPages",
      headerName: "Pages",
    },
    {
      field: "type",
      headerName: "Order type",
    },
    {
      field: "id",
      headerName: "",
      renderCell: (params) => {
        return (
          <NextLink href={`/app/order/${params.value}/view`}>
            <Button startIcon={<Visibility />}>View details</Button>
          </NextLink>
        );
      },
      minWidth: 150,
    },
  ];

  const orders = useMemo(() => {
    let temp: any[] = [];

    if (orderPage) {
      temp = orderPage.docs?.map((doc: Order) => {
        return {
          ...doc,
          price: priceWithCurrency({
            currency: doc.price?.currency || "usd",
            amount: doc.price?.amount || 0,
          }),
          deadline: dayjs(doc.deadline).format("DD, MMM YYYY"),
          id: doc.orderId,
        };
      });
    }

    return temp;
  }, [orderPage]);
  return (
    <Grid container>
      <Grid item>
        <DataGrid columns={columns} rows={orders} showCellVerticalBorder />
      </Grid>
    </Grid>
  );
};

export default OrderListTable;
