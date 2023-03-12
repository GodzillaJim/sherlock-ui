import React from "react";
import { useAuth } from "../../Context/AuthManager";
import MainLayout from "../../layout/MainLayout";

const Dashboard = (): JSX.Element => {
  const { user } = useAuth();
  return <div>Hello world, {user?.email}</div>;
};

Dashboard.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
