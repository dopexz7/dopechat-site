import React from "react";
import * as Scroll from "react-scroll";
import { motion } from "framer-motion";
import { bottomToTopVariant, topToBottomVariant } from "./transitionVariants";
export default function GetStarted() {
  const scroll = Scroll.animateScroll;
  return (
    <div
      className="p-6 lg:p-0 w-full max-w-7xl winScl:scale-90 winScl:mt-0 flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-screen"
      id="section5"
    >
      <div className="duration-300 w-full h-1/2 bg-darker-purple rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
        <motion.span
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={topToBottomVariant}
          className="z-50 duration-300 text-6xl font-light text-white"
        >
          Get started
        </motion.span>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={bottomToTopVariant}
          className="border-2 duration-300 hover:bg-white hover:text-main-purple text-white p-3 px-6 rounded-3xl font-normal cursor-pointer mt-6"
          onClick={() => scroll.scrollToTop()}
        >
          Download now!
        </motion.div>
      </div>
    </div>
  );
}
