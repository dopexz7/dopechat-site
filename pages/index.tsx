import Head from "next/head";
import React from "react";
import { FC } from "react";
import Header from "../components/Main/Header";

import MainNav from "../components/Main/MainNav";

const Home:FC = () => {
  return (
    <>
      <Head>
        <title>dopeChat</title>
        <meta name="description" content="Facebook Gaming extension dopeChat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainNav />
      <div className="w-screen h-screen bg-darker-purple lg:bg-main-purple lg:bg-header-bg lg:bg-blend-multiply z-0 bg-fixed">
        <Header />
      </div>
    </>
  );
}

export default Home;