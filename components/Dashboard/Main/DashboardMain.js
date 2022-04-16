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
      <div className="text-black border-r-2 h-full w-[55%] flex flex-col">
        <DashboardMiddleSection
          data={data.slice(0, 36)}
          fullSet={data}
          editingSet={editingSet}
          session={session}
        />
      </div>
      {session ? (
        <YourEmoteSets onSuccess={onEditingSet} session={session} />
      ) : (
        <div className="bg-border-white h-full w-1/4 flex flex-col">
          <div className="font-normal text-main-black text-lg p-6 flex flex-col items-center">
            <div className="border-2 border-accent-purple  w-max text-accent-purple rounded-2xl p-3">
              A signed in user can
            </div>
            <div className="flex flex-col items-center space-y-3 p-6">
              <p className="list-item">Upload up to 15 emotes daily</p>
              <p className="list-item">View other user sets</p>
              <p className="list-item">Edit available user sets</p>
              <p className="list-item">Enjoy other benefits</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
