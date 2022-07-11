import { supabase } from "../lib/supabaseClient";

export const gettingFirstEmotes: Function = async (): Promise<any> => {
  let { data } = await supabase
    .from("allemotes")
    .select("*")
    .order("date", { ascending: false });
  return data;
  //return data
};

export const gettingMoreEmotes: Function = async (
  postLength: number,
  kekl: number
): Promise<any> => {
  let { data } = await supabase
    .from("allemotes")
    .select("*")
    .order("date", { ascending: false })
    .range(postLength, kekl);
  return data;
};

export const gettingProfileEmotes: Function = async (
  user: any
): Promise<any> => {
  let { data } = await supabase
    .from("allemotes")
    .select("*")
    .eq("uploaded_by", user?.user_metadata.name);
  return data;
};

export const gettingAdminEmotes: Function = async (): Promise<any> => {
  let { data } = await supabase.from("submitfiles").select("*");
  return data;
};

export const gettingSetEmotes: Function = async (name : string): Promise<any> => {
  let { data } = await supabase.from("useremotes").select("*") as any;
  let arr: any[] = data;
  arr = arr.filter(
    (item: any) => item.name.toLowerCase() === name?.toLowerCase()
  );
  if (arr.length) return arr[0].emotes
  else return false
  //return data;
}
