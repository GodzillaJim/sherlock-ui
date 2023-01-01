import React from "react";
import NavItem, { NavItemProps } from "../NavItem";
import { MainContext } from "../../../../../Context/MainContext";
import {
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  Box,
  ListItemText,
  Grid,
  Icon,
  useTheme,
  Button,
  ButtonBase,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Transitions from "../../../../../components/Transitions";

type NavGroupProps = {
  item: NavItemProps["item"];
};
const NavGroup = ({ item }: NavGroupProps) => {
  const mainContext = React.useContext(MainContext);
  const [expand, setExpand] = React.useState<boolean>(false);
  const theme = useTheme();
  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case "item":
        return <NavItem level={1} item={menuItem} />;
      default:
        return <Typography>{menuItem.title}</Typography>;
    }
  });

  const drawerOpen = mainContext?.layout.drawerIsOpen;
  return (
    <List
      subheader={
        <Grid
          component={ButtonBase}
          container
          direction="row"
          padding={1}
          justifyContent={"space-between"}
          gap={2}
          borderRadius={2}
          onClick={() => setExpand(!expand)}
          sx={{
            cursor: "pointer",
            ":hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent={"flex-start"}
              gap={2}
            >
              {item.icon && (
                <Icon sx={{ color: theme.palette.grey[500] }}>{item.icon}</Icon>
              )}
              <Grid item>
                <Typography
                  lineHeight={2}
                  variant="h5"
                  color={"GrayText"}
                  sx={{
                    ":hover": {
                      color: theme.palette.text.secondary,
                    },
                  }}
                >
                  {item.title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {!expand ? (
              <ChevronRight sx={{ color: theme.palette.grey[500] }} />
            ) : (
              <ChevronRight
                sx={{
                  transitionDuration: 0.8,
                  transitionProperty: "transform",
                  color: theme.palette.grey[500],
                  transform: "rotate(90deg)",
                }}
              />
            )}
          </Grid>
        </Grid>
      }
    >
      <Transitions position="bottom" type="collapse" in={expand}>
        <div>{navCollapse}</div>
      </Transitions>
    </List>
  );
};

export default NavGroup;
