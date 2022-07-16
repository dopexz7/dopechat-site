import React, { FC } from "react";
import Link from "next/link";
import * as Bs from "react-icons/bs";
import * as Md from "react-icons/md";
import ContactMain from "../Contact/ContactMain";

const Footer:FC = () => {
  return (
    <div
      className="w-screen max-w-7xl flex flex-col h-screen justify-center "
      id="section6"
    >
      <div className="w-full max-w-7xl space-y-3 p-12 flex flex-col m-auto">
        <div className="w-full flex flex-col space-y-1">
          <div className="text-white text-base lg:text-xl">ABOUT</div>
          <div className="text-sm lg:text-base font-light">
            <span className="text-main-purple">dopeChat</span> aims to provide
            the best possible Facebook Gaming livestream viewing experience. It
            features tons of new features, customizations (and customizations to
            those customizations...), quality of life improvements with some
            other tweaks. It is not opinionated, provides settings for every
            possible new feature, from how a live stream&apos;s chat looks, to
            how it behaves.
          </div>
        </div>
        <div className="flex flex-row w-full lg:w-1/2 ">
          <div className="w-1/2 flex flex-col space-y-2">
            <div className="text-white text-base lg:text-xl">FEATURES</div>
            <div className="text-xs lg:text-sm font-normal">Custom emotes</div>
            <div className="text-xs lg:text-sm font-normal">
              Customizable chat appearance
            </div>
            <div className="text-xs lg:text-sm font-normal">Popout chat</div>
            <div className="text-xs lg:text-sm font-normal">Theatre mode</div>
            <div className="text-xs lg:text-sm font-normal">
              Mouse wheel scroll volume adjusting
            </div>
            <div className="text-xs lg:text-sm font-normal">Chat splitting</div>
            <div className="text-xs lg:text-sm font-normal">And more!</div>
          </div>
          <div className="w-max lg:ml-auto flex flex-col space-y-2">
            <div className="text-white text-base lg:text-xl">
              QUICK LINKS
            </div>
            <Link href="/dashboard" passHref>
              <div className="text-xs lg:text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center">
                <Md.MdDashboard className="mr-1" /> Dashboard
              </div>
            </Link>
            <ContactMain
              iconClass={`mr-1`}
              btnClass={`text-xs lg:text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center`}
              text={undefined}
            />
            <Link href="/legal/privacy" passHref>
              <div className="text-xs lg:text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center">
                <Md.MdPrivacyTip className="mr-1" /> Privacy policy
              </div>
            </Link>
            <Link href="/legal/terms" passHref>
              <div className="text-xs lg:text-sm cursor-pointer hover:text-main-purple duration-300 font-medium flex flex-row items-center">
                <Bs.BsExclamationSquareFill className="mr-1" /> Terms of service
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-row items-center max-w-7xl p-6 m-auto text-sm lg:text-base">
          <div>
            Made by <span className="text-main-purple">dope</span>, Copyright ©
            2022, All Rights Reserved by
            <span className="text-main-purple"> dopeChat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer