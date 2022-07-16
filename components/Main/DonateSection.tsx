import * as Fa from "react-icons/fa";
import Link from "next/link";
import React, { FC } from "react";

const DonateSection: FC = () => {
  return (
    <div className="w-screen max-w-7xl flex flex-row h-screen items-center justify-center pr-10" id="section4">
      <div className="flex flex-col ">
        <Link href="/dashboard" passHref>
          <div className="cursor-pointer border-2 border-white border-opacity-5 duration-300 flex-row items-center justify-center flex p-6 font-normal rounded-3xl hover:bg-white hover:text-main-purple">
            <Fa.FaPaypal className="mr-3" />
            <div className="flex flex-col">Donate with PayPal</div>
          </div>
        </Link>
      </div>

      <div className="w-full lg:w-3/4 flex flex-col ml-10">
        <span className="flex text-xs lg:text-sm font-normal ml-auto">
          donate
        </span>

        <span className="flex text-2xl lg:text-6xl font-normal ml-auto lg:font-normal text-white mt-6 tracking-tight">
          Support the creator!
        </span>

        <span className="flex text-sm lg:ml-auto lg:text-right font-normal lg:font-normal  mt-6 mr-6 lg:mr-0 tracking-tight">
          Available only logged in to the dashboard - to give supporters
          benefits
        </span>
      </div>
    </div>
  );
};
export default DonateSection;
