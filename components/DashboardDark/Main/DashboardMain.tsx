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
      
        <DashboardLeftSignedIn onSuccess={(x : string): any => setEditingSet(x)} />
      
      <div className="shadow-sm backdrop-blur-sm border-[1px] rounded-3xl lg:p-1 border-white border-opacity-5 h-full w-full lg:w-[55%] flex flex-col">
        <DashboardMiddleSection
          editingSet={editingSet}  />
      </div>

    </DashboardLayout>
  );
}
export default DashboardMain;