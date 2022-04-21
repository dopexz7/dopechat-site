import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";
function useIsDonor() {
  const [res, setRes] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkMod = async () =>
      await supabase
        .from("profiles")
        .select("donor")
        .eq("username", user?.user_metadata.name)
        .then((r) => setRes(r?.data[0]?.donor));

    checkMod();
  }, []);
  return res;
}

export default useIsDonor;
