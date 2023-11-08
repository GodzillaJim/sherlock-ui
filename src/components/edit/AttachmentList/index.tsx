import React from "react";
import { Attachment } from "../../../generated";
import { List, styled } from "@mui/material";
import AttachmentItem from "../AttachmentItem";
import { v4 } from "uuid";
import { AttachmentPageType } from "../../../helpers/orders/useDeleteAttachment";

type AttachmentListProps = {
  attachments: Attachment[];
  hideDeleteButton?: boolean;
  pageType: AttachmentPageType;
  parentEntityId: string;
};

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "grid",
  gridAutoFlow: "row",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    gridAutoFlow: "row",
    gridTemplateColumns: `repeat(3, 1fr)`,
  },
  maxHeight: 400,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },

  "&::-webkit-scrollbar-thumb": {
    borderRadius: "4px",
    background: theme.palette.grey[400],
  },

  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.grey[500],
  },

  "&::-webkit-scrollbar-track": {
    borderRadius: "4px",
    background: theme.palette.grey[300],
  },
}));
const AttachmentList = ({
  attachments,
  hideDeleteButton,
  pageType,
  parentEntityId,
}: AttachmentListProps) => {
  return (
    <StyledList>
      {attachments.map((attachment, index) => (
        <AttachmentItem
          hideDeleteButton={hideDeleteButton}
          key={`key-${v4()}`}
          attachment={attachment}
          index={index}
          type={pageType}
          parentEntityId={parentEntityId}
        />
      ))}
    </StyledList>
  );
};

export default AttachmentList;
