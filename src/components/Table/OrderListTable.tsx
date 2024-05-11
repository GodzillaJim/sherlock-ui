import { Order, OrderPage } from "../../../graphql/common";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { priceWithCurrency } from "../../helpers/orders/pricing";
import dayjs from "dayjs";
import { Button, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import NextLink from "next/link";
import { Visibility } from "@mui/icons-material";
import { getStatusColor } from "../../helpers/utils";

type OrderListTableProps = {
  orderPage: OrderPage;
  page: number;
  setPage: (page: number) => void;
};
const OrderListTable = ({ orderPage }: OrderListTableProps) => {
  const theme = useTheme();
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
      renderCell: (params) => {
        const status = getStatusColor(params.value, theme);

        return (
          <Tooltip title={status.tooltipMessage}>
            <Typography
              variant={"caption"}
              sx={{
                color: status.color,
                backgroundColor: status.background,
                p: 0.4,
                borderRadius: (theme) => `${theme.shape.borderRadius}px`,
              }}
            >
              {params.value}
            </Typography>
          </Tooltip>
        );
      },
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
    let temp: Order[] = [];

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
      }) as Order[];
    }

    return temp;
  }, [orderPage]);
  return (
    <Grid container>
      <Grid item width={'100%'}>
        <DataGrid columns={columns} rows={orders} showCellVerticalBorder />
      </Grid>
    </Grid>
  );
};

export default OrderListTable;
