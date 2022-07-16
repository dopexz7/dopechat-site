import React, { FC } from "react";
import { changelogData } from "./changelogData";
import * as Cg from "react-icons/cg";
import * as Md from "react-icons/md";
import { useGetDevType } from "./useGetDevType";

const Changelog: FC = () => {
  const deviceType = useGetDevType();
  return (
    <>
      <div
        className="w-screen max-w-6xl flex flex-row h-screen items-center"
        id="section3"
      >
        <div className="mr-auto w-screen h-3/4 p-6 flex flex-row lg:flex-row justify-center items-center">
          <div className="text-2xl lg:text-8xl font-normal lg:font-light tracking-tight">
            Changelog
          </div>
          <div className="hidden lg:flex fixed text-9xl left-0 opacity-[0.02] font-light tracking-tight">
            changelog
          </div>
          <div className="h-5/6 ml-3 p-3 font-normal rounded-xl flex flex-col overflow-y-scroll w-full text-sm border-[1px] border-white border-opacity-5 shadow-2xl bg-black bg-opacity-10">
            <div className="flex flex-row items-center relative">
              <div className="flex items-center opacity-50 text-md top-1 absolute right-3">
                {deviceType === "Mobile" ? (
                  <>
                    <Md.MdOutlineSwipe className="mr-1" />
                    SWIPE DOWN
                  </>
                ) : (
                  <>
                    <Cg.CgMouse className="mr-1" /> SCROLL DOWN
                  </>
                )}
              </div>
            </div>
            {Object.keys(changelogData).map((key, index) => (
              <div key={index}>
                <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                  {key}
                </div>
                <div className="m-3">
                  {changelogData[key].map((v: any, indexe: any) => (
                    <div key={indexe}>{v}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Changelog;