import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccountCircle, Close, Send } from "@mui/icons-material";
import useOrderMessages from "../../helpers/orders/useOrderMessages";
import { getAccountTypeText } from "../../helpers/Auth";
import { Message, User } from "../../../graphql/common";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FileOutlined } from "@ant-design/icons";
import FileUploader from "../FileUploader";
import { v4 } from "uuid";

dayjs.extend(relativeTime);

type MessageContainerProps = {
  orderId: string;
};

const MessageContainer = ({ orderId }: MessageContainerProps) => {
  const [showFileModal, setShowFileModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);
  const { formik, loading, messages, files, setFiles } =
    useOrderMessages(orderId);

  const removeFile = (file: File) => {
    const newFileList = files.filter((f) => f.name !== file.name);
    setFiles(newFileList);
  };

  const handleChangeFiles = (newFiles: File[]) => {
    setFiles(newFiles);
  };

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
                      <Grid container flexDirection={"column"}>
                        <Grid item>
                          <Grid container flexDirection={"column"}>
                            <Grid item>
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
                            </Grid>
                            <Grid item>
                              <Typography component={"p"}>
                                {message.message}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        {message.attachments.length ? (
                          <Grid item>
                            <Button
                              onClick={() => {
                                setShowAttachmentModal(!showAttachmentModal);
                                setActiveMessage(message as Message);
                              }}
                            >
                              <Typography variant={"caption"}>
                                Attachments ({message.attachments.length})
                              </Typography>
                            </Button>
                          </Grid>
                        ) : (
                          ""
                        )}
                      </Grid>
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
                  <Grid container flexDirection={"column"}>
                    <Grid item>
                      <TextField
                        name={"message"}
                        placeholder={"Leave a message"}
                        multiline
                        rows={4}
                        fullWidth
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={
                          !!(formik.touched.message && formik.errors.message)
                        }
                        helperText={
                          formik.touched.message && formik.errors.message
                            ? formik.errors.message
                            : undefined
                        }
                      />
                    </Grid>
                    <Grid item>
                      {files.length ? (
                        <Button
                          variant={"text"}
                          onClick={() => setShowFileModal(!showFileModal)}
                        >
                          <Typography variant={"caption"}>
                            Attachments ({files.length})
                          </Typography>
                        </Button>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"baseline"}
                    height={"100%"}
                    justifyContent={"end"}
                  >
                    <div>
                      <FileUploader
                        onChange={handleChangeFiles}
                        files={files}
                        hideUploads
                        anchor={(onClick) => (
                          <Button
                            variant={"contained"}
                            color={"inherit"}
                            startIcon={<FileOutlined />}
                            sx={{ width: 113 }}
                            onClick={onClick}
                          >
                            Upload
                          </Button>
                        )}
                      />
                    </div>

                    <Button
                      variant={"contained"}
                      startIcon={<Send />}
                      type={"submit"}
                      sx={{ width: 113 }}
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
      <Modal
        open={showFileModal}
        onClose={() => setShowFileModal(!showFileModal)}
      >
        <Paper
          sx={{
            p: 3,
            width: "50%",
            top: "25%",
            position: "relative",
            margin: "auto",
          }}
        >
          <Grid container flexDirection={"column"} gap={1}>
            <Grid item>
              <Typography variant={"h6"}>Uploads</Typography>
            </Grid>
            <Grid item>
              <List>
                {files.map((file, index) => {
                  return (
                    <ListItem
                      key={`item-${v4()}-${file.name}-${index + 1}`}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => removeFile(file)}
                        >
                          <Close />
                        </IconButton>
                      }
                    >
                      <ListItemText>
                        <Typography variant="caption">{`${index + 1}. ${
                          file.name
                        }`}</Typography>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Modal
        open={showAttachmentModal}
        onClose={() => setShowAttachmentModal(!showAttachmentModal)}
      >
        <Paper
          sx={{
            p: 3,
            width: "50%",
            top: "25%",
            position: "relative",
            margin: "auto",
          }}
        >
          <Grid container flexDirection={"column"} gap={1}>
            <Grid item>
              <Typography variant={"h6"}>Attachments</Typography>
            </Grid>
            <Grid item>
              <List>
                {activeMessage?.attachments.map((attachment, index) => {
                  return (
                    <ListItem
                      key={`item-${v4()}-${attachment.name}-${index + 1}`}
                    >
                      <ListItemText>
                        <Typography variant="caption">{`${index + 1}. ${
                          attachment.name
                        }`}</Typography>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default MessageContainer;
