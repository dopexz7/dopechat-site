import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { FileUploader } from "react-drag-drop-files";
import { getUploadLimit, setUploadLimit } from "../../../funcs/uploadLimits";
import { useAuth } from "../../../contexts/AppContext";
import { FC } from "react";

const FileDrop:FC = () => {
  const { user } = useAuth() as any;
  const [error, setError] = useState<string>();
  const [upLimit, setUpLimit] = useState<number>(0);
  const fileTypes: string[] = ["JPG", "PNG", "GIF", "WEBP"];

  const handleUploadLimit: Function = (): void => {
    return (
      setUploadLimit(user?.user_metadata.name, upLimit),
      setUpLimit(upLimit - 1)
    );
  };

  useEffect(() => {
    getUploadLimit(user?.user_metadata.name).then((res: any) => {
      setUpLimit(res);
    });
  }, [user]);

  const handleChange: Function = async (event: File) => {
    if (upLimit <= 0) {
      return setError("You have reached the upload limit!");
    } else if (!event || event === undefined) {
      return setError("Failed to upload file!");
    } else {
      setError("Uploading...");
      const file = event;
      const fileName = event.name.split(".")[0];

      if (fileName.length > 24)
        return setError("Emote code exceeds 24 characters");
      
      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, file);
      
      const { data: fileUrl } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);
      
      const newFile: Object = {
        uploaded_by: user.user_metadata.name,
        name: fileName,
        url: fileUrl?.publicURL,
      };

      await supabase.from("submitfiles").insert(newFile);

      if (uploadError) {
        setError("An emote with the same name might already be uploaded!");
      } else {
        setError("Uploaded!");
        handleUploadLimit();
      }
    }
  };

  return (
    <>
      <div className="remove text-white justify-center mb-3 text-xs bg-border-white rounded font-normal px-2 py-3  flex flex-row items-center">
        {error || "Make sure the file name is the code of the emote!"}
      </div>
      <FileUploader
        maxSize="10"
        handleChange={handleChange}
        name="file"
        onTypeError={(e: string) => setError(e)}
        types={fileTypes}
      >
        <div className="flex-col h-48 cursor-pointer duration-300 border-dashed rounded text-sm font-semibold text-accent-gray border-2 p-14 w-full flex justify-center items-center">
          Drag & drop files here!
          <span className="text-xs text-accent-gray opacity-50">
            .JPG, .PNG, .WEBP, .GIF
          </span>
        </div>
      </FileUploader>
    </>
  );
};
export default FileDrop;
