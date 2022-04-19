import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AppContext";
import { supabase } from "../lib/supabaseClient";

function useIsMod(pageName) {
  const [res, setRes] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let subed = true;
    const seeMods = async () => {
      let { data: mods, error } = await supabase
        .from("useremotes")
        .select("mods")
        .eq("name", pageName);
      if (error) console.log(error);
      return mods;
    };
    seeMods().then((res) => {
      if (res[0]?.mods.includes(user.user_metadata.name)) {
        if (subed) setRes(true);
      }
    });

    return () => {
      subed = false;
    };
  }, []);
  return res;
}

export default useIsMod;
