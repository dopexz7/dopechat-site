import React from "react";
import { FC } from "react";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import DashboardLeftSignedIn from "./Leftside/DashboardLeftSignedIn";

interface DashMainTypes {
  data: Array<any>;
}

const DashboardMain:FC<DashMainTypes> = ({ data }) =>{
  const [editingSet, setEditingSet] = useState<String>("");

  return (
    <DashboardLayout title="Dashboard">
      <div className="border-[1px] border-white border-opacity-5 shadow-2xl rounded-3xl h-max backdrop-blur-sm max-w-full w-1/5 flex flex-col">
        <DashboardLeftSignedIn onSuccess={(x : string) => setEditingSet(x)} />
      </div>
      <div className="shadow-sm backdrop-blur-sm border-[1px] rounded-3xl p-1 border-white border-opacity-5 h-full w-[55%] flex flex-col">
        <DashboardMiddleSection
          data={data.slice(0, 36)}
          fullSet={data}
          editingSet={editingSet}
        />
      </div>

    </DashboardLayout>
  );
}
export default DashboardMain;