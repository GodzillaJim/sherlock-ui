import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import {
  AlarmOn,
  EditOutlined,
  InfoOutlined,
  PagesOutlined,
  QuestionAnswerOutlined,
  Title,
} from "@mui/icons-material";
import dayjs from "dayjs";
import StringUtility, {
  getStatusColor,
  GetStatusColorProps,
} from "../../helpers/utils";
import { Order } from "../../../graphql/common";

type SummaryCardType = {
  order: Order;
};

const CustomBadge = styled("div")<{ status: GetStatusColorProps }>(
  ({ theme, status }) => `
  position: absolute;
  margin-right: auto;
  padding: ${theme.spacing(0.8)};
  zIndex: 10;
  background-color: ${status.background};
  color: ${status.color};
  border-radius: ${theme.shape.borderRadius}px;
  margin: 0 0 ${theme.spacing(1.5)} 0;
  cursor: pointer;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  `
);
const SummaryCard = ({ order }: SummaryCardType) => {
  const router = useRouter();

  const cardRef = useRef<HTMLDivElement>(null);
  const handleClick = (type: "view" | "edit") => {
    router.push(`/app/order/${order.orderId}/${type}`).then();
  };

  const status = getStatusColor(order.status);

  return (
    <Card ref={cardRef}>
      <Tooltip title={status.tooltipMessage}>
        <CustomBadge status={status}>
          <Typography variant={"caption"}>{order.status}</Typography>
        </CustomBadge>
      </Tooltip>

      <CardContent sx={{ p: 2 }}>
        <Grid container spacing={2} direction={"column"}>
          <Grid item>
            <List>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 35 }}>
                  <Title />
                </ListItemIcon>
                <ListItemText primary={order.title} secondary={"Title"} />
              </ListItem>
            </List>
          </Grid>
          <Divider flexItem />
          <Grid item>
            <Grid container>
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <AlarmOn />
                    </ListItemIcon>
                    <ListItemText
                      primary={dayjs(order.deadline).format("MMM, DD YYYY")}
                      secondary={"Deadline"}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Divider flexItem orientation={"vertical"} />
              <Grid item>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <EditOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={StringUtility.toSentenceCase(order.type)}
                    secondary={"Project type"}
                  />
                </ListItem>
              </Grid>
              <Divider flexItem orientation={"vertical"} />
              <Grid item>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <PagesOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ textAlign: "center" }}
                    primary={order.numberOfPages}
                    secondary={"Pages"}
                  />
                </ListItem>
              </Grid>
              <Divider flexItem orientation={"vertical"} />
              <Grid item>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <QuestionAnswerOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={StringUtility.toSentenceCase(order.writingStyle)}
                    secondary={"Style"}
                  />
                </ListItem>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActionArea component={"div"}>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              m: 0.5,
              p: 0.5,
            }}
          >
            <div>
              <Typography lineHeight={2}>
                Total responses: {order.responses?.length}
              </Typography>
            </div>
            <div>
              <Button
                startIcon={<InfoOutlined />}
                onClick={() => handleClick("view")}
                sx={{ mr: 2 }}
              >
                Details
              </Button>
              <Button
                startIcon={<EditOutlined />}
                onClick={() => handleClick("edit")}
              >
                Edit
              </Button>
            </div>
          </Box>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default SummaryCard;
