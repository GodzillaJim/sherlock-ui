import React, { ReactNode } from "react";
import PublicLayout from "../../../layout/PublicLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";

const PaymentError = () => {
  const query = useSearchParams();
  const orderId = query.get(`query`);
  return (
    <Grid container>
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
          <ErrorOutline sx={{ fontSize: 60, color: "red" }} />
          <Typography
            variant="h4"
            gutterBottom
            sx={{ marginTop: 2, color: "red" }}
          >
            Payment Failed
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Something went wrong with your payment.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Please check your payment details and try again.
          </Typography>
          <NextLink href={`/app/order/${orderId}/view`}>
            <Button
              variant="contained"
              color="primary"
              href="/retry-payment"
              sx={{ textTransform: "none", marginBottom: 2 }}
            >
              Retry Payment
            </Button>
          </NextLink>
          <Button
            variant="outlined"
            color="primary"
            href="/"
            sx={{ textTransform: "none" }}
          >
            Go to Homepage
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

PaymentError.getLayout = (page: ReactNode) => (
  <PublicLayout>{page}</PublicLayout>
);

export default PaymentError;
