import { supabase } from "../lib/supabaseClient";

const setUploadLimit: Function = async (
  username: string,
  value: string
): Promise<any> =>
  await supabase
    .from("profiles")
    .update({ uploads: value })
    .eq("username", username);


export default setUploadLimit;
