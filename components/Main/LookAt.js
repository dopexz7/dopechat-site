import React from "react";
import { Link } from "react-scroll";
import { leftToRightVariant, rightToLeftVariant } from "./transitionVariants";
import { motion } from "framer-motion";
export default function LookAt() {
  return (
    <div
      className="winScl:scale-[0.9] w-full max-w-7xl winScl:mt-20 hidden lg:flex flex-row space-x-10 items-center pt-0 h-screen"
      id="section2"
    >
      <div className="w-full p-10 lg:p-0 lg:w-2/6 flex flex-col lg:flex-col text-white lg:mr-16 lg:ml-16">
        <motion.span
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={leftToRightVariant}
          className="text-xs lg:text-sm font-normal text-accent-gray"
        >
          features
        </motion.span>

        <motion.span
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={leftToRightVariant}
          className="text-2xl lg:text-6xl font-light text-main-black mt-6 tracking-tight w-3/4"
        >
          A look at extension&apos;s features
        </motion.span>

        <motion.span
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={leftToRightVariant}
          className="text-xs lg:text-sm font-normal text-accent-gray mt-6 w-3/4"
        >
          Extension features customized chat apperance, custom emotes, popout
          chat and theatre mode.
        </motion.span>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={leftToRightVariant}
        >
          <Link
            className="border-2 hidden lg:flex lg:flex-row cursor-pointer duration-300 rounded-lg px-4 py-2 w-max text-main-black font-normal hover:border-accent-purple hover:text-main-purple mt-6"
            to="section3"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            View the full changelog
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={rightToLeftVariant}
        className="flex flex-row items-center relative w-4/6"
      >
        <div className="lll3 rounded-xl z-20 shadow-xl border-2 border-main-black absolute translate-x-[10%] translate-y-[40px] scale-x-[0.86] skew-y-[8deg]">
          <span className="absolute bottom-3 right-3 text-darker-purple font-medium bg-white p-3 px-10 rounded-xl">
            Custom emotes
          </span>
        </div>

        <div className="lll2 rounded-xl z-10 shadow-xl border-2 border-main-black absolute translate-x-[65%] skew-y-[8deg]">
          <span className="absolute bottom-3 right-3 text-darker-purple font-medium bg-white p-3 px-10 rounded-xl">
            Popout chat
          </span>
        </div>
        <div className="lll rounded-xl border-2 border-main-black z-0 absolute translate-x-[50%] translate-y-[-40px] scale-x-[0.86] skew-y-[8deg]">
          <span className="absolute bottom-3 right-3 text-darker-purple font-medium bg-white p-3 px-10 rounded-xl">
            Theatre mode
          </span>
        </div>
      </motion.div>
    </div>
  );
}
