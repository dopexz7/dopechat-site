import React, { FC } from "react";
import { motion } from "framer-motion";
import { leftToRightVariant, rightToLeftVariant } from "./transitionVariants";
import { BrowserView, MobileView } from "react-device-detect";
import ChangelogData from "./ChangelogData";
const Changelog: FC = () => {
  return (
    <>
      <div
        className="w-screen flex flex-row h-screen items-center"
        id="section3"
      >
        <div className="mr-auto w-screen max-w-6xl h-3/4 space-x-6 lg:space-x-20 p-6 flex flex-row lg:flex-row justify-center items-center">
          <BrowserView>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={leftToRightVariant}
              className="text-2xl lg:text-8xl font-normal lg:font-light tracking-tight"
            >
              Changelog
            </motion.div>
          </BrowserView>
          <MobileView>
            <div className="text-2xl lg:text-8xl font-normal lg:font-light tracking-tight">
              Changelog
            </div>
          </MobileView>
          <BrowserView>
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={rightToLeftVariant}
              className="h-5/6 p-3 font-normal rounded-xl flex flex-col scrollbar-thin scrollbar-thumb-white scrollbar-track-main-white overflow-y-scroll w-full text-sm border-[1px] border-white border-opacity-5 shadow-2xl "
            >
              <ChangelogData />
            </motion.div>
          </BrowserView>
          <MobileView>
            <div
              className="h-5/6 p-3 font-normal rounded-xl flex flex-col scrollbar-thin scrollbar-thumb-white scrollbar-track-main-white overflow-y-scroll w-full text-sm border-[1px] border-white border-opacity-5 shadow-2xl "
            >
              <ChangelogData />
            </div>
          </MobileView>
        </div>
      </div>
    </>
  );
}
export default Changelog;