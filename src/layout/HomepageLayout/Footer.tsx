import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";

const Wrapper = styled(Box)``;
const Footer: React.FC = () => {
  return (
    <Wrapper
      bgcolor="text.secondary"
      color="white"
      mt={1}
      sx={{
        bottom: 0,
        height: 45,
        boxShadow: 1,
      }}
    >
      <Grid
        container
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item>
          <Typography>
            WriteSpear.com &reg; {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Footer;
