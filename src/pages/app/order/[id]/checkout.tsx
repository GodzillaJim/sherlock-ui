import React, { useEffect, useMemo } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  GetOrderDocument,
  useGetOrderLazyQuery,
} from "../../../../Apollo/schema/GetOrder.generated";
import CustomLoader from "../../../../components/CustomLoader";
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
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { useUpdatePaymentStatusMutation } from "../../../../Apollo/schema/UpdatePaymentStatus.generated";
import ProgressSteppers from "../../../../components/common/ProgressSteppers";

const StyledCard = styled(Card)`
  width: 600px;
`;

const Checkout = () => {
  const router = useRouter();
  const orderId = router.query?.id;

  const stripe = useStripe();
  const elements = useElements();

  const [getOrder, { loading, error, data }] = useGetOrderLazyQuery();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

  useEffect(() => {
    if (orderId) {
      getOrder({ variables: { orderId: orderId as string } });
    }
  }, [orderId]);
  const checkPayment = async () => {
    if (data?.getOrder?.price?.clientSecret) {
      const clientSecret = data?.getOrder.price.clientSecret;
      const intent = await stripe?.retrievePaymentIntent(clientSecret);
      console.log("Intent: ", { intent, data });

      if (
        intent?.paymentIntent?.status === "succeeded" ||
        data?.getOrder.price.paymentStatus === "PAID"
      ) {
        // Already paid
        router.push(`/app/payment/paid?orderId=${orderId}`);
      }
    }
  };

  useEffect(() => {
    checkPayment();
  }, [data]);

  const handleSubmit = async (values: { name: string }) => {
    if (!stripe || !elements) {
      return;
    }

    if (!data?.getOrder?.price?.clientSecret) {
      return;
    }

    const clientSecret = data?.getOrder.price.clientSecret;

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const status = await stripe.retrievePaymentIntent(clientSecret);

      if (status.paymentIntent?.status === "succeeded") {
        toast.success("Order is already paid");
        await updatePaymentStatus({
          variables: { orderId: data?.getOrder.orderId },
        });
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: values.name,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Could not capture payment");
      }

      if (result.paymentIntent) {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment successful!");
        }

        router.push(`/app/payment/success?orderId=${orderId}`);
      }
    }
    await updatePaymentStatus({
      variables: { orderId: data?.getOrder.orderId },
      refetchQueries: [GetOrderDocument],
    });
  };

  const order = useMemo(() => {
    if (data?.getOrder) {
      return data.getOrder;
    }

    return null;
  }, [data]);

  const handleBack = async () => {
    await router.back();
  };

  return (
    <Formik
      initialValues={{ name: "", card: null }}
      validationSchema={object().shape({
        name: string().required("This field is required."),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, handleChange, values }) => (
        <Form>
          <Grid
            container
            px={3}
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
            {loading ? (
              <Grid item>
                <CustomLoader />
              </Grid>
            ) : (
              ""
            )}
            {error ? (
              <Grid item>
                <Alert variant={"standard"} color={"error"}>
                  {error?.message || "Something went wrong!"}
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
                      <Grid item xs={12} md={5.5}>
                        <Grid
                          container
                          flexDirection={"column"}
                          gap={3}
                          height={"100%"}
                        >
                          <Grid item>
                            <TextField
                              name={"name"}
                              id={"card-name"}
                              placeholder={"Name on card"}
                              required
                              fullWidth
                              label={"Name"}
                              error={!!(touched.name && errors.name)}
                              onChange={handleChange}
                              value={values.name}
                              helperText={
                                touched.name && errors.name
                                  ? errors.name
                                  : undefined
                              }
                            />
                          </Grid>
                          <Grid item>
                            <CardElement />
                            {errors.card ? (
                              <Typography variant={"caption"} color={"error"}>
                                {errors.card}
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
                              disabled={isSubmitting}
                              type={"submit"}
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
        </Form>
      )}
    </Formik>
  );
};

const Wrapper = () => (
  <StripeContext>
    <Checkout />
  </StripeContext>
);

Wrapper.getLayout = (page: React.ReactNode) => (
  <PublicLayout>{page}</PublicLayout>
);
export default Wrapper;
