import React from "react";
import { AuthContext } from "../../Context/AuthManager";

const Dashboard = (): JSX.Element => {
  const auth = React.useContext(AuthContext);
  return <div>Hello world, {auth?.authDetails?.firstName}</div>;
};

export default Dashboard;
