import Head from "next/head";
import DashboardNav from "../Nav/DashboardNav";
import DashboardLeftSection from "./DashboardLeftSection";

import Link from "next/link";

const DashboardLayout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="overflow-hidden h-screen w-screen flex flex-col justify-center items-center bg-main-purple bg-header-bg bg-blend-multiply">
        <DashboardNav />

        <div className="overflow-hidden w-full h-full flex flex-row bg-accent-white">
          <DashboardLeftSection session={props.session} />

          {props.children}
        </div>
        <div className="w-full bg-accent-white border-t-2">
          <div className="w-full flex flex-row text-black items-center max-w-7xl p-1 m-auto text-xs">
            <div>Copyright © 2022 All Rights Reserved by dopeChat</div>
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
      </div>
    </>
  );
};

export default DashboardLayout;
