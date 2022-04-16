import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
function useReadSubmissions() {
  const [res, setRes] = useState();

  useEffect(() => {
    let subed = true;
    const checkMod = async () => {
      const res = await supabase.from("submitfiles").select("*");
      if (res?.data) return res.data;
    };

    checkMod().then((r) => {
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
