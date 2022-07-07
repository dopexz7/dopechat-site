import Link from "next/link";
import { FC } from "react";

const DashboardFooter: FC = () => {
  return (
    <div className="w-full border-t-2">
      <div className="w-full flex flex-row text-black items-center max-w-7xl p-1 m-auto text-xs">
        <div>
          Made by dope, Copyright © 2022, All Rights Reserved by dopeChat
        </div>
        <div className="ml-auto flex flex-row items-center text-xs space-x-3">
          <Link href="/legal/privacy" passHref>
            <span className="hover:text-main-purple duration-300 cursor-pointer">
              Privacy policy
            </span>
          </Link>
          <Link href="/legal/terms" passHref>
            <span className="hover:text-main-purple duration-300 cursor-pointer">
              Terms
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardFooter;