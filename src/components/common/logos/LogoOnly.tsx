import React from "react";
import { styled } from "@mui/material";
import AppLogo from "../../../assets/images/logo.svg";
import NextLink from "next/link";

const StyledLogo = styled(AppLogo)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  height: 40px;
  width: 40px;
`
);
const LogoOnly = () => {
  return (
    <NextLink href={"/"}>
      <StyledLogo />
    </NextLink>
  );
};

export default LogoOnly;
