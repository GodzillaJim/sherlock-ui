import React from "react";
import { Box, styled } from "@mui/material";
import Header from "../MainLayout/Header";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

type PublicLayoutProps = {
  children: React.ReactNode;
};
const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Container>
      <div>
        <Header open={true} handleDrawerToggle={() => ""} />
      </div>
      <div style={{ marginTop: 56 }}>{children}</div>
    </Container>
  );
};

export default PublicLayout;
