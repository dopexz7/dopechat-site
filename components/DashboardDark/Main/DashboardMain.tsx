import React from "react";
import { FC } from "react";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import DashboardLeftSignedIn from "./Leftside/DashboardLeftSignedIn";

const DashboardMain:FC = () =>{
  const [editingSet, setEditingSet] = useState<string>("");
  return (
    <DashboardLayout title="Dashboard" layout="dashboard">
      <div className="border-[1px] border-white border-opacity-5 shadow-2xl rounded-3xl h-max backdrop-blur-sm max-w-full w-full lg:w-1/5 flex flex-col">
        <DashboardLeftSignedIn onSuccess={(x : string): any => setEditingSet(x)} />
      </div>
      <div className="shadow-sm backdrop-blur-sm border-[1px] rounded-3xl lg:p-1 border-white border-opacity-5 h-full w-full lg:w-[55%] flex flex-col">
        <DashboardMiddleSection
          editingSet={editingSet}  />
      </div>

    </DashboardLayout>
  );
}
export default DashboardMain;