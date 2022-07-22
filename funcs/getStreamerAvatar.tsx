import { supabase } from "../lib/supabaseClient";
export const getStreamerAvatar: Function = async (
  streamer: string
): Promise<any> =>
  await supabase
    .from("useremotes")
    .select("logo")
    .eq("name", streamer)
    .then((r: any) => r.data[0].logo);
