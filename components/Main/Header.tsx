import React, { FC } from "react";
import KeyFeatures from "./KeyFeatures";
import LookAt from "./LookAt";
import Changelog from "./Changelog";
import Footer from './Footer'
import MainHeader from './MainHeader';
import * as Cg from 'react-icons/cg'

const Header:FC = () => {
  return (
    <>
      <div className="lg:fixed lg:left-0 lg:w-[100vh] lg:h-[100vw] lg:overflow-scroll lg:overflow-x-hidden lg:-rotate-90 origin-center-50vh">
        <div className="lg:w-[50vh] lg:h-[70vw] lg:rotate-90">
          <MainHeader />
        </div>
        <div className="lg:w-[50vh] lg:h-[70vw] lg:rotate-90">
          <KeyFeatures />
        </div>
        <div className="lg:w-[50vh] lg:h-[70vw] lg:rotate-90">
          <LookAt />
        </div>
        <div className="lg:w-[50vh] lg:h-[70vw] lg:rotate-90">
          <Changelog />
        </div>
        <div className="lg:w-[50vh] lg:h-[70vw] lg:rotate-90">
          <Footer />
        </div>
        <div className="hidden lg:flex items-center opacity-50 fixed text-md bottom-32 left-0 rotate-90">
          <Cg.CgMouse className="mr-1" />
          SCROLL DOWN
        </div>
      </div>
    </>
  );
}
export default Header;

