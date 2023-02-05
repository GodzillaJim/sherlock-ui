import React from "react";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "../../../pages/d\'ashboard";
import MainLayout from "../../../layout/MainLayout";
import Profile from "../../../pages/dashboard/profile";

const Dashboard = (): JSX.Element => {
    return (
        <Routes>
            <Route path={"/*"} element={<MainLayout/>}>
                <Route path="" element={<DashboardPage/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Route>
        </Routes>
    );
};

export default Dashboard;
