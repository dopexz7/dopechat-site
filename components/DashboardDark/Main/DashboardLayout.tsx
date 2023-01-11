import Head from "next/head";
import { FC } from "react";
import React from "react";
import { MainNav } from "../../mainpage/nav/navigation";

const DashboardLayout:FC<LayoutTypes> = (props) => {
  return (
    <>
    <Head>
        <title>{props.title}</title>
        <meta name="description" content="Facebook Gaming extension dopeChat" />
      </Head>
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
  title: string;
  layout: string;
}
