import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
function useIsMod(username) {
  const [res, setRes] = useState(false);

  useEffect(() => {
    let subed = true;
    const checkMod = async () => {
      const res = await supabase.from("mods").select("*").eq("name", username);
      if (res?.data?.length) return true;
      return false;
    };

    checkMod().then((r) => {
      if (subed) {
        setRes(r);
      }
    });

    return () => {
      subed = false;
    };
  }, [username]);
  return res;
}

export default useIsMod;
