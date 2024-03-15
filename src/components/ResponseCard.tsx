import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import NextLink from "next/link";
import { ContentPaste, QuestionAnswer } from "@mui/icons-material";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { OrderResponse } from "../../graphql/common";

type ResponseCardProps = {
  response: OrderResponse;
};

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  cursor: "pointer",
  padding: 0,
  textDecoration: "none",
}));
const ResponseCard = ({ response }: ResponseCardProps) => {
  const question = response.question;

  return (
    <NextLink
      href={`/app/respond/${response.id}`}
      passHref
      style={{ textDecoration: "none" }}
    >
      <StyledCard>
        <CardContent sx={{ p: 0 }}>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary={question?.title} secondary={"Question"} />
          </ListItem>
        </CardContent>
        <Divider />
        <CardActionArea>
          <Grid container>
            <Grid item>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <ClockCircleOutlined />
                </ListItemIcon>
                <ListItemText
                  secondary={"Last updated"}
                  primaryTypographyProps={{ variant: "caption" }}
                  primary={dayjs(response.updatedAt).format("DD, MMM YYYY")}
                />
              </ListItem>
            </Grid>
            <Divider orientation={"vertical"} flexItem />
            <Grid item>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <ContentPaste />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: "caption" }}
                  secondary={"Response type"}
                  primary={
                    response?.responseType === "text" ? "Text" : "Attachment"
                  }
                />
              </ListItem>
            </Grid>
          </Grid>
        </CardActionArea>
      </StyledCard>
    </NextLink>
  );
};

export default ResponseCard;
