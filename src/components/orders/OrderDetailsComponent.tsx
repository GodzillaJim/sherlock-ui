import { Attachment } from "../../generated";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
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
} from "@mui/material";
import CustomEditor from "../CustomEditor";
import AttachmentList from "../edit/AttachmentList";
import dayjs from "dayjs";
import { Order } from "../../../graphql/common";
import {
  AssignmentOutlined,
  AttachFile,
  EditOutlined,
  Publish,
  QuestionAnswerOutlined,
  Unpublished,
  ViewComfy,
} from "@mui/icons-material";
import NextLink from "next/link";
import { usePublishOrderMutation } from "../../Apollo/schema/PublishOrder.generated";
import { useUnPublishOrderMutation } from "../../Apollo/schema/UnPublishOrder.generated";
import { GetOrderDocument } from "../../Apollo/schema/GetOrder.generated";
import { GetMyOrdersDocument } from "../../Apollo/schema/GetMyOrders.generated";
import { useAuth } from "../../Context/AuthManager";
import { isAdmin, isWriter } from "../../helpers/User";

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

  const canRespond = useMemo(() => {
    if (!auth.localUser) return false;
    if (isAdmin(auth?.localUser)) return true;
    return !!isWriter(auth.localUser);
  }, [auth]);

  const isOwner = useMemo(() => {
    return auth?.localUser?.orders?.some(
      (orderId) => orderId === order?.orderId
    );
  }, [auth, order]);

  const [publishOrder, { loading: publishing, error: publishError }] =
    usePublishOrderMutation({
      refetchQueries: [GetOrderDocument, GetMyOrdersDocument],
    });

  const [unPublishOrder, { loading: unPublishing, error: unPublishError }] =
    useUnPublishOrderMutation({
      refetchQueries: [GetOrderDocument, GetMyOrdersDocument],
    });

  const [editor, setEditor] = useState<EditorState>(() => {
    if (order && order.description) {
      return toEditorState(order.description);
    }
    return EditorState.createEmpty();
  });

  const handleEdit = () => {
    router.push(`/app/order/${order.orderId}/edit`);
  };

  const handlePublishOrder = async () => {
    const orderId = order.orderId;
    await publishOrder({ variables: { orderId } });
  };

  const handleUnPublishOrder = async () => {
    const orderId = order.orderId;
    await unPublishOrder({ variables: { orderId } });
  };

  useEffect(() => {
    if (publishError) {
      alert(publishError.message);
    }

    if (unPublishError) {
      alert(unPublishError.message);
    }
  }, [publishError, unPublishError]);

  const handleRespond = () => {
    router.push(`/app/order/${order.orderId}/respond`);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent={"right"}
            gap={3}
            flexDirection={"row"}
          >
            {isOwner && (
              <Grid item>
                {!order.published && (
                  <Button
                    variant={"outlined"}
                    startIcon={<Publish />}
                    onClick={handlePublishOrder}
                    disabled={publishing}
                  >
                    Publish
                  </Button>
                )}
                {order.published && (
                  <Button
                    variant={"outlined"}
                    startIcon={<Unpublished />}
                    onClick={handleUnPublishOrder}
                    disabled={unPublishing}
                  >
                    UnPublish
                  </Button>
                )}
              </Grid>
            )}
            <Grid item>
              {!hideEditButton && (
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
              {order.responses?.map(
                (response, index) =>
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
                        {response.responseType === "attachment" && (
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
      </Grid>
    </div>
  );
};

export default OrderDetailsComponent;
