import React, { FC, useState } from "react";
import DashboardLayout from "components/DashboardDark/Main/DashboardLayout";
import DashboardMiddleSection from "components/DashboardDark/Main/DashboardMiddleSection";
import DashboardLeftSignedIn from "components/DashboardDark/Main/Leftside/DashboardLeftSignedIn";
import AuthRoute from "contexts/authRoute";

const Dashboard:FC = () => {
  const [editingSet, setEditingSet] = useState<string>("");
  return (
    <AuthRoute>
    <DashboardLayout title="Dashboard" layout="dashboard">
      <DashboardMiddleSection editingSet={editingSet} />
      <DashboardLeftSignedIn
        onSuccess={(x: string): any => setEditingSet(x)}
      />
    </DashboardLayout>
    </AuthRoute>
  );
}

export default Dashboard;
