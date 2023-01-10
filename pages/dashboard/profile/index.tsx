import React from "react";
import MainProfile from "../../../components/DashboardDark/Profile/MainProfile";
import DashboardLayout from "../../../components/DashboardDark/Main/DashboardLayout";
import DashboardLeftSignedIn from "../../../components/DashboardDark/Main/Leftside/DashboardLeftSignedIn";
import { useUser } from "@supabase/auth-helpers-react";
const Profile = () => {
  const user = useUser()
  return (
    <DashboardLayout title={`${user?.user_metadata.name}'s profile`} layout="dashboard">
        <MainProfile/>
        <DashboardLeftSignedIn onSuccess={()=>''}/>
    </DashboardLayout>
        
  );
}

export default Profile;
