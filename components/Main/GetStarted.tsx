import React, { FC } from "react";
import * as Scroll from "react-scroll";

const GetStarted: FC = () => {
  const scroll = Scroll.animateScroll;
  return (
    <div
      className="lg:p-0 w-full max-w-7xl winScl:scale-90 winScl:mt-0 flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-full p-3 lg:h-screen"
      id="section5"
    >
      <div className="duration-300 w-full h-1/2 bg-darker-purple rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="duration-300 text-base font-medium lg:font-light text-accent-white lg:text-6xl">
          Get started
        </div>
        <div
          className="text-sm lg:text-base border-2 duration-300 hover:bg-white hover:text-main-purple text-white p-3 lg:py-3 lg:px-6 rounded-3xl font-normal cursor-pointer mt-3 lg:mt-10"
          onClick={() => scroll.scrollToTop()}
        >
          Download now!
        </div>
      </div>
    </div>
  );
}
export default GetStarted