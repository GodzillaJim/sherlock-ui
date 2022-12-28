import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../../../pages/Dashboard";
import MainLayout from "../../../layout/MainLayout";
const Dashboard = (): JSX.Element => {
  return (
    <Routes>
      <Route path={"/*"} element={<MainLayout />}>
        <Route path="" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
