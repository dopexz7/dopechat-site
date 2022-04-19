import React, { useEffect, useState } from "react";

import * as Md from "react-icons/md";
import * as Io from "react-icons/io5";
import { Tooltip } from "@mantine/core";
import * as Bs from "react-icons/bs";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import LeftSideModal from "./LeftSideModal";
import useIsMod from "../../../../funcs/useIsMod";
import useIsDonor from "../../../../funcs/useIsDonor";
import useHasEdits from "../../../../funcs/useHasEdits";
import DonationComponent from "../../../Donation/DonationComponent";

const DashboardLeftSignedIn = ({ session }) => {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const isMod = useIsMod(username);
  const isDonor = useIsDonor(username);
  const hasEdits = useHasEdits(username);
  useEffect(() => {
    let subed = true;
    if (subed) {
      setUsername(session?.user?.user_metadata.name);
      setAvatarUrl(session?.user?.user_metadata.avatar_url);
    }

    return () => {
      subed = false;
    };
  }, [session]);

  return (
    <>
      <div
        className={`px-6 py-5 flex flex-col h-full overflow-hidden ${
          router.route.includes("profile") ? "" : "anim-fade"
        } `}
      >
        <div className="flex flex-row items-center px-6 py-2 ">
          <img
            src={avatarUrl}
            alt={username}
            className="rounded-3xl w-10 border-2 shadow-xl"
          />
          <div className="ml-2 font-normal text-main-black rounded-2xl text-md overflow-hidden text-ellipsis whitespace-nowrap">
            {session.user.user_metadata.name}
          </div>

          <div className="ml-auto flex flex-row items-center">
            {isMod ? (
              <Tooltip
                transition="pop"
                transitionDuration={300}
                transitionTimingFunction="ease"
                label="Mod dashboard"
                withArrow
              >
                <a
                  onClick={() => router.push("/dashboard/admin")}
                  className="p-2 hover:border-main-purple text-sm hover:bg-main-purple duration-300 hover:text-white cursor-pointer border-2 flex text-darker-purple items-center justify-center rounded-3xl mr-1"
                >
                  <Md.MdOutlineAdminPanelSettings />
                </a>
              </Tooltip>
            ) : (
              ""
            )}

            {router.pathname.includes("profile") ||
            router.pathname.includes("admin") ||
            router.pathname.includes("set") ? (
              <Tooltip
                transition="pop"
                transitionDuration={300}
                transitionTimingFunction="ease"
                label="Return back to dashboard"
                withArrow
              >
                <a
                  onClick={() => router.push("/dashboard")}
                  className="p-2 hover:border-main-purple text-sm hover:bg-main-purple duration-300 hover:text-white cursor-pointer border-2 flex text-darker-purple items-center justify-center rounded-3xl mr-1"
                >
                  <Io.IoReturnUpBack />
                </a>
              </Tooltip>
            ) : (
              ""
            )}
            <Tooltip
              label="Logout"
              withArrow
              transition="pop"
              transitionDuration={300}
              transitionTimingFunction="ease"
            >
              <div
                title="Logout"
                onClick={() => supabase.auth.signOut()}
                className="p-2 hover:border-main-purple text-sm hover:bg-main-purple duration-300 hover:text-white cursor-pointer border-2 flex text-darker-purple items-center justify-center rounded-3xl mr-3"
              >
                <Md.MdLogout />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="p-6 w-full space-y-3 flex flex-col">
          <Link
            href={
              router.pathname.includes("profile")
                ? "/dashboard"
                : "/dashboard/profile"
            }
            passHref
          >
            <div className="hover:border-main-purple hover:bg-main-purple hover:text-white duration-300 border-2 font-normal text-main-black cursor-pointer flex justify-center items-center p-3 rounded-xl w-full">
              {router.pathname.includes("profile")
                ? "Dashboard"
                : "Your profile"}
            </div>
          </Link>
          <LeftSideModal username={username} />
          <DonationComponent username={username} />
          <div className="flex flex-row items-center text-sm px-3 text-accent-gray font-medium">
            {isDonor ? (
              <>
                <Bs.BsFillPatchCheckFill className="mr-2 text-main-purple text-xl" />
                Thank you for your support!
              </>
            ) : (
              <>
                <Bs.BsFillPatchCheckFill className="mr-2 text-accent-gray text-xl" />
                Hasn&apos;t currently donated.
              </>
            )}
          </div>
          <div className="flex flex-row items-center text-sm px-3 text-accent-gray font-medium">
            You have access to {hasEdits ? hasEdits.length : "0"} emote sets.
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardLeftSignedIn;
