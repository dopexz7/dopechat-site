import { supabase } from "../lib/supabaseClient";

export const getAvailEdits = async (username: string) =>
  await supabase
    .from("useremotes")
    .select("*")
    .then((res) => res.data)
    .then((data) =>
      data?.map((v) => {
        if (v.mods.includes(username)) return v.name;
      })).then((final: any) => final.filter((v: any) => v != undefined));
