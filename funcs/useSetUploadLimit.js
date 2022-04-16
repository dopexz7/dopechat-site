import { supabase } from "../lib/supabaseClient";
async function setUploadLimit(username, value) {
  //console.log(username);
  await supabase
    .from("profiles")
    .update({ uploads: value })
    .eq("username", username);
}

export default setUploadLimit;
