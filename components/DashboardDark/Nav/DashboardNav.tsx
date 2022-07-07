import React, { FC } from "react";
import Link from "next/link";
import * as Fa from "react-icons/fa";
import ContactMain from "../../Contact/ContactMain";
import DonationComponent from "../../Donation/DonationComponent";
import { useAuth } from "../../../contexts/AppContext";

const DashboardNav:FC = () => {
  const { user } = useAuth() as any;
  return (
    <div className={`duration-300 z-50 w-screen bg-darker-purple`}>
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

        <ContactMain
          btnClass={`hover:text-white duration-300 hidden lg:flex cursor-pointer lg:flex-row lg:items-center`}
          iconClass={`mr-3`} text={undefined}        />

        {user ? (
          <DonationComponent
            btnClass={`hover:text-white duration-300 items-center cursor-pointer flex flex-row`}
            iconEnabled={true}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default DashboardNav;