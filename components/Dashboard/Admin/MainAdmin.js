import React, { useEffect, useState } from "react";
import AdminRoute from "../../../contexts/adminRoute";
import DashboardLayout from "../Main/DashboardLayout";
import * as Bi from "react-icons/bi";
import * as Md from "react-icons/md";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";
export default function MainAdmin({ session }) {
  const [data, setData] = useState();
  const readSubmissions = async () => {
    let { data: submitfiles, error } = await supabase
      .from("submitfiles")
      .select("*");
    setData(submitfiles);
  };

  useEffect(() => {
    readSubmissions();
  }, [data]);
  console.log();
  const deleteFromDb = async (v) => {
    const { lulerz, error } = await supabase
      .from("submitfiles")
      .delete()
      .eq("url", v.url);
    console.log(v);
    const { lol, er } = await supabase.storage.from("uploads").remove([v.name]);
  };
  const approveToDb = async (v) => {
    const { data, error } = await supabase.storage
      .from("uploads")
      .move(`${v.name}`, `approved/${v.name}`);

    const { data: fileUrl, erx } = await supabase.storage
      .from("uploads")
      .getPublicUrl(`approved/${v.name}`);

    const newFile = {
      uploaded_by: v.uploaded_by,
      code: v.name,
      src: fileUrl.publicURL,
      date: v.created_at,
    };
    const { data: drx, e } = await supabase.from("allemotes").insert(newFile);

    const { lulerz, er } = await supabase
      .from("submitfiles")
      .delete()
      .eq("url", v.url);
  };
  return (
    <AdminRoute>
      <DashboardLayout session={session} title="Admin">
        <div className="text-black border-r-2 h-full w-[55%] flex flex-col overflow-hidden">
          <div className="px-6 py-6 font-normal text-lg  border-b-2 flex flex-row items-center">
            <div className="p-0.5">User submitted emotes</div>
          </div>

          <div className="grid xgrd gap-3 p-6">
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
                        src={`https://res.cloudinary.com/demo/image/fetch/${d.url}`}
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
                      {/* <div className="flex flex-row">
                        <div className="text-xs  bg-darker-purple rounded-3xl items-center justify-center p-1 flex flex-row text-white hover:bg-white hover:text-darker-purple duration-300 font-normal cursor-pointer">
                          <Bi.BiCheckCircle className="mr-1" /> approve
                        </div>
                        <div className="text-xs bg-darker-purple rounded-3xl items-center justify-center p-1 flex flex-row text-white hover:bg-white hover:text-darker-purple duration-300 font-normal cursor-pointer">
                          <Bi.BiCheckCircle className="mr-1" /> deny
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
          <div className="px-6 py-5 flex flex-row items-center justify-center ">
            <div className="font-normal text-accent-purple  px-6 py-2 rounded-2xl  text-lg">
              Your emote sets
            </div>
          </div>
          <div className="w-full overflow-y-auto h-full p-6 flex flex-col space-y-3">
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">dope&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Owner
                </div>
              </div>
              <div className="ml-auto flex px-4 py-1 text-darker-purple border-2 font-normal cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
              <div className="ml-auto flex px-4 py-1 text-darker-purple border-2 font-normal cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Settings
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Ramee&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-normal cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Rated&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-normal cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Vader&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-normal cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Vader&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-normal cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
            <div className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl">
              <div className="flex flex-col mr-auto w-full">
                <div className="font-semibold py-1">Vader&apos;s set</div>
                <div className="border-2 font-normal w-max px-3 py-0.5 rounded-3xl">
                  Editor
                </div>
              </div>
              <div className="ml-auto flex px-4 py-0.5 text-darker-purple border-2 font-normal cursor-pointer hover:bg-darker-purple hover:text-white duration-300 hover:border-darker-purple rounded-3xl">
                Edit
              </div>
            </div>
          </div>
          <div className="border-t-2 px-6 py-6 flex flex-row items-center justify-center bg-white font-normal text-accent-purple text-lg hover:bg-darker-purple duration-300 cursor-pointer hover:text-white border-0">
            Request access to emote sets
          </div>
        </div>
      </DashboardLayout>
    </AdminRoute>
  );
}
