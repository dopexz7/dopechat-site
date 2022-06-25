import React, { useState, useEffect } from "react";

import { supabase } from "../../../../lib/supabaseClient";
import useUploadLimit from "../../../../funcs/useUploadLimit";
import setUploadLimit from "../../../../funcs/useSetUploadLimit";
import { useAuth } from "../../../../contexts/AppContext";
export default function UploadFileFirst() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selfilename, setSelfilename] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const limit = useUploadLimit(user?.user_metadata.name);
  const [upLimit, setUpLimit] = useState(limit);

  useEffect(() => {
    setUpLimit(limit);
  }, [limit]);
  const handleUploadLimit = () => {
    return (
      setUploadLimit(user?.user_metadata.name, upLimit ? upLimit - 1 : null),
      setUpLimit(upLimit - 1)
    );
  };
  const handleUploadFile = async () => {
    if (!selectedFile || selectedFile === 0) {
      return setError("You must select an image to upload.");
    } else if (selfilename.length > 24) {
      return setError("Emote code exceeds 24 characters");
    } else {
      setUploading(true);
      try {
        const file = selectedFile;

        await supabase.storage.from("uploads").upload(selfilename, file);

        const { data: fileUrl, er } = await supabase.storage
          .from("uploads")
          .getPublicUrl(selfilename);
        if (er) console.log(er);

        const newFile = {
          uploaded_by: user?.user_metadata.name,
          name: selfilename,
          url: fileUrl.publicURL,
        };

        await supabase.from("submitfiles").insert(newFile);

        if (error) {
          throw error;
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setUploading(false);
        setTimeout(() => {
          setSelectedFile();
          setSelectedFileName("");
          setSelfilename("");
          handleUploadLimit();
        }, 1000);
      }
    }
  };

  const changeHandler = (event) => {
    event.preventDefault();
    if (!event.target.files || event.target.files.length === 0) {
      setError("You must select an image to upload.");
    } else {
      setSelectedFile(event.target.files[0]);
      setSelectedFileName(event.target.files[0].name);
    }
  };
  return (
    <>
      <div className="remove text-white justify-center mb-3 text-xs bg-border-white rounded font-normal px-2 py-3  flex flex-row items-center">
        {error || "Accepted formats: .jpg, .png, .webp, .gif"}
      </div>
      {upLimit && upLimit > 0 ? (
        <>
          <div id="fileupload" className="group p-0.5 relative mb-4">
            <div className="block text-center">
              <div className="rounded block border-2 text-black cursor-pointer h-10  text-left  relative">
                <div className="flex flex-row h-full">
                  <div
                    className="cursor-pointer bg-border-white flex items-center justify-center font-semibold h-full w-max p-2 text-xs"
                    id="fileName"
                  >
                    Choose File
                  </div>
                  <div
                    className="ml-auto p-2.5 cursor-pointer inline-block text-xs  text-black"
                    id="noFile"
                  >
                    {selectedFileName ? selectedFileName : "No file chosen"}
                  </div>
                </div>

                <input
                  type="file"
                  id="single"
                  className="z-50 cursor-pointer absolute h-full w-full top-0 left-0 right-0 opacity-0
"
                  accept="image/*"
                  onChange={changeHandler}
                  disabled={uploading}
                />
              </div>
            </div>
          </div>
          <div id="name" className="p-0.5 relative mb-4">
            <input
              className="peer w-full py-4 px-4 mb-0 text-base text-black outline-none border-b-[1px] bg-transparent border-transparent-black placeholder-transparent"
              type="text"
              value={selfilename}
              placeholder="Code"
              onChange={(e) => setSelfilename(e.target.value)}
              required
            />
            <span className=" peer-focus:before:w-2/4 peer-focus:after:w-2/4 relative block w-full after:content-[''] after:h-[2px] after:w-0 after:bottom-[0px] after:absolute after:bg-main-purple after:duration-300 before:content-[''] before:h-[2px] before:w-0 before:bottom-[0px] before:absolute before:bg-main-purple before:duration-300 before:left-2/4 after:right-2/4 before:box-shadow-purple after:box-shadow-purple"></span>
            <label className="absolute left-4 top-[-5px] text-main-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-6 pointer-events-none peer-focus:top-[-5px] peer-focus:text-sm">
              Emote code (max 24 chars)
            </label>
          </div>
          <button
            onClick={() => {
              if (upLimit > 0) {
                handleUploadFile();
              } else {
                setError("You have exceeded daily limit!");
              }
            }}
            type="submit"
            className="px-2 py-3 bg-main-purple text-white font-medium text-sm rounded cursor-pointer duration-300 w-full"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
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
}
