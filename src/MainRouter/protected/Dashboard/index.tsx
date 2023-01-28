import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../../../pages/Dashboard";
import MainLayout from "../../../layout/MainLayout";
import Profile from "../../../pages/Profile";
const Dashboard = (): JSX.Element => {
  return (
    <Routes>
      <Route path={"/*"} element={<MainLayout />}>
        <Route path="" element={<DashboardPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
