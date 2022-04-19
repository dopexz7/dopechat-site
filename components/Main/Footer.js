import React from "react";
import Image from "next/image";
import * as Fa from "react-icons/fa";
import Link from "next/link";
import * as Hi from "react-icons/hi";
import * as Bs from "react-icons/bs";
import * as Md from "react-icons/md";
import { NavData } from "./NavData";
import * as Scroll from "react-scroll";
import ContactMain from "../Contact/ContactMain";
const Linkx = Scroll.Link;
export default function Footer() {
  //https://codepen.io/scanfcode/pen/MEZPNd
  return (
    <div
      className=" w-full border-t-2 flex flex-col text-accent-gray justify-center"
      id="section6"
    >
      <div className="w-full max-w-7xl p-12 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-24 m-auto">
        <div className="w-full lg:w-1/2 flex flex-col space-y-1">
          <div className="text-main-black text-xl">ABOUT</div>
          <div className="text-base font-light">
            dopeChat aims to provide the best possible Facebook Gaming
            livestream viewing experience. It features tons of new features,
            customizations (and customizations to those customizations...),
            quality of life improvements with some other tweaks. It is not
            opinionated, provides settings for every possible new feature, from
            how a live stream&apos;s chat looks, to how it behaves.
          </div>
        </div>
        <div className="flex flex-row w-full lg:w-1/2 ">
          <div className="w-1/2 flex flex-col space-y-2">
            <div className="text-main-black text-xl">FEATURES</div>
            <div className="text-sm font-normal">Custom emotes</div>
            <div className="text-sm font-normal">
              Customizable chat appearance
            </div>
            <div className="text-sm font-normal">Popout chat</div>
            <div className="text-sm font-normal">Theatre mode</div>
            <div className="text-sm font-normal">
              Mouse wheel scroll volume adjusting
            </div>
            <div className="text-sm font-normal">Chat splitting</div>
            <div className="text-sm font-normal">And more!</div>
          </div>
          <div className="w-max lg:ml-auto flex flex-col space-y-2">
            <div className="text-main-black text-xl">QUICK LINKS</div>
            {NavData.map((data, index) => (
              <Linkx
                activeClass="text-accent-purple duration-300"
                key={index}
                to={data.section ? data.section : ""}
                spy={true}
                smooth={true}
                offset={-50}
                duration={600}
                className="text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center"
              >
                {data.icon}
                {data.title}
              </Linkx>
            ))}

            <Link href="/dashboard" passHref>
              <div className="text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center">
                <Md.MdDashboard className="mr-1" /> Dashboard
              </div>
            </Link>
            <ContactMain
              iconClass={`mr-1`}
              btnClass={`text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center`}
            />
            <Link href="/legal/privacy" passHref>
              <div className="text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center">
                <Md.MdPrivacyTip className="mr-1" /> Privacy policy
              </div>
            </Link>
            <Link href="/legal/terms" passHref>
              <div className="text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center">
                <Bs.BsExclamationSquareFill className="mr-1" /> Terms of service
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-row items-center max-w-7xl p-6 border-t-2 m-auto text-base">
          <div>Copyright © 2022 All Rights Reserved by dopeChat</div>
          <div className="ml-auto flex flex-row items-center text-2xl space-x-3">
            <div className="bg-accent-gray hover:bg-blue-500 duration-300 cursor-pointer p-1.5 rounded-xl">
              <Fa.FaTwitter className=" text-white" />
            </div>
            <div className="bg-accent-gray hover:bg-blue-400 duration-300 cursor-pointer p-1.5 rounded-xl">
              <Fa.FaDiscord className=" text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
