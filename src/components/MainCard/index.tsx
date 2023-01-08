import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import React from "react";

type MainCardProps = {
  border?: boolean;
  boxShadow?: string;
  children?: JSX.Element;
  content?: boolean | JSX.Element;
  contentSX?: SxProps;
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: JSX.Element;
  shadow?: CSSProperties["boxShadow"];
  sx?: SxProps;
  title?: string | JSX.Element;
};
const MainCard = ({
  border,
  elevation,
  shadow,
  boxShadow,
  darkTitle,
  title,
  secondary,
  divider,
  contentSX,
  content,
  children,
}: MainCardProps) => {
  const theme = useTheme();
  return (
    <Card
      elevation={elevation || 0}
      sx={{
        border: border ? `1px solid` : "none",
        borderRadius: 2,
        borderColor:
          theme.palette.mode === "dark"
            ? theme.palette.divider
            : theme.palette.grey.A700,
        boxShadow:
          boxShadow && (!border || theme.palette.mode === "dark")
            ? shadow || theme.shadows[3]
            : "inherit",
        ":hover": {
          boxShadow: boxShadow ? shadow || theme.shadows[3] : "inherit",
        },
        "& pre": {
          m: 0,
          p: "16px !important",
          fontFamily: theme.typography.fontFamily,
          fontSize: "0.75rem",
        },
      }}
    >
      {!darkTitle && title && (
        <CardHeader
          action={secondary}
          titleTypographyProps={{ variant: "subtitle1" }}
          title={title}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          title={<Typography variant="h3">{title}</Typography>}
          action={secondary}
        />
      )}
      {title && divider && <Divider />}
      {content && <CardContent sx={contentSX}></CardContent>}
      {!content && children}
    </Card>
  );
};

export default MainCard;
