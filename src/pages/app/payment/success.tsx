import React, { ReactNode } from "react";
import PublicLayout from "../../../layout/PublicLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";

const PaymentSuccess = () => {
  const query = useSearchParams();
  const orderId = query.get("orderId");
  return (
    <Grid container px={2}>
      <Grid item width={"100%"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <CheckCircleOutline sx={{ fontSize: 60, color: "green" }} />
          <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
            Payment Successful
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Thank you for your order!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {`Your order has been sent to writers. Check the order details for
            updates. You will receive an email confirmation shortly.`}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <NextLink href={`/app/order/${orderId}/view`}>
              <Button
                variant={"contained"}
                color={"primary"}
                sx={{ textTransform: "none" }}
              >
                Go to order details
              </Button>
            </NextLink>
            <NextLink href={`/`}>
              <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ textTransform: "none" }}
              >
                Go to Homepage
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

PaymentSuccess.getLayout = (page: ReactNode) => (
  <PublicLayout>{page}</PublicLayout>
);

export default PaymentSuccess;
