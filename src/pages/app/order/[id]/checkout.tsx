import React, { FormEvent, useEffect, useState } from "react";
import PublicLayout from "../../../../layout/PublicLayout";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  GetOrderDocument,
  GetOrderQuery,
} from "../../../../Apollo/schema/GetOrder.generated";
import { StripeContext } from "../../../../Context/Stripe";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  ArrowBackOutlined,
  CalendarMonthOutlined,
  Payment,
  TitleOutlined,
} from "@mui/icons-material";
import { DollarOutlined } from "@ant-design/icons";
import { priceWithCurrency } from "../../../../helpers/orders/pricing";
import dayjs from "dayjs";
import { useUpdatePaymentStatusMutation } from "../../../../Apollo/schema/UpdatePaymentStatus.generated";
import ProgressSteppers from "../../../../components/common/ProgressSteppers";
import { GetMyOrdersDocument } from "../../../../Apollo/schema/GetMyOrders.generated";
import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../../../Apollo";
import { Order } from "../../../../../graphql/common";
import { toast } from "react-toastify";

const StyledCard = styled(Card)(({ theme }) => ({
  width: 600,
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

type CheckoutProps = {
  order: Order;
  error?: string;
};

const Checkout = ({ order, error }: CheckoutProps) => {
  const [paying, setPaying] = useState(false);
  const [ paymentError, setPaymentError] = useState("");
  const router = useRouter();

  const [updatePaymentStatus] = useUpdatePaymentStatusMutation({
    refetchQueries: [GetOrderDocument, GetMyOrdersDocument],
  });

  const stripe = useStripe();
  const elements = useElements();

  const clientSecret = order.price?.clientSecret;

  const checkPayment = async () => {
    if (order.price?.clientSecret) {
      const clientSecret = order.price.clientSecret;
      const intent = await stripe?.retrievePaymentIntent(clientSecret);

      if (
        intent?.paymentIntent?.status === "succeeded" ||
        order.price.paymentStatus === "PAID"
      ) {
        // Already paid
        router.push(`/app/payment/paid?orderId=${order.orderId}`);
      }
    }
  };

  useEffect(() => {
    checkPayment();
  }, [order]);

  const handleBack = async () => {
    await router.back();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!stripe || !elements) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement && clientSecret) {
      setPaying(true);
      const status = await stripe.retrievePaymentIntent(clientSecret);

      if (status.paymentIntent?.status === "succeeded") {
        toast.success("Order is already paid");
        await updatePaymentStatus({
          variables: { orderId: order.orderId },
        });
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });


      if (result.error) {
        setPaymentError(result.error.message || "Could not capture payment");
      }

      if (result.paymentIntent) {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment successful!");
        }

        router.push(`/app/payment/success?orderId=${order.orderId}`);
      }

      setPaying(false);
    }
    await updatePaymentStatus({
      variables: { orderId: order.orderId },
      refetchQueries: [GetOrderDocument],
    });
  };

  if (!clientSecret) {
    return <Typography>Payment not ready. Please reload page.</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        px={{ xs: 1, md: 3 }}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ minHeight: "100%" }}
        flexDirection={"column"}
        gap={4}
        mt={5}
      >
        <Grid item>
          <ProgressSteppers activeStep={2} />
        </Grid>

        {error ? (
          <Grid item>
            <Alert variant={"standard"} color={"error"}>
              {error || "Something went wrong!"}
            </Alert>
          </Grid>
        ) : (
          ""
        )}
        {order ? (
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Grid container gap={2}>
                  <Grid item xs={12} md={5.5}>
                    <Grid container flexDirection={"column"}>
                      <Grid item>
                        <IconButton onClick={handleBack}>
                          <ArrowBackOutlined />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <List>
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography variant={"h4"}>
                                  Complete payment
                                </Typography>
                              }
                              secondary={
                                <Typography variant={"caption"}>
                                  {`We don't store any credit card data.`}
                                </Typography>
                              }
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item>
                        <List>
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <TitleOutlined />
                            </ListItemIcon>
                            <ListItemText
                              secondary={"Title"}
                              primary={order.title}
                            />
                          </ListItem>

                          <ListItem>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <DollarOutlined />
                            </ListItemIcon>
                            <ListItemText
                              secondary={"Price"}
                              primary={priceWithCurrency({
                                currency: order.price?.currency || "usd",
                                amount: order.price?.amount || 0,
                              })}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CalendarMonthOutlined />
                            </ListItemIcon>
                            <ListItemText
                              secondary={"Date due"}
                              primary={dayjs(order.deadline).format(
                                "DD MMM, YYYY"
                              )}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider orientation={"vertical"} flexItem />
                  <Grid item xs={12} md={5.5} mt={1}>
                    <Grid
                      container
                      flexDirection={"column"}
                      gap={3}
                      height={"100%"}
                    >
                      <Grid item>
                        <CardElement />
                        {/*<Grid container flexDirection={"column"} gap={3}>*/}
                        {/*  /!*<Grid item>*!/*/}
                        {/*  /!*  <LinkAuthenticationElement*!/*/}
                        {/*  /!*    id={"link-authentication-element"}*!/*/}
                        {/*  /!*    onReady={() => setCardIsReady(true)}*!/*/}
                        {/*  /!*  />*!/*/}
                        {/*  /!*</Grid>*!/*/}
                        {/*  <Grid item>*/}
                        {/*    <PaymentElement id={"payment-element"} />*/}
                        {/*  </Grid>*/}
                        {/*</Grid>*/}

                        {paymentError ? (
                          <Typography variant={"caption"} color={"error"}>
                            {paymentError}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid item sx={{ marginTop: "170px" }}>
                        <Button
                          variant={"contained"}
                          fullWidth
                          startIcon={<Payment />}
                          type={"submit"}
                          disabled={paying}
                        >
                          Pay
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </form>
  );
};

const Wrapper = (props: CheckoutProps) => (
  <StripeContext clientSecret={props.order.price?.clientSecret || undefined}>
    <Checkout {...props} />
  </StripeContext>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const authToken = context.req.cookies.authToken;
    if (!authToken) {
      return { props: { error: { message: "Login to continue" } } };
    }
    const client = createApolloClient(authToken);

    const orderId = context.query.id;

    const { error, data } = await client.query<GetOrderQuery>({
      query: GetOrderDocument,
      variables: { orderId },
    });

    if (data.getOrder) {
      return { props: { order: data.getOrder } };
    }

    if (error) {
      throw new Error(error.message);
    }

    return { props: { error: { message: "Something went wrong!" } } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      props: { error: { message: e.message || "Something went wrong." } },
    };
  }
};

Wrapper.getLayout = (page: React.ReactNode) => (
  <PublicLayout>{page}</PublicLayout>
);
export default Wrapper;
