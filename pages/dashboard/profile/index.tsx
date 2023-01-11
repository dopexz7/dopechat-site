import React from "react";
import MainProfile from "../../../components/DashboardDark/Profile/MainProfile";
import DashboardLayout from "../../../components/DashboardDark/Main/DashboardLayout";
import DashboardLeftSignedIn from "../../../components/DashboardDark/Main/Leftside/DashboardLeftSignedIn";
import AuthRoute from "contexts/authRoute";
const Profile = () => {
  return (
  <AuthRoute>
    <DashboardLayout title="Your profile" layout="dashboard">
        <MainProfile/>
        <DashboardLeftSignedIn onSuccess={()=>''}/>
    </DashboardLayout>
  </AuthRoute>    
  );
}

export default Profile;
