import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
const useCheckIfHasSet:Function = (username : string): boolean => {
  const [res, setRes] = useState<boolean>(false);

  useEffect(() => {
    let subed: boolean = true;
    const checkIfOwns = async () => {
      let { data: mods, error } = await supabase
        .from("useremotes")
        .select("name");
      if (error) console.log(error);
      mods?.forEach((v) => {
        if (v.name.includes(username)) if (subed) setRes(true);
      });
    };

    checkIfOwns();
    return () => {
      subed = false;
    };
  }, [username]);

  return res;
}

export default useCheckIfHasSet;
