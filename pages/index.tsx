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
      <Header />
    </>
  );
}

export default Home;