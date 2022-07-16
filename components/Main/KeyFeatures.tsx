import { motion } from "framer-motion";
import { FC } from "react";
import { featuresList } from "./featuresData";
import { leftToRightVariant, bottomToTopVariant } from './transitionVariants'
import { useGetDevType } from "./useGetDevType";
const KeyFeatures: FC = () => {
  const deviceType = useGetDevType();
  return (
    <div
      className="p-6 lg:p-8 lg:mt-36 w-screen max-w-6xl lg:fixed top-0 flex flex-col"
      id="section1"
    >
      <motion.div
        initial={deviceType === "Mobile" ? "offscreen" : "onscreen"}
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={leftToRightVariant}
        className="flex flex-col text-2xl lg:text-5xl font-light max-w-xl m-6"
      >
        <div>Key</div>
        <div>features</div>
      </motion.div>
      <motion.div
        initial={deviceType === "Mobile" ? "offscreen" : "onscreen"}
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={bottomToTopVariant}
        className="flex flex-col lg:flex-row text-white lg:space-x-16 space-y-0 lg:mt-2 border-[1px] border-white border-opacity-5 shadow-2xl p-10 rounded-3xl"
      >
        {featuresList.map((data: any, index: any) => (
          <div className="flex flex-col m-auto items-center " key={index}>
            {data.icon}
            <div className="lg:mt-14 text-base lg:text-lg text-white font-medium w-2/4 lg:w-full text-center lg:border-0">
              {data.title}
            </div>
            <div className="lg:mt-6 text-sm tracking-wider font-light w-4/5 lg:w-full p-3 text-justify lg:text-left">
              {data.description}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
export default KeyFeatures