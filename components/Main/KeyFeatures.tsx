import { FC } from "react";
import { featuresList } from "./featuresData";

const KeyFeatures: FC = () => {
  return (
    <div
      className="w-screen max-w-7xl p-3 lg:p-0 flex flex-col lg:flex-row lg:space-x-10 items-center pt-0 h-full lg:h-screen"
      id="section1"
    >
      <div className="flex space-x-2 lg:space-x-0 lg:flex-col text-2xl lg:text-5xl font-light max-w-xl m-6">
        <div>Key</div>
        <div>features</div>
      </div>
      <div className="flex flex-col lg:flex-row text-white lg:space-x-16 space-y-0 lg:mt-2 border-[1px] border-white border-opacity-5 shadow-2xl bg-black bg-opacity-10 p-10 rounded-3xl">
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
    </div>
  );
}
export default KeyFeatures