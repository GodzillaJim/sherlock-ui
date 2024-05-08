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

type LogoSizeType = "small" |"normal"

const CustomAppLogo = styled(AppLogo)<{ size?: LogoSizeType }>(
  ({ theme, size }) => `
    color: ${theme.palette.primary.main};
    width: ${size === "small" ? "37px" :"75px"};
    height: ${size === "small" ? "42px" :"85px"};
    margin-bottom: 18px;
`
);

const TitleText = styled(Typography)<{ size?: LogoSizeType  }>`
  font-family: "Black mud", sans-serif;
  font-size: ${({ size }) => size === "small" ? "20px" :"28px"};
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
  letter-spacing: 0.15em;
`;

const SubtitleText = styled(Typography)(`
  font-family: 'Lato', sans serif;
  line-height: 1;
`);

type LogoAndTextProps = {
  size?: "small" | "normal"
}

const LogoAndText = ({ size }: LogoAndTextProps) => {
  return (
    <List disablePadding sx={{ px: 3, background: "transparent" }}>
      <ListItem disablePadding disableGutters>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <CustomAppLogo size={size} />
        </ListItemIcon>
        <ListItemText
          primary={<TitleText size={size} >WriteSpear</TitleText>}
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
