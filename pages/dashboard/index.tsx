import React, { FC, useState } from "react";
import DashboardLayout from "components/DashboardDark/Main/DashboardLayout";
import DashboardMiddleSection from "components/DashboardDark/Main/DashboardMiddleSection";
import DashboardLeftSignedIn from "components/DashboardDark/Main/Leftside/DashboardLeftSignedIn";
import AuthRoute from "contexts/authRoute";
import Head from "next/head";

const Dashboard:FC = () => {
  const [editingSet, setEditingSet] = useState<string>("");
  return (
    <>
    <Head>
      <title>Dashboard</title>
      <meta name="description" content="Facebook Gaming extension dopeChat" />
    </Head>
    
    <DashboardLayout layout="dashboard">
    <AuthRoute>
      <DashboardMiddleSection editingSet={editingSet} />
      <DashboardLeftSignedIn
        onSuccess={(x: string): any => setEditingSet(x)}
      />
      </AuthRoute>
    </DashboardLayout>
    
    </>
  );
}

export default Dashboard;
