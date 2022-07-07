import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";

const useIsDonor:Function = (): boolean => {
  const [res, setRes] = useState<boolean>(false);
  const { user } = useAuth() as any;

  useEffect(() => {
    const checkMod = async () =>
      await supabase
        .from("profiles")
        .select("donor")
        .eq("username", user?.user_metadata.name)
        .then((r) => setRes(r!.data![0]?.donor));

    checkMod();
  }, []);
  return res;
};

export default useIsDonor;
