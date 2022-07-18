import Head from "next/head";
import DashboardNav from "../Nav/DashboardNav";
import { useAuth } from "../../../contexts/AppContext";
import { supabase } from "../../../lib/supabaseClient";
import * as Fa from 'react-icons/fa'
import { FC } from "react";
import React from "react";

const DashboardLayout:FC<LayoutTypes> = (props) => {
  const { user } = useAuth() as any;

  async function signInWithTwitch() {
    const href = window.location.href;
    await supabase.auth.signIn(
      {
        provider: "twitch",
      },
      {
        redirectTo: href,
      }
    );
  }
  
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Facebook Gaming extension dopeChat" />
      </Head>
      {user ? (
        <div className="overflow-hidden bg-header-bg bg-main-purple bg-blend-multiply h-screen w-screen flex flex-col justify-center items-center">
          <DashboardNav />
          <div className="overflow-hidden lg:space-x-20 w-full p-10 h-full flex flex-col lg:flex-row space-y-3 lg:items-center lg:justify-center">
            {props.children}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden bg-header-bg bg-main-purple bg-blend-multiply h-screen w-screen flex flex-col justify-center items-center">
          <DashboardNav />
          <div className="overflow-hidden w-full p-3 lg:w-1/3 h-full flex flex-col space-y-3 items-center justify-center">
            <div className="border-[1px] border-white border-opacity-[0.05] backdrop-blur-sm shadow-xl rounded-3xl flex flex-row items-center w-full justify-between text-right p-6">
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
              className="text-xl border-[1px] border-opacity-50 hover:bg-white border-white hover:text-main-purple shadow-2xl backdrop-blur-sm duration-300 cursor-pointer text-white flex justify-center items-center p-5 w-full rounded-3xl "
            >
              <Fa.FaTwitch className="mr-3" />
              Sign in with Twitch
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;

interface LayoutTypes {
  children: React.ReactNode;
  title: string;
}
