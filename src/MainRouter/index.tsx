import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages";
import Dashboard from "./protected/Dashboard";

const MainRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={"/app/*"} element={<Dashboard />} />
      <Route path={"/*"} element={<HomePage />} />
    </Routes>
  );
};

export default MainRouter;
