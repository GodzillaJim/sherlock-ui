import {
  AbcOutlined,
  Contacts,
  DesignServices,
  Home,
  Menu as MenuIcon,
  MenuOpen,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Slide,
  styled,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import NextLink from "next/link";
import LogoAndText from "../../components/common/logos/LogoAndText";
import NavItem from "./NavItem";


const MenuWrapper = styled(Box)(
  ({ theme }) => `
  display: none; 
  gap: ${theme.spacing(2)};
  ${theme.breakpoints.down("sm")} {
    display: none;
  }
`
);

const drawerWidth = 240;

const menuItems = [
  {
    label: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    label: "Services",
    url: "/services",
    icon: <DesignServices />,
  },
  {
    label: "About",
    url: "/about",
    icon: <AbcOutlined />,
  },
  {
    label: "Contact",
    url: "/contact",
    icon: <Contacts />,
  },
];

type Props = {
  children: React.ReactElement;
};
const HideOnScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
};

const CustomNavbarComponent = (_: unknown, ref: ForwardedRef<HTMLDivElement>) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [elevate, setElevate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      // Set the navbar elevation based on the scroll position
      setElevate(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: (theme) => theme.palette.background.paper,
        zIndex: 100,
      }}
    >
      <Box my={2}>
        <LogoAndText size="small" />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <NavItem {...item} key={item.label} drawer />
        ))}
      </List>
    </Box>
  );

  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  const Icon = mobileOpen ? MenuOpen : MenuIcon;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex" }}>
      <HideOnScroll>
        <AppBar
          component="nav"
          sx={{
            backgroundColor: elevate ? "#fff" : "transparent",
            transition: "background-color 300ms",
            display: isMobile && mobileOpen ? "none" : "flex",
          }}
          elevation={elevate ? 1 : 0}
          ref={ref}
        >
          <Toolbar sx={{ maxWidth: "xl", mx: "auto", width: "100%", my: 1 }}>
            <Box display={"flex"} justifyContent={"space-between"} width="100%">
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={{ xs: "100%", sm: "auto" }}
              >
                <Box>{!mobileOpen ? <LogoAndText size="small" /> : ""}</Box>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  // sx={{ mr: 2, display: { sm: "none" } }}
                  sx={{ display: "none" }}
                >
                  <Icon
                    sx={{
                      color: (theme) =>
                        theme.palette.getContrastText(
                          theme.palette.background.default
                        ),
                    }}
                  />
                </IconButton>
              </Box>
              <MenuWrapper id="main-menu-bar">
                {menuItems.map((item) => (
                  <NavItem {...item} key={item.label} />
                ))}
              </MenuWrapper>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex", alignItems: "center" },
                }}
              >
                <Box
                  gap={2}
                  sx={{
                    display: { xs: "none", sm: "flex", alignItems: "center" },
                  }}
                >
                  <NextLink
                    href={"/auth/signup?next=/app"}
                    legacyBehavior
                    passHref
                  >
                    <Button
                      sx={{ borderRadius: "25px" }}
                      variant="contained"
                      color="secondary"
                      size="large"
                    >
                      Get started
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <nav style={{ display: "none" }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              zIndex: 10000,
              background: "background.paper",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

const CustomNavbar = forwardRef(CustomNavbarComponent);
export default CustomNavbar;
