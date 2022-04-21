import AuthRoute from "../../../contexts/authRoute";

import { AuthProvider } from "../../../contexts/AppContext";
import SetsMain from "../../../components/Dashboard/Sets/SetsMain";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
export default function Set(props) {
  const [pass, setPass] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    props?.data?.data?.forEach((r) => {
      if (r.name === id) setPass(r);
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

export const getServerSideProps = async () => {
  const data = await supabase
    .from("useremotes")
    .select("*")
    .then((res) => res);

  return {
    props: { data },
  };
};
