import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccountCircle, Send } from "@mui/icons-material";
import useOrderMessages from "../../helpers/orders/useOrderMessages";
import { getAccountTypeText } from "../../helpers/Auth";
import { User } from "../../../graphql/common";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type MessageContainerProps = {
  orderId: string;
};
const MessageContainer = ({ orderId }: MessageContainerProps) => {
  const { formik, loading, messages } = useOrderMessages(orderId);

  return (
    <Grid container flexDirection={"column"} mt={3}>
      <Grid item>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant={"h6"}>Leave a message here.</Typography>
            }
            secondary={
              <Typography variant={"subtitle1"}>
                Communicate additional information here. Once a writer starts
                working on an order, you can no longer make changes. Use this
                section to communicate additional instructions. Also, a writer
                will leave you a message here in the event they need additional
                clarification.
              </Typography>
            }
          />
        </ListItem>
      </Grid>
      <Grid item>
        <List>
          {messages.map((message, index) => {
            const picture = message.sender.picture;
            const name = `${message.sender.firstName} ${message.sender.lastName}`;
            const roleText = getAccountTypeText(message.sender as User);

            return (
              <React.Fragment key={message.id}>
                <ListItem alignItems={"flex-start"}>
                  <ListItemAvatar>
                    {picture ? (
                      <Avatar
                        alt={
                          message.sender.firstName ||
                          message.sender.lastName ||
                          "account-user"
                        }
                        src={picture}
                      />
                    ) : (
                      <Avatar>
                        <AccountCircle />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component={"span"}
                        variant={"subtitle2"}
                        color={"text.primary.main"}
                      >
                        {`${name} (${roleText})`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Tooltip
                          title={dayjs(message.createdAt).format(
                            "DD, MMM YYYY"
                          )}
                        >
                          <Typography
                            component={"span"}
                            variant={"caption"}
                            color={"text.secondary.main"}
                          >
                            {dayjs(message.createdAt).fromNow()}
                          </Typography>
                        </Tooltip>
                        <Typography component={"p"}>
                          {message.message}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < messages.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Grid>
      <Grid item>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container flexDirection={"column"}>
            <Grid item xs={12}>
              <Grid container gap={2}>
                <Grid item xs={10}>
                  <TextField
                    name={"message"}
                    placeholder={"Leave a message"}
                    multiline
                    rows={4}
                    fullWidth
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.message && formik.errors.message)}
                    helperText={
                      formik.touched.message && formik.errors.message
                        ? formik.errors.message
                        : undefined
                    }
                  />
                </Grid>
                <Grid item>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"baseline"}
                    height={"100%"}
                    justifyContent={"end"}
                  >
                    <Button
                      variant={"contained"}
                      startIcon={<Send />}
                      type={"submit"}
                      disabled={formik.isSubmitting || loading}
                    >
                      Send
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default MessageContainer;
