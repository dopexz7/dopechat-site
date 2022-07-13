import * as Fa from "react-icons/fa";
import Link from "next/link";
import { FC } from "react";

const DonateSection: FC = () => {
  return (
    <div
      className="p-6 w-full max-w-7xl lg:p-6 winScl:scale-90 winScl:mt-0 hidden lg:flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-full"
      id="section4"
    >
      <div className="flex flex-col w-full lg:w-1/4">
        <Link href="/dashboard" passHref>
          <div className="cursor-pointer bg-accent-white duration-300 border-2 hover:bg-darker-purple hover:border-darker-purple hover:text-white flex-row items-center justify-center flex  p-6 text-accent-purple font-normal rounded-3xl">
            <Fa.FaPaypal className="mr-3" />
            <div className="flex flex-col">Donate with PayPal</div>
          </div>
        </Link>
      </div>

      <div className="w-full lg:w-3/4 flex flex-col ml-10">
        <span className="hidden lg:flex text-xs lg:text-sm font-normal text-accent-gray ml-auto">
          donate
        </span>

        <span className=" hidden lg:flex text-2xl lg:text-6xl font-normal ml-auto lg:font-normal text-main-black mt-6 tracking-tight">
          Support the creator!
        </span>

        <span className="flex text-sm lg:ml-auto lg:text-right font-normal lg:font-normal text-accent-gray mt-6 mr-6 lg:mr-0 tracking-tight">
          Available only logged in to the dashboard - to give supporters
          benefits
        </span>
      </div>
    </div>
  );
};
export default DonateSection;
