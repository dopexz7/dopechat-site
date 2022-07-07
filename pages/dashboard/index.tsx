//import DashboardMain from "../../components/Dashboard/Main/DashboardMain";
import DashboardMain from "../../components/DashboardDark/Main/DashboardMain";
import { supabase } from "../../lib/supabaseClient";
import { AuthProvider } from "../../contexts/AppContext";
import { FC } from "react";
import React from "react";
import { GetServerSideProps } from "next";
const Dashboard: FC<CoolProps> = (props) => {
  return (
    <AuthProvider>
      <DashboardMain data={props.data} />
    </AuthProvider>
  );
}
export const getServerSideProps:GetServerSideProps = async () => {
  let { data, error } = await supabase
    .from("allemotes")
    .select("*")
    .order("date", { ascending: false });
  if (error) console.log(error);
  return {
    props: { data },
  };
};

interface CoolProps {
  data: JSON;
}

export default Dashboard;
