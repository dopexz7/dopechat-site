import { supabase } from "../lib/supabaseClient";

export const getAvailEdits = async (username: string) =>
  await supabase
    .from("useremotes")
    .select("*")
    .then((res) => res.data)
    .then((data: any) => {
      let x = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].mods.includes(username)) {
          x.push(data[i].name);
        }
      }
      return x;
    })
    
