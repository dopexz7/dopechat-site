import Head from "next/head";
import { useEffect, useState } from "react";
import Content from "../components/Main/Content";
import Header from "../components/Main/Header";
import MainNav from "../components/Main/MainNav";

export default function Home() {
  const [scrollPepe, setScrollPepe] = useState(0);
  const [visible, setVisible] = useState(true);

  function logit() {
    setScrollPepe(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener(
      "scroll",
      setVisible(scrollPepe > 750 ? false : true)
    );
    console.log(visible);
  });
  useEffect(() => {
    setScrollPepe(window.pageYOffset);
    window.addEventListener("scroll", logit);

    return () => {
      window.removeEventListener("scroll", logit);
    };
  }, [scrollPepe, visible]);

  return (
    <>
      <Head>
        <title>FB Gaming Better</title>
        <meta name="description" content="FBGamingBetter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNav />
      <div className="w-screen h-screen bg-main-purple bg-header-bg bg-blend-multiply z-0 bg-fixed">
        {visible ? <Header /> : ""}
      </div>
      <div className="h-full relative">
        <Content />
      </div>
    </>
  );
}
