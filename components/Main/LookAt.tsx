import React, { FC } from "react";

const LookAt: FC = () => {
  return (
    <div
      className="w-screen max-w-6xl flex flex-col lg:flex-row lg:space-x-10 items-center pt-0 h-full lg:h-screen"
      id="section2"
    >
      <div className="w-full p-8 pb-4 lg:p-0 lg:w-2/6 flex flex-col lg:flex-col  lg:mr-16 lg:ml-16">
        <div className="text-2xl lg:text-6xl font-light  mt-6 tracking-tight w-3/4">
          A look at extension&apos;s features
        </div>
        <div className="hidden lg:flex fixed text-9xl left-0 mt-14 opacity-[0.02] font-light tracking-tight">
          features
        </div>
        <div className="text-xs lg:text-sm font-normal text-accent-white mt-3 w-full">
          Extension features customized chat apperance, custom emotes, popout
          chat and theatre mode.
        </div>
      </div>

      <div className="flex lg:hidden flex-row w-11/12 p-0 rounded-3xl overflow-hidden">
        <div className="bg-custom-emotes w-full h-72 bg-cover relative">
          <span className="bg-opacity-5 text-white backdrop-blur-sm border-[1px] border-white border-opacity-5 absolute bottom-1 right-0 text-xs p-1 mr-1 rounded-lg">
            Custom emotes
          </span>
        </div>
        <div className="bg-popout-chat w-full h-72 bg-cover relative">
          <span className="bg-opacity-5 text-white backdrop-blur-sm border-[1px] border-white border-opacity-5 absolute bottom-1 left-0 text-xs p-1 ml-6 rounded-lg">
            Popout chat
          </span>
        </div>
        <div className="bg-theatre-mode w-full h-72 bg-cover relative">
          <span className="bg-opacity-5 text-white backdrop-blur-sm border-[1px] border-white border-opacity-5 absolute bottom-1 left-0 text-xs  p-1 ml-1 rounded-lg">
            Theatre mode
          </span>
        </div>
      </div>

      <div className="hidden lg:flex flex-row items-center relative w-4/6">
        <div className="lll3 rounded-xl z-20 shadow-xl border-2 border-main-black absolute translate-x-[10%] translate-y-[40px] scale-x-[0.86] skew-y-[8deg]">
          <span className="bg-opacity-5 text-white backdrop-blur-sm border-[1px] border-white border-opacity-5 absolute bottom-3 right-3 font-medium p-3 px-10 rounded-xl">
            Custom emotes
          </span>
        </div>

        <div className="lll2 rounded-xl z-10 shadow-xl border-2 border-main-black absolute translate-x-[65%] skew-y-[8deg]">
          <span className="bg-opacity-5 text-white backdrop-blur-sm border-[1px] border-white border-opacity-5 absolute bottom-3 right-3 font-medium p-3 px-10 rounded-xl">
            Popout chat
          </span>
        </div>
        <div className="lll rounded-xl border-2 border-main-black z-0 absolute translate-x-[50%] translate-y-[-40px] scale-x-[0.86] skew-y-[8deg]">
          <span className="bg-opacity-5 text-white backdrop-blur-sm border-[1px] border-white border-opacity-5 absolute bottom-3 right-3 font-medium p-3 px-10 rounded-xl">
            Theatre mode
          </span>
        </div>
      </div>
    </div>
  );
}
export default LookAt