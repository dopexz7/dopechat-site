import React from "react";
import { Link } from "react-scroll";

import { Fade } from "react-reveal";
export default function LookAt() {
  return (
    <div
      className="winScl:scale-[0.9] winScl:mt-20 hidden lg:flex flex-row space-x-10 items-center pt-0 h-screen"
      id="section2"
    >
      <div className="w-full p-10 lg:p-0 lg:w-2/5 flex flex-col lg:flex-col text-white lg:mr-16 lg:ml-16">
        <Fade left>
          <h3 className="text-xs lg:text-sm font-bold text-accent-gray">
            features
          </h3>
        </Fade>
        <Fade left>
          <h1 className="text-2xl lg:text-6xl font-bold lg:font-normal text-main-black mt-6 tracking-tight w-3/4">
            A look at extension&apos;s features
          </h1>
        </Fade>
        <Fade left>
          <h3 className="text-xs lg:text-sm font-bold text-accent-gray mt-6 w-3/4">
            Extension features customized chat apperance, custom emotes, popout
            chat and theatre mode.
          </h3>
        </Fade>
        <Fade left>
          <Link
            className="border-2 hidden lg:flex lg:flex-row cursor-pointer duration-300 rounded-lg px-4 py-2 w-max text-main-black font-bold hover:border-accent-purple hover:text-main-purple mt-6"
            to="section3"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            View the full changelog
          </Link>
        </Fade>
      </div>

      <div className="flex items-center justify-center relative">
        <div className="lll3 rounded-xl z-20 shadow-xl border-2 border-main-black absolute translate-x-[20%] translate-y-[40px] scale-x-[0.86] skew-y-[8deg]">
          <span className="absolute bottom-3 right-3 text-white bg-darker-purple p-3 px-10 rounded-xl">
            Custom emotes
          </span>
        </div>

        <div className="lll2 rounded-xl z-10 shadow-xl border-2 border-main-black absolute translate-x-[75%] skew-y-[8deg]">
          <span className="absolute bottom-3 right-3 text-white bg-darker-purple p-3 px-10 rounded-xl">
            Popout chat
          </span>
        </div>
        <div className="lll rounded-xl border-2 border-main-black z-0 absolute translate-x-[80%] translate-y-[-40px] scale-x-[0.86] skew-y-[8deg]">
          <span className="absolute bottom-3 right-3 text-white bg-darker-purple p-3 px-10 rounded-xl">
            Theatre mode
          </span>
        </div>
      </div>
    </div>
  );
}
