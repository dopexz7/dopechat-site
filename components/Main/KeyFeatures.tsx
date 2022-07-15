import { motion } from "framer-motion";
import { FC } from "react";
import { featuresList } from "./featuresData";
const KeyFeatures: FC = () => {
  const leftToRightVariant = {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: {
     y: 0,
      opacity: 1,
      transition: {
        type: "fade",
        fade: 0.4,
        duration: 0.8,
      },
    },
  };
  return (
    <div
      className="p-6 lg:p-8 mt-36 w-screen max-w-6xl  fixed top-0 flex flex-col"
      id="section1"
    >
      <div className="flex flex-col text-2xl lg:text-5xl font-light max-w-xl m-6">
        <div>Key</div>
        <div>features</div>
      </div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={leftToRightVariant}
        >
        <div className="flex flex-row text-white space-x-16 space-y-0 lg:mt-2 backdrop-blur-sm shadow-2xl p-10 rounded-3xl">
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
        </div>
      </motion.div>
    </div>
  );
}
export default KeyFeatures