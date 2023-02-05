import React from "react";
import {AuthContext} from "../../Context/AuthManager";
import MainLayout from "../../layout/MainLayout";

const Dashboard = (): JSX.Element => {
    const auth = React.useContext(AuthContext);
    return <div>Hello world, {auth?.authDetails?.firstName}</div>;
};

Dashboard.getLayout = function (page: React.ReactNode) {
    return <MainLayout>{page}</MainLayout>
}

export default Dashboard;
