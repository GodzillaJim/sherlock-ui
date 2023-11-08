import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";

const BackButtonWrapper = styled("div")({
  maxWidth: "120px",
});

const GoBackComponent = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <BackButtonWrapper>
      <ListItemButton onClick={handleGoBack}>
        <ListItemIcon sx={{ minWidth: 30 }}>
          <ArrowLeftOutlined />
        </ListItemIcon>
        <ListItemText primary={"Go back"} />
      </ListItemButton>
    </BackButtonWrapper>
  );
};

export default GoBackComponent;
