import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { FileUploader } from "react-drag-drop-files";
import useUploadLimit from "../../../funcs/useUploadLimit";
import setUploadLimit from "../../../funcs/useSetUploadLimit";
import { useAuth } from "../../../contexts/AppContext";
const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

const FileDrop = () => {
  const { user } = useAuth();
  const [error, setError] = useState();

  const limit = useUploadLimit(user.user_metadata.name);
  const [upLimit, setUpLimit] = useState(limit);

  useEffect(() => {
    setUpLimit(limit);
  }, [limit]);
  const handleUploadLimit = () => {
    return (
      setUploadLimit(user.user_metadata.name, upLimit ? upLimit - 1 : null),
      setUpLimit(upLimit - 1)
    );
  };

  const handleChange = async (event) => {
    if (!event || event === undefined) {
      setError("Failed to upload file!");
    } else {
      setError("Uploading...");
      const file = event;
      const fileName = event.name.split(".")[0];

      let { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, file);
      const { data: fileUrl, er } = await supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);
      if (er) console.log(er);
      const newFile = {
        uploaded_by: user.user_metadata.name,
        name: fileName,
        url: fileUrl.publicURL,
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
      {upLimit && upLimit > 0 ? (
        <>
          <FileUploader
            maxSize="10"
            handleChange={handleChange}
            name="file"
            onTypeError={(e) => setError(e)}
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
      ) : upLimit <= 0 ? (
        <div className="remove text-white justify-center mb-3 text-xs bg-border-white rounded font-normal px-2 py-3  flex flex-row items-center">
          You have exceeded daily limit! (15 uploads)
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default FileDrop;
