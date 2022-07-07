import "../styles/globals.css";
import React from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
export default function App({ Component, pageProps: { ...pageProps } }:AppProps) {
  const router = useRouter();
  React.useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
