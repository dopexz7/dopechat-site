import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
function useShowSetMods(username) {
  const [res, setRes] = useState();

  useEffect(() => {
    let subed = true;
    const checkSetMods = async () => {
      let { data: mods, error } = await supabase
        .from("useremotes")
        .select("*")
        .eq("name", username);
      if (error) console.log(error);
      mods.forEach((v) => {
        if (subed) setRes(v);
      });
    };

    checkSetMods();
    return () => {
      subed = false;
    };
  }, [username]);

  return res;
}

export default useShowSetMods;
