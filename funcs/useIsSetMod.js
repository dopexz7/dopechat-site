import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
function useIsSetMod(username) {
  const [res, setRes] = useState(false);
  const checkMod = async () => {
    let { data: mods, error } = await supabase
      .from("mods")
      .select("*")
      .eq("name", username);
    if (mods?.length) return true;
    return false;
  };
  useEffect(() => {
    checkMod().then((r) => {
      setRes(r);
    });
  }, []);
  return res;
}

export default useIsSetMod;
