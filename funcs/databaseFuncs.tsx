import { supabase } from "../lib/supabaseClient";

// global

export const updateAdminEmotes: Function = async (
  data: any[],
  v: submitFileTypes
): Promise<any> => {
  let arr: any[] = data;
  arr = arr.filter((item: any) => item !== v);
  return arr;
};

// admin deleting emotes from database (admin menu)

export const deletingFromDb: Function = async (
  v: submitFileTypes
): Promise<any> => await supabase.from("submitfiles").delete().eq("url", v.url);

export const removeFromUploads: Function = async (
  v: submitFileTypes
): Promise<any> => await supabase.storage.from("uploads").remove([v.name]);

export const movingToApproved: Function = async (
  v: submitFileTypes
): Promise<any> =>
  await supabase.storage
    .from("uploads")
    .move(`${v.name}`, `approved/${v.name}`);


// approving emotes to database (admin menu)

export const returnNewFileName: Function = (v: submitFileTypes): any => {
  const { data: fileUrl } = supabase.storage
    .from("uploads")
    .getPublicUrl(`approved/${v.name}`);
  const newFile = {
    uploaded_by: v.uploaded_by,
    code: v.name,
    src: fileUrl!.publicUrl, // publicURL
    date: v.created_at,
  };
  return newFile;
};

export const insertingNewFile: Function = async (
  v: submitFileTypes
): Promise<any> => {
  const newFile = returnNewFileName(v);
  return await supabase.from("allemotes").insert(newFile);
};

//types

interface submitFileTypes {
  url: string;
  name: string;
  uploaded_by: string;
  created_at: Date;
}
