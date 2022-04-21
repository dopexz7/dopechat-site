import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";
function useHasEdits() {
  const [res, setRes] = useState();
  const { user } = useAuth();
  useEffect(() => {
    let subed = true;
    const checkIfHasEdits = async () => {
      let { data: mods, error } = await supabase.from("useremotes").select("*");
      if (error) console.log(error);
      let x = [];
      mods?.forEach((v) => {
        if (v.mods?.includes(user?.user_metadata.name)) {
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
  }, []);

  return res;
}

export default useHasEdits;
