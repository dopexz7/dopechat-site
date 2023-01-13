import { FC } from "react";
import React from "react";

const DashboardLayout:FC<LayoutTypes> = (props) => {
  return (
    <>

      <div
      className={`overflow-hidden w-screen h-screen flex ${
        props.layout === "sets"
          ? "flex-col p-3 py-[10px] pt-[110px]"
          : "flex-row space-x-6 py-[10px] pt-[110px] px-[60px]"
      } items-center `}
    >
      {props.children}
    </div>

    </>
  )
};

export default DashboardLayout;

interface LayoutTypes {
  children: React.ReactNode;
  layout: string;
}
