import React from "react";
import NextLink from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

type NavItemType = {
  label: string;
  url: string;
  drawer?: boolean;
  icon: JSX.Element;
};

const Wrapper = styled("div")(
  ({ theme }) => `
   color: ${theme.palette.text.primary};
   padding: ${theme.spacing(1)} ${theme.spacing(2)};
   display: flex;
   align-items: center;
   position: relative;
   margin: 0 ${theme.spacing(0.8)}; 
   cursor: pointer;
   transition: all 0.3s;
   border-radius: 10px;
   height: fit-content;
   margin: auto;
   background-color: transparent;
   background: transparent; /* Start with a transparent background */
   background-image: linear-gradient(to left, ${
     theme.palette.warning.light
   } 50%, transparent 50%);
   background-size: 200% 100%;
   transition: all 0.3s linear;
   background-position: left bottom;
   

   &::after {
    content: '';
    position: absolute;
    top: 30%;
    height: 40%;
    width: 4px;
    background-color: ${theme.palette.warning.dark};
    right: 0;
   }

   &:hover {
    color: ${theme.palette.getContrastText(theme.palette.warning.light)};
    background-position: right bottom;
    box-shadow: 10px 10px 5px -12px rgba(0,0,0,0.75) inset;
    -webkit-box-shadow: 10px 10px 5px -12px rgba(0,0,0,0.75) inset;
    -moz-box-shadow: 10px 10px 5px -12px rgba(0,0,0,0.75) inset;
   }
  }

`
);

const StyledListItem = styled(ListItem)(
  ({ theme }) => `
    &.MuiListItem-root:hover {
        background-color: ${theme.palette.primary.light};
    }
    
    &.MuiListItem-root {
      .icon:hover {
        color: ${theme.palette.getContrastText(theme.palette.primary.light)}
      }
      .primary-text {
        font-family: 'Lato', sans-serif;
      }
      .primary-text:hover {
        color: ${theme.palette.getContrastText(theme.palette.primary.light)}
      }
    }
`
);

const NavItem = ({ label, url, drawer, icon }: NavItemType) => {
  if (drawer) {
    return (
      <StyledListItem disablePadding>
        <NextLink href={url} passHref legacyBehavior>
          <ListItemButton>
            <ListItemIcon className={"icon"} sx={{ minWidth: 45 }}>
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={"primary-text"} variant={"subtitle1"}>
                  {label}
                </Typography>
              }
            />
          </ListItemButton>
        </NextLink>
      </StyledListItem>
    );
  }
  return (
    <NextLink href={url} passHref legacyBehavior>
      <Wrapper>{label}</Wrapper>
    </NextLink>
  );
};

export default NavItem;
