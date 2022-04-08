import React from "react";
import * as Scroll from "react-scroll";

export default function GetStarted() {
  const scroll = Scroll.animateScroll;
  return (
    <div
      className="p-6 lg:p-0 winScl:scale-90 winScl:mt-0 flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-screen"
      id="section5"
    >
      <div className="duration-300 w-full h-1/2 bg-darker-purple rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
        <h1 className="z-50 duration-300 text-6xl text-white">Get started</h1>
        <div
          className="z-50 border-2 duration-300 hover:bg-white hover:text-main-purple text-white p-3 px-6 rounded-3xl font-bold cursor-pointer mt-6"
          onClick={() => scroll.scrollToTop()}
        >
          Download now
        </div>
      </div>
    </div>
  );
}
