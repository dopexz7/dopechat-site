import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
function useIsDonor(username) {
  const [res, setRes] = useState(false);

  useEffect(() => {
    let subed = true;
    const checkDonor = async () => {
      let { data: res, error } = await supabase
        .from("profiles")
        .select("is_donor")
        .eq("username", username);
      return res[0]?.is_donor;
    };

    checkDonor().then((r) => {
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

export default useIsDonor;
