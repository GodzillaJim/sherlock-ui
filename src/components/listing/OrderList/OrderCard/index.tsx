import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Order } from "../../../../generated";
import { editorStateToHtml, toEditorState } from "../../../../helpers/editor";
import dayjs from "dayjs";

type OrderCardProps = {
  order: Order;
};
const OrderCard = ({ order }: OrderCardProps) => {
  const getContent = () => {
    if (!order.description) return "No description";
    const editorState = toEditorState(order.description);
    return editorStateToHtml(editorState);
  };
  return (
    <Card>
      <CardContent>
        <Grid container direction={"column"}>
          <Grid item>
            <Typography variant={"caption"}>{order.title}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body1"}>
              <span dangerouslySetInnerHTML={{ __html: getContent() }} />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container direction={"row"} gap={3}>
          <Grid item>
            <Typography variant={"caption"}>{order.writingStyle}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"caption"}>{order.type}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"caption"}>
              {dayjs(order.deadline).format("MMM DD, YYYY")}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant={"text"}>Details</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
