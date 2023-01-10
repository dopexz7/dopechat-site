import Head from "next/head";
import { supabase } from "../../../lib/supabaseClient";
import * as Fa from 'react-icons/fa'
import { FC } from "react";
import React from "react";
import { useUser } from '@supabase/auth-helpers-react'
import { MainNav } from "../../mainpage/nav/navigation";

const DashboardLayout:FC<LayoutTypes> = (props) => {
  const user = useUser();
  async function signInWithTwitch() {
    const href = window.location.href;
    await supabase.auth.signInWithOAuth(
      {
        provider: "twitch",
        options: {
          redirectTo: href
        }
      },
    );
  }
  return (
    <>
    <Head>
        <title>{props.title}</title>
        <meta name="description" content="Facebook Gaming extension dopeChat" />
      </Head>
    <div className="overflow-hidden bg-header-bg bg-main-purple bg-blend-multiply h-screen w-screen flex flex-col justify-center items-center">
      <MainNav dashboard={true} />
      {!user ? 
      <div className="p-3 w-1/3 h-full flex flex-col space-y-3 items-center justify-center">
            <div className="flex flex-row items-center w-full justify-between text-right p-6">
              <p className="text-4xl font-semibold text-white m-3">
                Sign in to
              </p>
              <div className="opacity-60 pl-6">
                <p>See all available emotes</p>
                <p>Keep up to date with the global emote set</p>
                <p>Upload and see your own emotes</p>
                <p>Manage emote sets</p>
                <p>Request emote sets (streamers)</p>
                <p>Support the extension</p>
              </div>
            </div>
            <div
              onClick={() => signInWithTwitch()}
              className="w-full flex items-center justify-center relative before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl duration-300 hover:bg-white px-5 text-black cursor-pointer py-4 text-lg font-bold bg-ma-pink rounded-3xl"
            >
              <Fa.FaTwitch className="mr-3" />
              Sign in with Twitch
            </div>
          </div>
      :
      <div
      className={`overflow-hidden w-screen h-screen flex ${
        props.layout === "sets"
          ? "flex-col p-3"
          : "flex-row space-x-6 py-[60px] px-[60px]"
      } items-center `}
    >
      {props.children}
    </div>
    }
    </div>
    </>
  )
};

export default DashboardLayout;

interface LayoutTypes {
  children: React.ReactNode;
  title: string;
  layout: string;
}
