import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import YourEmoteSets from "./Rightside/YourEmoteSets";

export default function DashboardMain({ data }) {
  const [editingSet, setEditingSet] = useState("");
  
  return (
    <DashboardLayout title="Dashboard">
      <div className="text-black border-r-2 h-full w-[55%] flex flex-col">
        <DashboardMiddleSection
          data={data.slice(0, 36)}
          fullSet={data}
          editingSet={editingSet}
        />
      </div>
        <YourEmoteSets onSuccess={(x) => setEditingSet(x)} />
    </DashboardLayout>
  );
}
