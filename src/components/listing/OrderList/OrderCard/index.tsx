import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { Order } from "../../../../generated";
import { editorStateToHtml, toEditorState } from "../../../../helpers/editor";
import dayjs from "dayjs";
import { ClockCircleOutlined, EditOutlined } from "@ant-design/icons";
import { AccountTreeOutlined, ArticleOutlined } from "@mui/icons-material";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { useRouter } from "next/router";

const StyledParagraph = styled("p")(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingRight: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  backgroundColor: theme.palette.background.default,
}));

type OrderCardProps = {
  order: Order;
};

const maxDescriptionLength = 500;
const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();

  const handleDetails = () => {
    router.push({ pathname: `/public/listing/${order.orderId}` });
  };
  const getContent = () => {
    if (!order.description) return "No description";
    const editorState = toEditorState(order.description);
    const rawContent = convertToRaw(editorState.getCurrentContent());

    let text = "";

    rawContent.blocks.forEach((block) => {
      text += block.text;
    });

    const limitedText =
      text.length > maxDescriptionLength
        ? text.substring(0, maxDescriptionLength) + "..."
        : text;
    const newContentState = ContentState.createFromText(limitedText);
    const newEditorState = EditorState.createWithContent(newContentState);
    return editorStateToHtml(newEditorState);
  };

  useEffect(() => {
    console.log("Content: ");
  });
  return (
    <Card>
      <CardContent>
        <Grid container direction={"column"}>
          <Grid item>
            <Typography variant={"caption"}>{order.title}</Typography>
            <Divider />
          </Grid>
          <Grid item>
            <StyledParagraph
              dangerouslySetInnerHTML={{ __html: getContent() }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          direction={"row"}
          gap={3}
          justifyContent={"space-around"}
        >
          <Grid item>
            <ListItem>
              <ListItemIcon sx={{ minWidth: "28px" }}>
                <EditOutlined />
              </ListItemIcon>
              <ListItemText
                secondary={<small>Writing style</small>}
                primary={
                  <Typography variant={"caption"}>
                    {order.writingStyle}
                  </Typography>
                }
              />
            </ListItem>
          </Grid>
          <Grid item>
            <ListItem>
              <ListItemIcon sx={{ minWidth: "28px" }}>
                <ArticleOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={"caption"}>{order.type}</Typography>
                }
                secondary={<small>Paper type</small>}
              />
            </ListItem>
          </Grid>
          <Grid item>
            <ListItem>
              <ListItemIcon sx={{ minWidth: "28px" }}>
                <ClockCircleOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={"caption"}>
                    {dayjs(order.deadline).format("MMM DD, YYYY")}
                  </Typography>
                }
                secondary={<small>Deadline</small>}
              />
            </ListItem>
          </Grid>
          <Grid item>
            <ListItem>
              <Button
                type={"button"}
                onClick={handleDetails}
                endIcon={<AccountTreeOutlined />}
              >
                Details
              </Button>
            </ListItem>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
