import { supabase } from "../lib/supabaseClient";

export const getIsDonor: Function = async (user: any): Promise<any> =>
  await supabase
    .from("profiles")
    .select("donor")
    .eq("username", user)
    .then((r: any) => r?.data[0]?.donor);