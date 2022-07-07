import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
const useReadSubmissions:Function = () : any[] => {
  const [res, setRes] = useState<any[]>([]);

  useEffect(() => {
    let subed: boolean = true;
    const checkMod = async () => {
      const res = await supabase.from("submitfiles").select("*");
      if (res?.data) return res.data;
    };

    checkMod().then((r: any) => {
      if (subed) {
        setRes(r);
      }
    });

    return () => {
      subed = false;
    };
  }, []);
  return res;
}

export default useReadSubmissions;
