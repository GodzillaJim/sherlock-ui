import React from "react"
import { Error, FileDownload } from "@mui/icons-material";
import {
  Button,
  Modal,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Attachment } from "../../generated";

type DownloadFileProps = {
  attachment: Attachment;
  disabled?: boolean;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const DownloadFile = ({ attachment, disabled }: DownloadFileProps) => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleDownload = async () => {
    setShowError(false);
    setLoading(false);

    if (attachment.location) {
      fetch(attachment.location)
        .then((response) => response.blob())
        .then((blob) => {
          const filename = attachment.name || "attachment-" + attachment.key;
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
        })
        .catch(() => {
          setShowError(true);
        });
    }
  };

  return (
    <>
      <Button
        startIcon={<FileDownload />}
        onClick={handleDownload}
        disabled={loading || disabled}
      >
        Download
      </Button>
      <Modal
        open={showError}
        onClose={() => setShowError(false)}
        aria-labelledBy="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Error color="error" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography color="error.main">Sorry!</Typography>}
            />
          </ListItem>
          <Typography>
            We couldn&apos;t get that file this time. Please reload the page and try
            again.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default DownloadFile;
