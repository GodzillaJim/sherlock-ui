import { Chip, Stack, Typography } from "@mui/material";
import React from "react";
import DrawerHeaderStyled from "./DrawerHeaderStyled";

type DrawerHeaderProps = {
  open: boolean;
};
const DrawerHeader = ({ open }: DrawerHeaderProps) => {
  return (
    <DrawerHeaderStyled open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Jimna</Typography>
        <Chip
          label="Jim"
          size="small"
          sx={{
            height: 16,
            "& .MuiChip-label": { fontSize: "0.625rem", py: 0.25 },
          }}
          component="a"
          href="#"
          target={"_blank"}
          clickable
        />
      </Stack>
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
