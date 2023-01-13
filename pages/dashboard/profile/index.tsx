import React from "react";
import MainProfile from "../../../components/DashboardDark/Profile/MainProfile";
import DashboardLayout from "../../../components/DashboardDark/Main/DashboardLayout";
import AuthRoute from "contexts/authRoute";
import Head from "next/head";
const Profile = () => {
  return (
    <>
    <Head>
      <title>Your profile</title>
      <meta name="description" content="Facebook Gaming extension dopeChat" />
    </Head>
  <AuthRoute>
    <DashboardLayout layout="dashboard">
        <MainProfile/>
    </DashboardLayout>
  </AuthRoute>  
    </>  
  );
}

export default Profile;
