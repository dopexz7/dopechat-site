import { supabase } from "../lib/supabaseClient";

const getMod: Function = async (pageName: string, user: any): Promise<any> =>
  await supabase
    .from("useremotes")
    .select("mods")
    .eq("name", pageName)
    .then((data: any) => {
      let arr: any[] = data?.data[0]?.mods;
      arr = arr?.filter((item: any) => item === user);
      if (arr?.length) return true
      return false
    } );
 
export default getMod;
