import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AppContext";

const useHasEdits:Function = (): Array<string> => {
  const [res, setRes] = useState<Array<string>>([]);
  const { user } = useAuth() as any;
  useEffect(() => {
    let subed : boolean = true;
    const checkIfHasEdits = async () => {
      let { data: mods, error } = await supabase.from("useremotes").select("*");
      if (error) console.log(error);
      let x : Array<any> = [];
      mods?.forEach((v) => {
        if (v.mods?.includes(user?.user_metadata.name)) {
          x.push(v);
        }
      });
      return x;
    };

    checkIfHasEdits().then((r: any[]) => {
      if (subed) r.forEach((v) => setRes(res => [...res, v.name]));
    });
    return () => {
      subed = false;
    };
  }, []);
  
  return res;
}

export default useHasEdits;
