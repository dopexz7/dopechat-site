import Head from "next/head";
import DashboardNav from "../Nav/DashboardNav";
import DashboardLeftSection from "./DashboardLeftSection";

import Link from "next/link";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="overflow-hidden h-screen w-screen flex flex-col justify-center items-center bg-accent-white ">
        {/* bg-header-bg bg-blend-multiply */}
        <DashboardNav />
        <div className="overflow-hidden w-full h-full flex flex-row bg-accent-white">
          <DashboardLeftSection />

          {props.children}
        </div>
        <DashboardFooter />
      </div>
    </>
  );
};

export default DashboardLayout;
