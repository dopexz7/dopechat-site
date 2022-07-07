import React from "react";
import * as Fa from "react-icons/fa";
import * as Hi from "react-icons/hi";
import * as Md from "react-icons/md";

type MyType = {
  title: string;
  section: string;
  icon: React.ReactElement;
};

export const NavData: MyType[] = [
  {
    title: "About",
    section: "section1",
    icon: <Fa.FaInfo className="mr-1 p-0.5" />,
  },
  {
    title: "Features",
    section: "section2",
    icon: <Hi.HiDotsVertical className="mr-1" />,
  },
  {
    title: "Changelog",
    section: "section3",
    icon: <Md.MdOutlineChangeCircle className="mr-1" />,
  },
  {
    title: "Donate",
    section: "section4",
    icon: <Fa.FaPaypal className="mr-1" />,
  },
];
