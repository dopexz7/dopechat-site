import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";
const useIsMod:Function = (): boolean  => {
  const [res, setRes] = useState<boolean>(false);
  const { user } = useAuth() as any;

  useEffect(() => {
    const checkMod:Function = async () =>
      await supabase
        .from("profiles")
        .select("admin")
        .eq("username", user?.user_metadata.name)
        .then((r : any) => setRes(r?.data[0]?.admin));

    checkMod();
  }, []);
  return res;
}

export default useIsMod;
