import { supabase } from "../lib/supabaseClient";

export const getUploadLimit: Function = async (
  username: string
): Promise<any> =>
  await supabase
    .from("profiles")
    .select("uploads")
    .eq("username", username)
    .then((res : any) => res?.data[0]?.uploads);

export const setUploadLimit: Function = async (
  username: string,
  value: number
): Promise<any> =>
  await supabase
    .from("profiles")
    .update({ uploads: value - 1 })
    .eq("username", username);

