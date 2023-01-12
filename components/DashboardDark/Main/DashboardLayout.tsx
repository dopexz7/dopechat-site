import { FC } from "react";
import React from "react";
import { MainNav } from "../../mainpage/nav/navigation";

const DashboardLayout:FC<LayoutTypes> = (props) => {
  return (
    <>
    <div className="overflow-hidden bg-black h-screen w-screen flex flex-col justify-center items-center">
      <MainNav dashboard={true} />
      <div
      className={`overflow-hidden w-screen h-screen flex ${
        props.layout === "sets"
          ? "flex-col p-3"
          : "flex-row space-x-6 py-[60px] px-[60px]"
      } items-center `}
    >
      {props.children}
    </div>
    </div>
    </>
  )
};

export default DashboardLayout;

interface LayoutTypes {
  children: React.ReactNode;
  layout: string;
}
