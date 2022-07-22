import { supabase } from "../lib/supabaseClient";

export const getIsDonor: Function = async (user: string): Promise<boolean> =>
  await supabase
    .from("profiles")
    .select("donor")
    .eq("username", user)
    .then((r: any) => r?.data[0]?.donor);