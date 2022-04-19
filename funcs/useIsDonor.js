import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";
function useIsDonor() {
  const { user } = useAuth();
  const [res, setRes] = useState(false);

  useEffect(() => {
    let subed = true;
    const checkDonor = async () => {
      let { data: res, error } = await supabase
        .from("profiles")
        .select("is_donor")
        .eq("username", user.user_metadata.name);
      if (error) console.log(error);
      return res[0]?.is_donor;
    };

    checkDonor().then((r) => {
      if (subed) setRes(r);
    });

    return () => {
      subed = false;
    };
  }, []);
  return res;
}

export default useIsDonor;
