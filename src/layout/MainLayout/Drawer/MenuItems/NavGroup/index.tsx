import React from "react";
import NavItem, { NavItemProps } from "../NavItem";
import {
  ButtonBase,
  Grid,
  Icon,
  List,
  Typography,
  useTheme,
  styled,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import Transitions from "../../../../../components/Transitions";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { useMainContext } from "../../../../../Context/MainContext";

type NavGroupProps = {
  item: NavItemProps["item"];
};

const CustomGrid = styled(Grid)<{ active?: boolean }>(
  ({ theme, active }) => `
  & .MuiIcon-root {
    color: ${active ? theme.palette.primary.main : theme.palette.grey[500]};
  }

  & .MuiTypography-root {
    color: ${active ? theme.palette.primary.main : theme.palette.grey[500]};
  }

  &:hover {
    & .MuiIcon-root {
      color: ${theme.palette.getContrastText(theme.palette.primary.light)};
    }
    
    & .MuiTypography-root {
      color:  ${theme.palette.getContrastText(theme.palette.primary.light)};
    }

    & .MuiSvgIcon-root {
      ${theme.palette.getContrastText(theme.palette.primary.light)};
    }
  }
  transition: all 0.5s;
`
);

const NavGroup = ({ item }: NavGroupProps) => {
  console.log("Item: ", item);
  const [expand, setExpand] = React.useState<boolean>(false);
  const mainContext = useMainContext();
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
      mainContext?.layout.setActiveItems([item.id]);
      router.push(item.url);
      return;
    }

    setExpand(!expand);
  };

  const isSelected = React.useMemo(() => {
    if (!mainContext) return false;
    return Boolean(mainContext.layout.activeItems.find((id) => id === item.id));
  }, [mainContext]);

  return (
    <List
      className="nav-group-root"
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
            <CustomGrid
              container
              direction="row"
              justifyContent={"flex-start"}
              gap={2}
              alignItems={"center"}
              active={isSelected}
            >
              {item.icon && <Icon>{item.icon}</Icon>}
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
            </CustomGrid>
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
