import React from "react";
import { AppBar, Grid, IconButton, styled, Toolbar } from "@mui/material";
import HeaderContent from "./HeaderContent";
import { Menu, MenuOpen } from "@mui/icons-material";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  height: 56,
  borderBottom: "1px",
  borderColor: theme.palette.divider,

  [theme.breakpoints.down('md')]: {
    position: 'relative'
  }
}));

type HeaderProps = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const Header = ({ open, handleDrawerToggle }: HeaderProps) => {
  const isServerSide = typeof window === undefined;

  const mainHeader = (
    <Toolbar>
      <Grid container sx={{ width: "100%" }} justifyContent={"space-between"}>
        <Grid item>
          <IconButton
            disableRipple
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            color="secondary"
            sx={{
              color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
              ml: { xs: 0, lg: -2 },
              minHeight: 40,
              minWidth: 40,
            }}
          >
            {open ? <MenuOpen /> : <Menu />}
          </IconButton>
        </Grid>
        <Grid item>
          <HeaderContent />
        </Grid>
      </Grid>
    </Toolbar>
  );

  return (
    <>
      {!isServerSide && (
        <CustomAppBar position="fixed" color="primary" elevation={0}>
          {mainHeader}
        </CustomAppBar>
      )}
    </>
  );
};

export default Header;
