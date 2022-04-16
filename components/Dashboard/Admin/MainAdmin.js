import React, { useEffect, useState } from "react";
import AdminRoute from "../../../contexts/adminRoute";
import DashboardLayout from "../Main/DashboardLayout";
import * as Bi from "react-icons/bi";
import * as Md from "react-icons/md";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";
import useReadSubmissions from "../../../funcs/useReadSubmissions";
export default function MainAdmin({ session }) {
  const [data, setData] = useState();
  const submissions = useReadSubmissions();
  useEffect(() => {
    setData(submissions);
  }, [submissions]);

  const deleteFromDb = async (v) => {
    const deletingFromDb = supabase
      .from("submitfiles")
      .delete()
      .eq("url", v.url);
    const removeFromUploads = supabase.storage.from("uploads").remove([v.name]);

    let newAr = [];
    const dataAr = data;
    dataAr.forEach((d) => {
      if (d !== v) newAr.push(d);
    });
    setData(newAr);

    await Promise.all([deletingFromDb, removeFromUploads]);
  };
  const approveToDb = async (v) => {
    const movingToApproved = supabase.storage
      .from("uploads")
      .move(`${v.name}`, `approved/${v.name}`);
    const { data: fileUrl, erx } = await supabase.storage
      .from("uploads")
      .getPublicUrl(`approved/${v.name}`);
    if (erx) console.log(erx);
    console.log(data);
    const newFile = {
      uploaded_by: v.uploaded_by,
      code: v.name,
      src: fileUrl.publicURL,
      date: v.created_at,
    };
    const insertingNewFile = supabase.from("allemotes").insert(newFile);

    const deletingFromOldTable = supabase
      .from("submitfiles")
      .delete()
      .eq("url", v.url);

    let newAr = [];
    const dataAr = data;
    dataAr.forEach((d) => {
      if (d !== v) newAr.push(d);
    });
    setData(newAr);
    await Promise.all([
      movingToApproved,
      insertingNewFile,
      deletingFromOldTable,
    ]);
  };
  return (
    <AdminRoute>
      <DashboardLayout session={session} title="Admin">
        <div className="text-black border-r-2 h-full w-[55%] flex flex-col overflow-hidden">
          <div className="px-6 py-6 font-normal text-lg  border-b-2 flex flex-row items-center">
            <div className="p-0.5">User submitted emotes</div>
          </div>

          <div className="grid xgrd gap-3 p-6 overflow-y-auto">
            {data &&
              data.map((d, index) => (
                <div
                  key={index}
                  className="h-32 w-32 group duration-300 bg-accent-white rounded-md"
                >
                  <div className="w-full h-32 overflow-hidden text-black flex flex-row justify-center relative border-2 rounded-md">
                    <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
                      <Image
                        height={64}
                        width={64}
                        className="group-hover:scale-50 group-hover:opacity-25 duration-300"
                        src={d.url}
                        alt={d.code}
                      />
                    </div>

                    <div className="w-full  relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                      <div className="overflow-hidden mt-auto ml-auto mr-auto text-sm font-normal">
                        {d.name}
                      </div>
                      <div className="flex flex-row justify-center items-center mt-auto">
                        <div
                          onClick={() => approveToDb(d)}
                          className="approve flex items-center justify-center w-full hover:rounded-2xl p-1 text-white text-sm cursor-pointer duration-300 h-full"
                        >
                          <Bi.BiCheckCircle />
                        </div>
                        <div
                          onClick={() => deleteFromDb(d)}
                          className="remove w-full flex items-center justify-center hover:rounded-2xl p-1 text-center text-white text-sm  cursor-pointer duration-300 h-full"
                        >
                          <Md.MdRemoveCircleOutline />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
          <div className="px-6 py-5 flex flex-row items-center justify-center ">
            <div className="font-normal text-accent-purple  px-6 py-2 rounded-2xl  text-lg">
              Pending emote sets
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}
