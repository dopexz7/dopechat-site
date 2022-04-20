import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";
function useIsMod() {
  const [res, setRes] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let subed = true;
    const checkMod = async () =>
      await supabase
        .from("profiles")
        .select("admin")
        .eq("username", user?.user_metadata.name);

    checkMod().then((r) => {
      const isMod = r?.data[0]?.admin;
      if (subed) setRes(isMod);
    });

    return () => {
      subed = false;
    };
  }, []);
  return res;
}

export default useIsMod;
