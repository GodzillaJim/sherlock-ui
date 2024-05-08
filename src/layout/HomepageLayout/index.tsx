import { Grid, styled } from "@mui/material";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";

type HomepageLayoutProps = {
  children: ReactNode;
};

const Wrapper = styled(Grid)``;


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
