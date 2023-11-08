import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

type NotFoundProps = {
  message: string;
};
const NotFound = ({ message }: NotFoundProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
        <ErrorOutline style={{ fontSize: 60, color: "#f44336" }} />
        <Typography variant="h4" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="subtitle1">{message}</Typography>
      </Paper>
    </Box>
  );
};

export default NotFound;
