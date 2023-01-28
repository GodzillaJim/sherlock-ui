import React from "react";
import { Grid } from "@mui/material";
import Login from "./components/Login";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { LOGIN, REGISTER } from "../MainRouter/Paths";

const Container = styled.div`
  padding: 0;
`;
const HomePage = (): JSX.Element => {
  return (
    <Container>
      <Grid height={"100vh"} container={true} justifyContent={"center"}>
        <Routes>
          <Route path={REGISTER} element={<Register />} />
          <Route path={LOGIN} element={<Login />} />
        </Routes>
      </Grid>
    </Container>
  );
};

export default HomePage;
