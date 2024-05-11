import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { EditorState } from "draft-js";
import { toEditorState } from "../../helpers/editor";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import CustomEditor from "../CustomEditor";
import AttachmentList from "../edit/AttachmentList";
import dayjs from "dayjs";
import {
  AssignmentOutlined,
  AttachFile,
  Cancel,
  EditOutlined,
  PaymentOutlined,
  QuestionAnswerOutlined,
  ViewComfy,
} from "@mui/icons-material";
import NextLink from "next/link";
import { useAuth } from "../../Context/AuthManager";
import { isAdmin, isWriter } from "../../helpers/User";
import { calculateOrderPrice } from "../../helpers/orders/pricing";
import { StripeContext } from "../../Context/Stripe";
import OrderStatusComponent from "./OrderStatusComponent";
import { Order, OrderResponse } from "../../../graphql/common";
import Dropdown from "../Dropdown";
import { getStatusOptions } from "../../helpers/utils";
import MessageContainer from "../messages/MessageContainer";
import { useEditOrder } from "../../helpers/orders/useEditOrder";

const Price = styled(Typography)`
  font-size: 1.25rem;
  background-color: ${({ theme }) => theme.palette.primary.light};
  padding: ${({ theme }) => `${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

type OrderDetailsComponentProps = {
  order: Order;
  hideEditButton?: boolean;
};
const OrderDetailsComponent = ({
  order,
  hideEditButton = false,
}: OrderDetailsComponentProps) => {
  const router = useRouter();
  const auth = useAuth();

  const { formik, loading } = useEditOrder({ orderId: order.orderId });

  const canRespond = useMemo(() => {
    if (!auth.localUser) return false;
    if (isAdmin(auth?.localUser)) return true;
    return !!isWriter(auth.localUser);
  }, [auth]);

  const showEditButton = ["DRAFT", "ACTIVE"].includes(order.status);

  const isOwner = useMemo(() => {
    return auth?.localUser?.orders?.some(
      (orderId) => orderId === order?.orderId
    );
  }, [auth, order]);

  const [editor, setEditor] = useState<EditorState>(() => {
    if (order && order.description) {
      return toEditorState(order.description);
    }
    return EditorState.createEmpty();
  });

  const handleEdit = () => {
    router.push(`/app/order/${order.orderId}/edit`);
  };

  const handleCancelOrder = async () => {
    const orderId = order.orderId;
    router.push(`/app/order/${orderId}/cancel`);
  };

  const handleCheckout = () => {
    router.push(`/app/order/${order.orderId}/checkout`);
  };

  const handleRespond = () => {
    router.push(`/app/order/${order.orderId}/respond`);
  };

  const totalPrice = calculateOrderPrice(order);

  const isPaid = useMemo(() => {
    let temp = false;
    if (order) {
      temp = order.price?.paymentStatus === "PAID";
    }
    return temp;
  }, [order]);

  const userIsAdmin = useMemo(() => {
    return auth.localUser?.roles?.some((role) => role?.name === "ADMIN");
  }, [auth]);

  const isClosed =
    order.status === "CANCELED" || order.price?.paymentStatus === "CANCELED";

  const orderResponses = useMemo(() => {
    let temp: OrderResponse[] = order.responses;

    if (order?.responses.length && !userIsAdmin) {
      temp = order.responses.filter((response) => {
        console.log("Published: ", response);
        return Boolean(response.published);
      });
    }

    return temp;
  }, [order]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: 2 }}
        maxWidth={"lg"}
        mt={2}
      >
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent={"space-between"}
            gap={3}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Grid item>
              <Grid container my={1}>
                {!isPaid && !isClosed && (
                  <Grid item>
                    <Price>Total Price: ${totalPrice}</Price>
                  </Grid>
                )}

                {(isPaid || isClosed) && (
                  <Grid item>
                    <OrderStatusComponent status={order.status} />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                justifyContent={"right"}
                gap={{ xs: 1, md: 3 }}
                flexDirection={"row"}
              >
                {isOwner && !isClosed && order.status !== "IN_PROGRESS" && order.status !== "COMPLETED" && (
                  <Grid item>
                    <Button
                      variant={"contained"}
                      startIcon={isPaid ? <Cancel /> : <PaymentOutlined />}
                      onClick={isPaid ? handleCancelOrder : handleCheckout}
                      color={isPaid ? "error" : "inherit"}
                    >
                      {isPaid ? "Cancel Order" : "Checkout"}
                    </Button>
                  </Grid>
                )}
                <Grid item>
                  {!hideEditButton && !isClosed && showEditButton && (
                    <Button
                      onClick={handleEdit}
                      variant={"outlined"}
                      startIcon={<EditOutlined />}
                    >
                      Edit
                    </Button>
                  )}
                </Grid>
                {canRespond && (
                  <Grid item>
                    <Button
                      variant={"outlined"}
                      startIcon={<QuestionAnswerOutlined />}
                      onClick={handleRespond}
                    >
                      Respond
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {userIsAdmin && (
          <Grid item xs={12}>
            <Grid container gap={3}>
              <Grid item xs={3}>
                <Dropdown
                  label="Set status"
                  options={getStatusOptions()}
                  value={formik.values.status}
                  onChange={(value) => formik.setFieldValue("status", value)}
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={formik.submitForm}
                  disabled={formik.isSubmitting || loading}
                >
                  Save order
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Card>
                <CardContent>
                  <ListItem>
                    <ListItemText primary={order.title} secondary={"Title"} />
                  </ListItem>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Paper sx={{ p: 3 }}>
                <CustomEditor
                  readView={true}
                  value={editor}
                  onChange={(content: EditorState) => setEditor(content)}
                />
              </Paper>
            </Grid>
            {order.attachments && order.attachments.length ? (
              <Grid item>
                <Paper sx={{ p: 3 }}>
                  <AttachmentList
                    hideDeleteButton={hideEditButton}
                    parentEntityId={order.orderId}
                    pageType={"ORDER"}
                    attachments={
                      order.attachments.length
                        ? (order.attachments as Attachment[])
                        : []
                    }
                  />
                </Paper>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: (theme) => theme.spacing(5),
                }}
              >
                <ListItem>
                  <ListItemText
                    primary={order.numberOfPages}
                    secondary={"Number of Pages"}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={dayjs(order.deadline).format("DD, MMM YYYY")}
                    secondary={"Deadline"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={order.type}
                    secondary={"Type of Work"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={order.writingStyle}
                    secondary={"Writing Style"}
                  />
                </ListItem>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ width: "100%" }}>
            <List>
              {orderResponses?.map(
                (response) =>
                  response?.createdBy?.firstName && (
                    <ListItem
                      sx={{ width: 400 }}
                      key={response?.id}
                      secondaryAction={
                        <NextLink href={`/app/respond/${response.id}`} passHref>
                          <Button variant={"text"} startIcon={<ViewComfy />}>
                            View Details
                          </Button>
                        </NextLink>
                      }
                    >
                      <ListItemIcon>
                        {response.responseType &&
                          response.responseType === "attachment" && (
                            <AttachFile />
                          )}
                        {response.responseType === "text" && (
                          <AssignmentOutlined />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`Answer by ${response?.createdBy?.firstName}`}
                        secondary={dayjs(response.createdAt).format(
                          "MMM DD, YYYY"
                        )}
                      />
                    </ListItem>
                  )
              )}
            </List>
          </Card>
        </Grid>
        {isPaid && !isClosed ? (
          <Grid item xs={12} id="messages">
            <MessageContainer orderId={order.orderId} />
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
};

const Wrapper = (props: OrderDetailsComponentProps) => (
  <StripeContext>
    <OrderDetailsComponent {...props} />
  </StripeContext>
);

export default Wrapper;
