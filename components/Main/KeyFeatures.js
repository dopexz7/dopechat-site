import { useState } from "react";
import * as Bs from "react-icons/bs";
import * as Go from "react-icons/go";
import * as Hi from "react-icons/hi";
import Image from "next/image";
import { Fade } from "react-reveal";
import { EmoteData } from "./EmoteData";

export default function KeyFeatures() {
  const [emotes, setEmotes] = useState(false);
  return (
    <div
      className="winScl:scale-90 winScl:mt-0 flex flex-col items-center pt-6 lg:pt-16 h-screen"
      id="section1"
    >
      <Fade top>
        <span className="text-xs lg:text-sm font-normal text-accent-gray">
          about
        </span>
      </Fade>
      <Fade top>
        <span className="text-2xl lg:text-6xl font-light text-main-black mt-6 tracking-tight">
          What are the key features?
        </span>
      </Fade>

      <div className="flex flex-col lg:flex-row lg:space-x-16 lg:mt-28 text-white lg:mr-16 lg:ml-16">
        <Fade left>
          <div className="flex flex-row lg:flex-col items-center lg:rounded-3xl lg:shadow-lg h-full lg:h-4/5 w-screen lg:w-2/5 p-3 lg:p-10 mt-10 lg:mt-28 bg-darker-purple lg:bg-accent-white bg-opacity-25">
            <Bs.BsChatRightText className="text-white lg:text-main-purple drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />

            <div className="lg:mt-14 text-base lg:text-lg text-accent-white lg:text-main-black font-medium w-2/4 lg:w-full text-center border-l-2 border-r-2  lg:border-0">
              Chat look
            </div>

            <div className="lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-normal w-3/4 lg:w-full p-3 text-justify lg:text-left">
              Freedom to customize the chat however you want: change colors,
              font, text size, hide elements and more! All within the
              easy-to-use settings.
            </div>
          </div>
        </Fade>
        <Fade bottom>
          <div
            onMouseEnter={() => {
              setEmotes(true);
            }}
            onMouseLeave={() => {
              setEmotes(false);
            }}
            className="relative flex flex-row lg:flex-col items-center lg:rounded-3xl lg:min-h-[450px] h-full lg:h-4/5 w-screen lg:w-2/5 p-3 lg:p-10 mt-0.5 lg:mt-0 bg-darker-purple lg:bg-accent-white bg-opacity-25 box-xl"
          >
            <Hi.HiOutlineEmojiHappy className="text-white lg:text-main-purple drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />

            <div className="flex flex-row items-center justify-center lg:mt-6 text-base lg:text-lg text-accent-white lg:text-main-black font-medium w-2/4 lg:w-full text-center border-l-2 border-r-2  lg:border-0">
              Custom emotes
            </div>

            {emotes ? (
              <div
                className={`hidden lg:block lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-bold w-3/4 lg:w-full p-1 text-justify lg:text-left`}
              >
                {EmoteData.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      src={item.path}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="anim-bt inline p-0.5"
                    />
                  );
                })}
              </div>
            ) : (
              <div className="anim-bt hidden lg:block lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-normal w-3/4 lg:w-full p-3 text-justify lg:text-left">
                {EmoteData.map((item, index) => {
                  return (
                    <span key={index}>
                      {item.title}
                      {index < EmoteData.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="anim-bt lg:hidden lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-normal w-3/4 lg:w-full p-3 text-justify lg:text-left">
              {EmoteData.map((item, index) => {
                return <span key={index}>{item.title}, </span>;
              })}
              and more!
            </div>

            {/*
              <div className="lg:mt-6 text-xs lg:text-sm text-accent-gray font-bold w-3/4 lg:w-full p-3 text-justify lg:text-left">
                The extension was designed to support any custom emotes, from
                your favorite KEKWs, to your favorite streamer's emotes!
              </div> */}
            <span className="absolute bottom-6 anim-bt text-main-white lg:text-accent-gray font-medium lg:block hidden">
              and more!
            </span>
          </div>
        </Fade>
        <Fade right>
          <div className="flex flex-row lg:flex-col items-center lg:rounded-3xl lg:shadow-lg h-full lg:h-4/5 w-screen lg:w-2/5 p-3 lg:p-10 mt-0.5 lg:mt-28 bg-darker-purple lg:bg-accent-white bg-opacity-25 anim-bt1">
            <Go.GoSettings className="text-white lg:text-main-purple drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />
            <div className="lg:mt-14 text-base lg:text-lg text-accent-white lg:text-main-black font-medium w-2/4 lg:w-full text-center border-l-2 border-r-2 lg:border-0">
              Quality of life
            </div>
            <div className="lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-normal w-3/4 lg:w-full p-3 text-justify lg:text-left">
              The extension features other quality of life (toggleable) tweaks,
              including mouse wheel scroll volume control, chat splitting and
              more!
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
