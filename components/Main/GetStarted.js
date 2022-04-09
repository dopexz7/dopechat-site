import React from "react";
import * as Scroll from "react-scroll";
import { Fade } from "react-reveal";
export default function GetStarted() {
  const scroll = Scroll.animateScroll;
  return (
    <div
      className="p-6 lg:p-0 winScl:scale-90 winScl:mt-0 flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-screen"
      id="section5"
    >
      <div className="duration-300 w-full h-1/2 bg-darker-purple rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
        <Fade top>
          <span className="z-50 duration-300 text-6xl font-light text-white">
            Get started
          </span>
        </Fade>
        <Fade bottom>
          <div
            className="z-50 border-2 duration-300 hover:bg-white hover:text-main-purple text-white p-3 px-6 rounded-3xl font-normal cursor-pointer mt-6"
            onClick={() => scroll.scrollToTop()}
          >
            Download now!
          </div>
        </Fade>
      </div>
    </div>
  );
}
