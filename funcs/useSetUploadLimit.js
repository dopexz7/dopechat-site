import { supabase } from "../lib/supabaseClient";
async function setUploadLimit(username, value) {
  await supabase
    .from("profiles")
    .update({ uploads: value })
    .eq("username", username);
}

export default setUploadLimit;
