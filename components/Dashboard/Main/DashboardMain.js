import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import YourEmoteSets from "./Rightside/YourEmoteSets";
export default function DashboardMain({ session, data }) {
  const [editingSet, setEditingSet] = useState("");

  const onEditingSet = (x) => {
    setEditingSet(x);
  };

  return (
    <DashboardLayout session={session} title="Dashboard">
      <div
        className={`text-black border-r-2 h-full ${
          session ? "w-[55%]" : "w-[80%]"
        }  flex flex-col`}
      >
        <DashboardMiddleSection
          data={session ? data.slice(0, 36) : data.slice(0, 60)}
          fullSet={data}
          editingSet={editingSet}
          session={session}
        />
      </div>
      {session ? (
        <YourEmoteSets onSuccess={onEditingSet} session={session} />
      ) : (
        ""
        // <div className="bg-border-white h-full w-1/4 flex flex-col">
        //   <div className="font-normal text-center text-accent-purple text-lg p-6 flex flex-row items-center justify-center ">
        //     Sign in to upload emotes, view/edit user sets.
        //   </div>
        // </div>
      )}
    </DashboardLayout>
  );
}
