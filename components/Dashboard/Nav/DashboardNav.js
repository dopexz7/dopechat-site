import React from "react";
import Link from "next/link";
import * as Fa from "react-icons/fa";
//import Links from "../../Links";
import ContactMain from "../../Contact/ContactMain";

export default function DashboardNav() {
  return (
    <div className={`duration-300 z-50 w-screen`}>
      <div
        className={`max-w-7xl w-screen mr-auto ml-auto flex flex-row justify-center items-center p-6 duration-300 space-x-8 text-main-white text-sm font-semibold`}
      >
        <Link href="/" passHref>
          <div className="font-normal cursor-pointer whitespace-nowrap text-clip w-max mr-auto text-white text-xl">
            dopeChat
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="flex flex-row items-center  hover:text-white duration-300 cursor-pointer">
            <Fa.FaHome className="mr-1" /> Home
          </div>
        </Link>

        <a
          href="https://www.paypal.com/donate/?hosted_button_id=BBESL24DMEABC"
          target="_blank"
          rel="noreferrer"
          className={` hover:text-white duration-300 items-center cursor-pointer flex flex-row`}
        >
          <Fa.FaPaypal className="mr-1" />
          Donate
        </a>
        <ContactMain
          btnClass={`hover:text-white duration-300 hidden lg:flex cursor-pointer lg:flex-row lg:items-center`}
          iconClass={`mr-3`}
        />

        {/* <Links /> */}
      </div>
    </div>
  );
}
