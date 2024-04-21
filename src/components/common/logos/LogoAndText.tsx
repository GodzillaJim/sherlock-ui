import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import AppLogo from "../../../assets/images/logo.svg";

const CustomAppLogo = styled(AppLogo)(
  ({ theme }) => `
    color: ${theme.palette.primary.main};
    width: 75px;
    height: 85px;
    margin-bottom: 18px;
`
);

const TitleText = styled(Typography)`
  font-family: "Black mud", sans-serif;
  font-size: 28px;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
`;

const SubtitleText = styled(Typography)(`
  font-family: 'Lato', sans serif;
  line-height: 1;
`);

const LogoAndText = () => {
  return (
    <List disablePadding sx={{ px: 3, background: "transparent" }}>
      <ListItem disablePadding disableGutters>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <CustomAppLogo />
        </ListItemIcon>
        <ListItemText
          primary={<TitleText>WriteSpear</TitleText>}
          secondary={
            <SubtitleText variant={"subtitle2"} color={"secondary.main"}>
              The art of Piercing words
            </SubtitleText>
          }
        />
      </ListItem>
    </List>
  );
};

export default LogoAndText;
