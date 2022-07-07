import { GetServerSideProps } from "next";
import React, { FC } from "react";
import MainProfile from "../../../components/DashboardDark/Profile/MainProfile";
import { AuthProvider } from "../../../contexts/AppContext";
import { supabase } from "../../../lib/supabaseClient";

interface ProfileData {
  data: Object;
}

const Profile:FC<ProfileData> = (props) => {
  return (
    <AuthProvider>
      <MainProfile data={props.data} />
    </AuthProvider>
  );
}

export const getServerSideProps:GetServerSideProps = async () => {
  let { data, error } = await supabase.from("allemotes").select("*");
  if (error) console.log(error);
  return {
    props: { data },
  };
};

export default Profile;