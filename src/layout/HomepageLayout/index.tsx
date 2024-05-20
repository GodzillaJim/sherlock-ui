import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";
import { SettingsOutlined } from "@mui/icons-material";

type HomepageLayoutProps = {
  children: ReactNode;
};

const Wrapper = styled(Grid)``;

const StyledDevBanner = styled(Box)(
  ({ theme }) => `
  background: ${theme.palette.error.main};
  height: 30px;
  color: ${theme.palette.getContrastText(theme.palette.error.main)};
  min-width: 100vw;
  position: fixed;
  top: 0;
  z-index: 10000;
  box-shadow: ${theme.shadows[1]};
  display: flex;
  justify-content: center;
  align-items: center;
`
);

const HomepageLayout = ({ children }: HomepageLayoutProps) => {
  const [navBarHeight, setNavBarHeight] = useState(60);
  const navBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current?.clientHeight);
    }
  }, [navBarRef]);

  return (
    <Wrapper
      container
      flexDirection={"column"}
      width={"100%"}
      className={"layout-root"}
    >
      <Grid item>
        <StyledDevBanner>
          <Button
            variant={"text"}
            startIcon={
              <SettingsOutlined
                sx={{
                  color: (theme) =>
                    theme.palette.getContrastText(theme.palette.error.main),
                }}
              />
            }
          >
            <Typography
              sx={{
                textTransform: "initial",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.error.main),
              }}
              variant={"caption"}
            >
              App is in development.
            </Typography>
          </Button>
        </StyledDevBanner>
      </Grid>
      <Grid item width={"100%"}>
        <Grid
          container
          maxWidth={"xl"}
          flexDirection={"column"}
          mx="auto"
          width={"100%"}
          mb={8}
        >
          <Grid item height={navBarHeight} width={"100%"}>
            <CustomNavbar ref={navBarRef} />
          </Grid>
          <Grid
            item
            width={"100%"}
            sx={{ minHeight: "80vh" }}
            className={"layout-content-root"}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Wrapper>
  );
};

export default HomepageLayout;
