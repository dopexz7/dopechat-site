import AuthRoute from "../../../contexts/authRoute";

import { AuthProvider } from "../../../contexts/AppContext";
import SetsMain from "../../../components/DashboardDark/Sets/SetsMain";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { FC } from "react";
import { GetServerSideProps } from "next";
import React from "react";
interface SetsData {
  data?: any;
  name: string;
  id: string;
  pass?: Array<string>;
}
const Set:FC<SetsData> = (props) => {
  const [pass, setPass] = useState<Array<string>>([]);
  const router = useRouter();
  const { id }  = router.query as { id: string };

  useEffect(() => {
    let propsData = props?.data;
    propsData.data?.forEach((r : any) => {
      if (r?.name?.toLowerCase() === id?.toString().toLowerCase()) setPass(r);
    });
  }, []);
  return (
    <AuthProvider>
      <AuthRoute>
        <SetsMain pass={pass} />
      </AuthRoute>
    </AuthProvider>
  );
}



export const getServerSideProps:GetServerSideProps = async () => {
  const data = await supabase
    .from("useremotes")
    .select("*")
    .then((res) => res);

  return {
    props: { data },
  };
};
export default Set;
