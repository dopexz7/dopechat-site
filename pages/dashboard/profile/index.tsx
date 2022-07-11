import React, { FC } from "react";
import MainProfile from "../../../components/DashboardDark/Profile/MainProfile";
import { AuthProvider } from "../../../contexts/AppContext";

const Profile:FC = () => {
  return (
    <AuthProvider>
      <MainProfile />
    </AuthProvider>
  );
}


export default Profile;