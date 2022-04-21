import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";
function useIsDonor() {
  const [res, setRes] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let subed = true;
    const checkDonor = async () =>
      await supabase
        .from("profiles")
        .select("is_donor")
        .eq("username", user?.user_metadata.name);

    checkDonor().then((r) => {
      const isDonor = r?.data[0]?.is_donor;
      if (subed) setRes(isDonor);
    });

    return () => {
      subed = false;
    };
  }, []);
  return res;
}

export default useIsDonor;
