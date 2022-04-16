import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
function useUploadLimit(username) {
  const [res, setRes] = useState();

  useEffect(() => {
    let subed = true;
    const checkMod = async () => {
      let profile = await supabase
        .from("profiles")
        .select("uploads")
        .eq("username", username);

      return profile?.data[0]?.uploads; //[0]?.uploads;
      // if (res?.data?.length) return true;
      // return false;
    };
    checkMod().then((res) => {
      if (subed) setRes(res);
    });

    return () => {
      subed = false;
    };
  }, [username]);
  return res;
}

export default useUploadLimit;
