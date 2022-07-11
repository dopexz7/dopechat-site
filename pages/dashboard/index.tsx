import DashboardMain from "../../components/DashboardDark/Main/DashboardMain";
import { AuthProvider } from "../../contexts/AppContext";
import React, { FC } from "react";

const Dashboard:FC = () => {
  return (
        <AuthProvider>
          <DashboardMain />
        </AuthProvider>
  );
}

export default Dashboard;
