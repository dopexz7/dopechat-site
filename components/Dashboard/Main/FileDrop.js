import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { FileUploader } from "react-drag-drop-files";
import useUploadLimit from "../../../funcs/useUploadLimit";
import setUploadLimit from "../../../funcs/useSetUploadLimit";
import * as Bs from "react-icons/bs";
const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

const FileDrop = (props) => {
  const [error, setError] = useState(
    "Make sure the file name is the code of the emote!"
  );

  const limit = useUploadLimit(props.username);
  const [upLimit, setUpLimit] = useState(limit);

  useEffect(() => {
    setUpLimit(limit);
  }, [limit]);
  const handleUploadLimit = () => {
    return (
      setUploadLimit(props.username, upLimit ? upLimit - 1 : null),
      setUpLimit(upLimit - 1)
    );
  };

  const handleChange = async (event) => {
    if (!event || event === undefined) {
      console.log("err");
      setError("Failed to upload file!");
    }
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
      uploaded_by: supabase.auth.user().user_metadata.name,
      name: fileName,
      url: fileUrl.publicURL,
    };

    await supabase.from("submitfiles").insert(newFile);

    if (uploadError) {
      console.log(uploadError);
      setError("An emote with the same name might already be uploaded!");
    }
    setError("Uploaded!");
    setTimeout(() => {
      handleUploadLimit();
      setError("");
    }, 1000);
  };
  return (
    <div className="h-full w-full flex flex-col">
      {upLimit > 0 ? (
        <>
          <div className="justify-center mb-3 text-xs bg-border-white rounded text-accent-gray font-semibold px-2 py-3  flex flex-row items-center">
            {error}
          </div>
          <FileUploader
            maxSize="10"
            handleChange={handleChange}
            name="file"
            onTypeError={(e) => setError(e)}
            types={fileTypes}
          >
            <div className="flex flex-col cursor-pointer duration-300 border-dashed rounded text-sm font-semibold text-accent-gray border-2 p-14 w-full flex justify-center items-center">
              Drag & drop files here!
              <span className="text-xs text-accent-gray opacity-50">
                .JPG, .PNG, .WEBP, .GIF
              </span>
            </div>
          </FileUploader>
        </>
      ) : (
        <div className="justify-center mb-3 text-xs bg-border-white rounded text-accent-gray font-semibold px-2 py-3  flex flex-row items-center">
          <Bs.BsExclamationSquareFill className="mr-2 text-red-500 rounded-sm" />
          You have exceeded daily limit! (15 uploads)
        </div>
      )}
    </div>
  );
};
export default FileDrop;
