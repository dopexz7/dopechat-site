import { useEffect, useState } from "react";
import MainProfile from "../../../components/Dashboard/Profile/MainProfile";
import { supabase } from "../../../lib/supabaseClient";

export default function Profile() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <MainProfile session={session} />;
}
