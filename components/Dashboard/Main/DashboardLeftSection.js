import React, { useEffect, useState } from "react";
import DashboardLeftSignedIn from "./Leftside/DashboardLeftSignedIn";
import { supabase } from "../../../lib/supabaseClient";
import { CircularProgress } from "@mui/material";
import * as Fa from "react-icons/fa";
import { useAuth } from "../../../contexts/AppContext";
export default function DashboardLeftSection() {
  const [whyTwitch, setWhyTwitch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    setLoading(false);
  }, []);

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
    <div className="text-black border-r-2 h-full max-w-full w-1/5 flex flex-col">
      {loading ? (
        <>
          <div className="px-6 py-5 flex flex-col h-full overflow-hidden">
            <div className="flex flex-row items-center px-6 py-2 anim-rl">
              <CircularProgress className="!w-5 !h-5 !text-main-purple" />
            </div>
          </div>
        </>
      ) : user ? (
        <DashboardLeftSignedIn />
      ) : (
        <>
          <div className="px-6 py-5 flex flex-col h-full overflow-hidden">
            <div className="p-6 w-full space-y-3 flex flex-col">
              <div
                onClick={() => signInWithTwitch()}
                className=" group border-2 hover:bg-darker-purple font-normal hover:border-darker-purple border-main-purple  bg-main-purple duration-300 cursor-pointer text-white flex justify-center items-center p-3 rounded-xl w-full"
              >
                <Fa.FaTwitch className="mr-3" />
                Sign in with Twitch
              </div>
              <div
                onClick={() => setWhyTwitch(!whyTwitch)}
                className="font-normal text-sm cursor-pointer text-darker-purple"
              >
                Facebook extension, why Twitch login?
              </div>
              {whyTwitch ? (
                <p className="text-sm">
                  Anyone can create a Facebook account with any username,
                  therefore to ensure the highest possible security, we decided
                  to make Twitch-only logins.
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
