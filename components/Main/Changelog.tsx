import React, { FC } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { leftToRightVariant, rightToLeftVariant } from "./transitionVariants";
import ChangelogData from "./ChangelogData";
const Changelog: FC = () => {
  const [deviceType, setDeviceType] = useState("");
   useEffect(() => {
     if (
       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
         navigator.userAgent
       )
     ) {
       setDeviceType("Mobile");
     } else {
       setDeviceType("Desktop");
     }
   }, []);

  return (
    <>
      <div
        className="w-screen flex flex-row h-screen items-center"
        id="section3"
      >
        <div className="mr-auto w-screen max-w-6xl h-3/4 space-x-6 lg:space-x-20 p-6 flex flex-row lg:flex-row justify-center items-center">
          {deviceType === "Mobile" ? (
            <div className="text-2xl lg:text-8xl font-normal lg:font-light tracking-tight">
              Changelog
            </div>
          ) : (
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={leftToRightVariant}
              className="text-2xl lg:text-8xl font-normal lg:font-light tracking-tight"
            >
              Changelog
            </motion.div>
          )}
          {deviceType === "Mobile" ? (
            <div className="h-5/6 p-3 font-normal rounded-xl flex flex-col scrollbar-thin scrollbar-thumb-white scrollbar-track-main-white overflow-y-scroll w-full text-sm border-[1px] border-white border-opacity-5 shadow-2xl ">
              <ChangelogData />
            </div>
          ) : (
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={rightToLeftVariant}
              className="h-5/6 p-3 font-normal rounded-xl flex flex-col scrollbar-thin scrollbar-thumb-white scrollbar-track-main-white overflow-y-scroll w-full text-sm border-[1px] border-white border-opacity-5 shadow-2xl "
            >
              <ChangelogData />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
export default Changelog;