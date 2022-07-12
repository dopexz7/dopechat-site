import { supabase } from "../lib/supabaseClient";

export const gettingSetMods: Function = async (user: any): Promise<any> => {
  let { data } : any = await supabase
    .from("useremotes")
    .select("*")
    .eq("name", user);
  if (data[0]?.mods.length) return data[0]?.mods;
  return [];
};

