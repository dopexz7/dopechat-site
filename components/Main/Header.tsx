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
          <Footer />
        </div>
        <div className="flex items-center opacity-50 fixed text-md bottom-32 left-0 rotate-90">
          <Cg.CgMouse className="mr-1" />
          SCROLL DOWN
        </div>
      </div>
    </>
  );
}
export default Header;

