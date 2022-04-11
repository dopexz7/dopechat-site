import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import { supabase } from "../../../lib/supabaseClient";
import * as Md from "react-icons/md";
export default function DashboardMain({ session, data }) {
  const [editingSet, setEditingSet] = useState("");
  const [availEdits, setAvailEdits] = useState([]);
  const seeMods = async () => {
    let { data: mods, error } = await supabase.from("useremotes").select("*");
    mods?.forEach((v) => {
      if (v.mods?.includes(session?.user?.user_metadata.name)) {
        setAvailEdits((prevState) => [...prevState, v]);
      }
    });
  };

  useEffect(() => {
    seeMods();
  }, [session]);

  // useEffect(() => {
  //   seeMods();
  // }, [session]);
  return (
    <DashboardLayout session={session} title="Dashboard">
      <div className="text-black border-r-2 h-full w-[55%] flex flex-col">
        <DashboardMiddleSection
          data={data}
          editingSet={editingSet}
          session={session}
        />
      </div>
      <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
        <div className="px-6 py-5 flex flex-row items-center justify-center ">
          <div className="font-normal text-accent-purple  px-6 py-2 rounded-2xl  text-lg">
            Your emote sets
          </div>
        </div>
        <div className="w-full overflow-y-auto h-full p-6 flex flex-col space-y-3">
          {availEdits &&
            availEdits.map((data, index) => (
              <div
                key={index}
                className="space-x-1 flex flex-row p-6 items-center justify-center bg-white w-full rounded-2xl"
              >
                <div className="flex flex-col mr-auto">
                  <div className="font-semibold py-1">
                    {data.name}&apos;s set
                  </div>
                </div>
                <div
                  onClick={() =>
                    editingSet === data.name
                      ? setEditingSet()
                      : setEditingSet(data.name)
                  }
                  className={` ${
                    editingSet === data.name
                      ? "bg-darker-purple text-white border-darker-purple"
                      : "text-darker-purple  hover:bg-darker-purple hover:text-white hover:border-darker-purple"
                  } flex-row p-1 border-2 font-normal cursor-pointer  duration-300  rounded-3xl`}
                >
                  {editingSet === data.name ? <Md.MdCheck /> : <Md.MdAdd />}
                </div>
              </div>
            ))}
        </div>
        <div className="border-t-2 px-6 py-6 flex flex-row items-center justify-center bg-white font-normal text-accent-purple text-lg hover:bg-darker-purple duration-300 cursor-pointer hover:text-white border-0">
          Request access to emote sets
        </div>
      </div>
    </DashboardLayout>
  );
}
