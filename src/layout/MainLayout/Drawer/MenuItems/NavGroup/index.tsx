import React from "react";
import NavItem, { NavItemProps } from "../NavItem";
import {
  ButtonBase,
  Grid,
  Icon,
  List,
  Typography,
  useTheme,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import Transitions from "../../../../../components/Transitions";
import { v4 } from "uuid";
import { useRouter } from "next/router";

type NavGroupProps = {
  item: NavItemProps["item"];
};
const NavGroup = ({ item }: NavGroupProps) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const theme = useTheme();
  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case "item":
        return <NavItem level={1} item={menuItem} key={`nav-group-${v4()}`} />;
      default:
        return (
          <Typography variant={"caption"} key={`nav-group-${v4()}`}>
            {menuItem.title}
          </Typography>
        );
    }
  });

  const router = useRouter();

  const handleClick = () => {
    if (item.type === "item" && item.url) {
      router.push(item.url);
      return;
    }

    setExpand(!expand);
  };

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
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            ":hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          <Grid item key={`nav-group-${v4()}`}>
            <Grid
              container
              direction="row"
              justifyContent={"flex-start"}
              gap={2}
              alignItems={"center"}
            >
              {item.icon && (
                <Icon sx={{ color: theme.palette.grey[500] }}>{item.icon}</Icon>
              )}
              <Grid item>
                <Typography
                  lineHeight={2}
                  variant="body1"
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
          {item.type !== "item" && (
            <Grid item key={`nav-group-${v4()}`}>
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
          )}
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
