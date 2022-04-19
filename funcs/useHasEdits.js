import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
function useHasEdits(username) {
  const [res, setRes] = useState();

  useEffect(() => {
    let subed = true;
    const checkIfHasEdits = async () => {
      let { data: mods, error } = await supabase.from("useremotes").select("*");
      if (error) console.log(error);
      let x = [];
      mods?.forEach((v) => {
        if (v.mods?.includes(username)) {
          x.push(v);
        }
      });
      return x;
    };

    checkIfHasEdits().then((r) => {
      if (subed) setRes(r);
    });
    return () => {
      subed = false;
    };
  }, [username]);

  return res;
}

export default useHasEdits;
