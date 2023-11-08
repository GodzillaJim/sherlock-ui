import { AttachmentSharp, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: theme.palette.divider,
    height: 300,
    padding: theme.spacing(2),
    cursor: "pointer",
    borderRadius: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily || "inherit",
    transitions: "all .3s",
  },
}));

type FileUploaderProps = {
  onChange: (files: File[]) => void;
  files: Array<File>;
  disabled?: boolean;
};
const FileUploader = ({ onChange, files, disabled }: FileUploaderProps) => {
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();

  const removeFile = (file: File) => {
    const newFiles = files.filter(({ name }) => file.name !== name);
    onChange(newFiles);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange([...files, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Button
          variant="text"
          startIcon={<AttachmentSharp />}
          onClick={() => setShowModal(!showModal)}
          disabled={disabled}
        >
          <Typography variant="h5">Add Attachments</Typography>
        </Button>
        <Divider />
        <Modal
          aria-aria-labelledby="file-upload-modal-title"
          aria-aria-describedby="file-upload-modal-description"
          open={showModal}
          onClose={() => setShowModal(!showModal)}
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
            <Grid
              container
              direction={"column"}
              sx={{ height: "100%" }}
              spacing={3}
            >
              <Grid item>
                <Typography>Select files</Typography>
              </Grid>
              <Divider />
              <Grid item>
                <div {...getRootProps()} className={classes.container}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drag & drop some files here, or click to select files</p>
                  )}
                </div>
              </Grid>
              <Grid sx={{ width: "100%" }} item>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <div>
                    <Button
                      variant="text"
                      color="info"
                      sx={{ pointerEvents: "none" }}
                    >
                      Files: {files.length}
                    </Button>
                  </div>
                  <div>
                    <Button variant="text" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
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
  );
};

export default FileUploader;
