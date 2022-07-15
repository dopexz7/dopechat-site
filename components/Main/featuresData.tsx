import React from "react";
import * as Bs from "react-icons/bs";
import * as Go from "react-icons/go";
import * as Hi from "react-icons/hi";

export const featuresList: MyType[] = [
  {
    title: "Chat look",
    description:
      "Freedom to customize the chat however you want: change colors, font, text size, hide elements and more! All within the easy-to-use settings.",
    icon: (
      <Bs.BsChatRightText className="text-white  drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />
    ),
  },
  {
    title: "Custom emotes",
    description:
      "Streamers have the ability to create their own custom emote sets for their followers. Extension also features a global emote set which is updated regularly.",
    icon: (
      <Hi.HiOutlineEmojiHappy className="text-white  drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />
    ),
  },
  {
    title: "Quality of life",
    description:
      "The extension features other quality of life (toggleable) tweaks, including mouse wheel scroll volume control, chat splitting and more!",
    icon: (
      <Go.GoSettings className="text-white  drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />
    ),
  },
];

type MyType = {
  title: string;
  description: string;
  icon: React.ReactElement;
};
