import { supabase } from "../lib/supabaseClient";

export const getIsMod: Function = async (user: any): Promise<any> =>
  await supabase
    .from("profiles")
    .select("admin")
    .eq("username", user)
    .then((r: any) => r?.data[0]?.admin);