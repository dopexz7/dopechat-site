import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import MainAdmin from "../../../components/Dashboard/Admin/MainAdmin";

export default function Admin() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <MainAdmin session={session} />;
}
