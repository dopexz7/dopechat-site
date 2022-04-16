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
      <YourEmoteSets onSuccess={onEditingSet} session={session} />
    </DashboardLayout>
  );
}
