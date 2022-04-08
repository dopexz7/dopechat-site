import React, { useState } from "react";

import * as Bs from "react-icons/bs";
import { supabase } from "../../../lib/supabaseClient";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

const FileDrop = () => {
  const [error, setError] = useState(
    "Make sure the file name is named as the code of the emote ex. 'KEKW.png'"
  );

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
    //
    const { data: fileUrl, er } = await supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    const newFile = {
      uploaded_by: supabase.auth.user().user_metadata.name,
      name: fileName,
      url: fileUrl.publicURL,
    };

    const { data: drx, e } = await supabase.from("submitfiles").insert(newFile);

    if (uploadError) {
      console.log(uploadError);
      setError("An emote with the same name might already be uploaded!");
    }
  };
  return (
    <div className="h-full w-full flex flex-col mt-3 filedrop">
      <div className="mb-3 text-sm bg-accent-white rounded-sm text-accent-gray font-bold p-3 flex flex-row items-center">
        <Bs.BsExclamationSquareFill className=" mr-2 text-red-500 rounded-sm" />
        {error}
      </div>
      <FileUploader
        classes="!text-white !h-full !border-border-white !p-10 !max-w-full !w-full flex justify-center items-center"
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
    </div>
  );
};
export default FileDrop;
