import Head from "next/head";
import DashboardNav from "../Nav/DashboardNav";
import DashboardFooter from "./DashboardFooter";
import { useAuth } from "../../../contexts/AppContext";
import { supabase } from "../../../lib/supabaseClient";
import * as Fa from 'react-icons/fa'
import DashboardLeftSignedIn from "./Leftside/DashboardLeftSignedIn";

const DashboardLayout = (props) => {
  const { user } = useAuth();
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
      </Head>
      {user ? (
        <div className="overflow-hidden h-screen w-screen flex flex-col justify-center items-center bg-accent-white">
          <DashboardNav />
          <div className="overflow-hidden w-full h-full flex flex-row bg-accent-white">
            <div className="text-black border-r-2 h-full max-w-full w-1/5 flex flex-col">
              <DashboardLeftSignedIn />
            </div>

            {props.children}
          </div>
          <DashboardFooter />
        </div>
      ) : (
        <div className="overflow-hidden bg-header-bg bg-main-purple bg-blend-multiply h-screen w-screen flex flex-col justify-center items-center">
          <DashboardNav />
          <div className="overflow-hidden  w-1/3 h-full flex flex-col space-y-3 items-center justify-center">
            <div className="border-[1px] border-white border-opacity-[0.05] backdrop-blur-sm shadow-xl rounded-3xl flex flex-row items-center w-full justify-between text-right p-6">
              <p className="text-4xl font-semibold text-white m-6">
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
