import { Grid, styled, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import CustomNavbar from "./CustomNavbar";
import { Box } from "@mui/system";

type HomepageLayoutProps = {
  children: ReactNode;
};

const Wrapper = styled(Grid)`
  background: rgb(2, 0, 10);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 10, 1) 0%,
    rgba(63, 81, 181, 1) 93%
  );
`;

const SectionTitle = styled(Typography)(
  ({ theme }) => `
font-size: 18px;
padding: ${theme.spacing(0.7)} ${theme.spacing(3)};
color: ${theme.palette.getContrastText(theme.palette.primary.main)};
font-weight: 500;
font-family: "Inter" sans serif;
background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) -17.5%, rgba(255, 255, 255, 0) 118.75%);
width: fit-content;
border-radius: 50px;
letter-spacing: 0.9px;
`
);

const HomepageLayout = ({ children }: HomepageLayoutProps) => {
  return (
    <Wrapper container flexDirection={"column"}>
      <Grid item>
        <Grid container maxWidth={"md"} flexDirection={"column"} mx="auto">
          <Grid item>
            <CustomNavbar />
          </Grid>
          <Grid item>
            <Box display="flex" flexDirection={"column"} mt={24} alignItems={'center'}>
              <div>
                <SectionTitle>
                  You ultimate content writing partner
                </SectionTitle>
              </div>
            </Box>
          </Grid>
          {children}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default HomepageLayout;
