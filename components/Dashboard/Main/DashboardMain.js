import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import { supabase } from "../../../lib/supabaseClient";

export default function DashboardMain({ session, data }) {
  return (
    <DashboardLayout session={session} title="Dashboard">
      <div className="text-black border-r-2 h-full w-[55%] flex flex-col">
        <DashboardMiddleSection data={data} session={session} />
      </div>
      <div className="text-black bg-border-white h-full w-3/12 flex flex-col">
        <div className="p-5 flex flex-row items-center justify-center ">
          <div className="font-bold text-accent-purple  px-6 py-2 rounded-2xl  text-lg">
            Recently uploaded emotes
          </div>
        </div>
        <div className="w-full overflow-hidden h-full p-3 flex flex-col space-y-3 items-center">
          <div className="overflow-auto flex flex-row items-center space-x-3 bg-white  justify-center w-full h-full">
            <div>https://imgur.com/a/BwrxXA9</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
