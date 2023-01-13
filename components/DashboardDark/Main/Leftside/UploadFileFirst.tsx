import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { getUploadLimit, setUploadLimit } from "../../../../funcs/uploadLimits";
import { FC } from "react";
import { useUser } from "@supabase/auth-helpers-react";

const UploadFileFirst:FC = () => {
  const user = useUser();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selfilename, setSelfilename] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [upLimit, setUpLimit] = useState<number>(0);

  useEffect(() => { getUploadLimit(user?.user_metadata.name).then((res: any) => { setUpLimit(res)}); }, [user]);

  const handleUploadLimit: Function = (): void => {
    return (
      setUploadLimit(user?.user_metadata.name, upLimit), setUpLimit(upLimit - 1)
    );
  };
  
  const handleUploadFile: Function = async () => {
    if (upLimit <= 0) {
      return setError("You have reached the upload limit!");
    } else if (!selectedFile) {
      return setError("You must select an image to upload.");
    } else if (!selfilename || selfilename.length > 24) {
      return setError("Emote code invalid.");
    } else {
      setUploading(true);
      try {
        const file = selectedFile;
        await supabase.storage.from("uploads").upload(selfilename, file);
        const { data: fileUrl } = supabase.storage
          .from("uploads")
          .getPublicUrl(selfilename);



        const newFile = {
          uploaded_by: user?.user_metadata.name,
          name: selfilename,
          url: fileUrl!.publicUrl, // publicURL
        }

        await supabase.from("submitfiles").insert(newFile);

        if (error) {
          throw error;
        }
      } catch (e: any) {
        console.log(e.message);
      } finally {
        setUploading(false);
        setTimeout(() => {
          setSelectedFile(undefined);
          setSelectedFileName("");
          setSelfilename("");
          handleUploadLimit();
        }, 1000);
      }
    }
  };

  const changeHandler = (event: any) => {
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
      <div className="remove text-white justify-center mb-3 text-xs rounded-2xl font-normal px-2 py-3  flex flex-row items-center">
        {error || "Accepted formats: .jpg, .png, .webp, .gif"}
      </div>

      <div id="fileupload" className="group p-0.5 relative mb-4">
        <div className="block text-center">
          <div className="rounded-2xl block border-2 border-opacity-5 border-white text-white cursor-pointer h-10  text-left  relative">
            <div className="flex flex-row h-full">
              <div
                className="cursor-pointer flex items-center justify-center font-semibold h-full w-max p-2 text-xs"
                id="fileName"
              >
                Choose File
              </div>
              <div
                className="ml-auto p-2.5 cursor-pointer inline-block text-xs  text-white"
                id="noFile"
              >
                {selectedFileName ? selectedFileName : "No file chosen"}
              </div>
            </div>
            <input
              type="file"
              id="single"
              className="z-50 cursor-pointer absolute h-full w-full top-0 left-0 right-0 opacity-0 "
              accept="image/*"
              onChange={changeHandler}
              disabled={uploading}
            />
          </div>
        </div>
      </div>
      <div id="name" className="p-0.5 relative mb-4">
        <input
          className="peer w-full py-4 px-4 mb-0 text-base text-white outline-none border-b-[1px] bg-transparent border-transparent-black placeholder-transparent"
          type="text"
          value={selfilename}
          placeholder="Code"
          onChange={(e) => setSelfilename(e.target.value)}
          required
        />
        <span className=" peer-focus:before:w-2/4 peer-focus:after:w-2/4 relative block w-full after:content-[''] after:h-[2px] after:w-0 after:bottom-[0px] after:absolute after:bg-ma-pink after:duration-300 before:content-[''] before:h-[2px] before:w-0 before:bottom-[0px] before:absolute before:bg-ma-pink before:duration-300 before:left-2/4 after:right-2/4"></span>
        <label className="absolute left-4 top-[-5px] opacity-50 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-6 pointer-events-none peer-focus:top-[-5px] peer-focus:text-sm">
          Emote code (max 24 chars)
        </label>
      </div>
      <div
        onClick={() => {
          handleUploadFile();
        }}
        className={`flex uppercase overflow-hidden relative duration-300 ${uploading ? "bg-white" : "hover:bg-white text-black bg-ma-pink"} px-10  cursor-pointer py-3 rounded-3xl items-center justify-center font-bold w-full before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </div>
    </>
  );
}
export default UploadFileFirst;