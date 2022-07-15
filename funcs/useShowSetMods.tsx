import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";
const useShowSetMods:Function = (): any[] => {
  const [res, setRes] = useState<any[]>([]);
  const { user } = useAuth() as any;

  useEffect(() => {
    let subed: boolean = true;
    const checkSetMods = async () => {
      let { data: mods, error } = await supabase
        .from("useremotes")
        .select("*")
        .eq("name", user);
      if (error) console.log(error);
      mods?.forEach((v) => {
        if (subed) setRes(v);
      });
    };

    checkSetMods();
    return () => {
      subed = false;
    };
  }, [user]);

  return res;
}

export default useShowSetMods;
