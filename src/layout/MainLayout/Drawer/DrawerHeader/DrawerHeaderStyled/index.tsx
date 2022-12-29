import React from "react";
import { Box, useTheme } from "@mui/material";

type DrawerHeaderStyledProps = {
  open: boolean;
  children: JSX.Element;
};
const DrawerHeaderStyled = ({ open, children }: DrawerHeaderStyledProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "flex-start" : "center",
        paddingLef: theme.spacing(open ? 3 : 0),
      }}
    >
      {children}
    </Box>
  );
};

export default DrawerHeaderStyled;
