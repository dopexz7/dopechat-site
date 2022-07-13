import { FC } from "react";
import { featuresList } from "./featuresData";
const KeyFeatures: FC = () => {
  
  return (
    <div
      className="winScl:scale-90 w-full max-w-7xl winScl:mt-0 flex flex-col items-center pt-6 lg:pt-16 lg:h-full"
      id="section1"
    >
      <div className="text-xs lg:text-sm font-normal text-accent-gray">
        about
      </div>
      <div className="text-2xl lg:text-6xl font-light text-main-black m-6 tracking-tight">
        What are the key features?
      </div>

      <div className="flex flex-col text-white lg:mr-16 lg:ml-16 lg:space-x-16 lg:mt-2 lg:flex-row">
        {featuresList.map((data: any, index: any) => (
          <div
            className="flex flex-col m-auto rounded-3xl lg:flex-col items-center lg:rounded-3xl lg:shadow-lg h-full lg:h-4/5 w-11/12 lg:w-2/5 p-3 lg:p-10 lg:mt-28 bg-darker-purple lg:bg-accent-white bg-opacity-25"
            key={index}
          >
            {data.icon}
            <div className="lg:mt-14 text-base lg:text-lg text-accent-white lg:text-main-black font-medium w-2/4 lg:w-full text-center lg:border-0">
              {data.title}
            </div>
            <div className="lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-normal w-4/5 lg:w-full p-3 text-justify lg:text-left">
              {data.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default KeyFeatures