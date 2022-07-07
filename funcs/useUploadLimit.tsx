import { useAuth } from "contexts/AppContext";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
const useUploadLimit: Function = (): string => {
  const [res, setRes] = useState<string>("");
  const { user } = useAuth() as any;
  useEffect(() => {
    let subed = true;
    const checkMod = async () => {
      let profile = await supabase
        .from("profiles")
        .select("uploads")
        .eq("username", user.user_metadata.name);
      return profile!.data![0]?.uploads;
    };
    checkMod().then((res: string) => {
      if (subed) setRes(res);
    });

    return () => {
      subed = false;
    };
  }, [user]);
  return res;
};

export default useUploadLimit;
