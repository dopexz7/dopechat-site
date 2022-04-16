import { useEffect, useState } from "react";
import MainProfile from "../../../components/Dashboard/Profile/MainProfile";
import { supabase } from "../../../lib/supabaseClient";

export default function Profile(props) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <MainProfile session={session} data={props.data} />;
}

export const getStaticProps = async () => {
  let { data, error } = await supabase.from("allemotes").select("*");
  if (error) console.log(error);
  return {
    props: { data },
  };
};
