import React, { FC } from "react";
import KeyFeatures from "./KeyFeatures";
import LookAt from "./LookAt";
import Changelog from "./Changelog";
import DonateSection from "./DonateSection";
import GetStarted from "./GetStarted";
import MainHeader from './MainHeader';

const Header:FC = () => {

  return (
    <>
      <div className="fixed left-0 w-[100vh] h-[100vw] overflow-scroll overflow-x-hidden -rotate-90 origin-center-50vh">
        <div className="w-[50vh] h-[70vw] rotate-90">
          <MainHeader />
        </div>

        <div className="w-[50vh] h-[70vw] rotate-90">
          <KeyFeatures />
        </div>

        <div className="w-[50vh] h-[70vw] rotate-90">
          <LookAt />
        </div>

        <div className="w-[50vh] h-[70vw] rotate-90">
          <Changelog />
        </div>

        <div className="w-[50vh] h-[70vw] rotate-90">
          <DonateSection />
        </div>
        <div className="w-[50vh] h-[70vw] rotate-90">
          <GetStarted />
        </div>
      </div>
      {/* <div className="flex overflow-y-scroll overflow-x-hidden w-screen h-screen" id="section0">
        <div className="shrink-0 w-screen h-screen">
          <MainHeader />
        </div>
        <div className="shrink-0 w-screen h-screen">
          <KeyFeatures />
        </div>
        <div className="shrink-0 w-screen h-screen">
          <LookAt />
        </div>
        <div className="shrink-0 w-screen h-screen">
          <Changelog />
        </div>
        <div className="shrink-0 w-screen h-screen">
          <DonateSection />
        </div>
        <div className="shrink-0 w-screen h-screen">
          <GetStarted />
        </div>
      </div> */}
    </>
  );
}
export default Header;

