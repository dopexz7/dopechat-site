import React, { FC, useEffect, useState } from "react";
import AdminRoute from "../../../contexts/adminRoute";
import DashboardLayout from "../Main/DashboardLayout";
import * as Bi from "react-icons/bi";
import * as Md from "react-icons/md";
import { supabase } from "../../../lib/supabaseClient";
import useReadSubmissions from "../../../funcs/useReadSubmissions";
import DashboardLeftSignedIn from '../Main/Leftside/DashboardLeftSignedIn'

interface submitFileTypes {
  url: string;
  name: string;
  uploaded_by: string;
  created_at: Date;
  
}

const MainAdmin: FC = () => {
  const [data, setData] = useState<any[]>();
  const submissions = useReadSubmissions();
  useEffect(() => {
    setData(submissions);
  }, [submissions]);

  const deleteFromDb = async (v:submitFileTypes) => {
    const deletingFromDb = supabase
      .from("submitfiles")
      .delete()
      .eq("url", v.url);
    const removeFromUploads = supabase.storage.from("uploads").remove([v.name]);

    let newAr: any[] = [];
    const dataAr = data;
    dataAr!.forEach((d) => {
      if (d !== v) newAr.push(d);
    });
    setData(newAr);

    await Promise.all([deletingFromDb, removeFromUploads]);
  };
  const approveToDb = async (v:submitFileTypes) => {
    const movingToApproved = supabase.storage
      .from("uploads")
      .move(`${v.name}`, `approved/${v.name}`);
    const { data: fileUrl } = await supabase.storage
      .from("uploads")
      .getPublicUrl(`approved/${v.name}`);
    const newFile = {
      uploaded_by: v.uploaded_by,
      code: v.name,
      src: fileUrl!.publicURL,
      date: v.created_at,
    };
    const insertingNewFile = supabase.from("allemotes").insert(newFile);

    const deletingFromOldTable = supabase
      .from("submitfiles")
      .delete()
      .eq("url", v.url);

    let newAr : any[] = [];
    const dataAr = data;
    dataAr!.forEach((d) => {
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
      <DashboardLayout title="Admin">
        <div className="border-[1px] border-white border-opacity-5 shadow-2xl rounded-3xl h-max backdrop-blur-sm max-w-full w-1/5 flex flex-col">
          <DashboardLeftSignedIn profile={true} onSuccess={function () {
            throw new Error("Function not implemented.");
          } } />
        </div>
        <div className="shadow-sm backdrop-blur-sm border-[1px] rounded-3xl p-1 border-white border-opacity-5 h-full w-[55%] flex flex-col">
          <div className="px-6 py-2 flex flex-row items-center">
            <div className="flex flex-row items-center  text-white">
              <p className="text-xl">User submitted emotes</p>
            </div>
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
                      <img
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
                      <div className="overflow-hidden mt-auto ml-auto mr-auto text-sm font-normal">
                        by {d.uploaded_by}
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
      </DashboardLayout>
    </AdminRoute>
  );
}
export default MainAdmin;
