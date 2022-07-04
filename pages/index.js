import Head from "next/head";
import Changelog from "../components/Main/Changelog";
import DonateSection from "../components/Main/DonateSection";
import Footer from "../components/Main/Footer";
import GetStarted from "../components/Main/GetStarted";
import Header from "../components/Main/Header";
import KeyFeatures from "../components/Main/KeyFeatures";
import LookAt from "../components/Main/LookAt";
import MainNav from "../components/Main/MainNav";

export default function Home() {
  return (
    <>
      <Head>
        <title>dopeChat</title>
        <meta name="description" content="Facebook Gaming extension dopeChat" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <MainNav />
      <div className="w-screen h-screen bg-main-purple bg-header-bg bg-blend-multiply z-0 bg-fixed">
        <Header />
      </div>
      <div className="h-full relative">
        <div className="w-screen bg-accent-white ">
          <div className="w-screen flex flex-col items-center ml-auto mr-auto">
            <KeyFeatures />
            <LookAt />
            <Changelog />
            <DonateSection />
            <GetStarted />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
