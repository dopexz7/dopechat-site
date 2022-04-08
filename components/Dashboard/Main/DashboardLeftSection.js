import React, { useEffect, useState, useRef } from "react";
import DashboardLeftSignedIn from "./Leftside/DashboardLeftSignedIn";
import { supabase } from "../../../lib/supabaseClient";
import { CircularProgress, Fade, LinearProgress } from "@mui/material";

export default function DashboardLeftSection() {
  const [session, setSession] = useState(null);
  const [whyTwitch, setWhyTwitch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(10);
  const [opened, setOpened] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setLoading(false);
  }, []);

  async function signInWithTwitch() {
    const href = window.location.href;
    const { user, session, error } = await supabase.auth.signIn(
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
      ) : session ? (
        <DashboardLeftSignedIn session={session} />
      ) : (
        <>
          <div className="px-6 py-5 flex flex-col h-full overflow-hidden">
            <div className="p-6 w-full space-y-3 flex flex-col">
              <div
                onClick={() => signInWithTwitch()}
                className="group border-2 hover:bg-darker-purple font-bold hover:border-darker-purple border-main-purple  bg-main-purple duration-300 cursor-pointer text-white flex justify-center items-center p-3 rounded-xl w-full"
              >
                Sign in with Twitch
              </div>
              <div
                onClick={() => setWhyTwitch(!whyTwitch)}
                className="font-bold text-sm cursor-pointer text-darker-purple"
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
      <div className="flex flex-row mt-auto p-3 text-accent-gray font-bold text-md border-t-2">
        <span>© dope, 2022</span>
      </div>
    </div>
  );
}
