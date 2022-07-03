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
import { useAuth } from "../../../../contexts/AppContext";
import { useState } from "react";
import EditingSet from "./EditingSet";


const DashboardLeftSignedIn = (props) => {
  const router = useRouter();
  const isDonor = useIsDonor();
  const { user } = useAuth();
  const isMod = useIsMod();
  const hasEdits = useHasEdits(user?.user_metadata.name);
  const availEdits = useHasEdits();
  const [editingSet, setEditingSet] = useState("");
  const passProps = (d) => {
    setEditingSet(d);
    props.onSuccess(d);
  };
  return (
    <>
      <div
        className={`p-6 flex flex-col h-full  ${
          router.route.includes("profile") ? "" : "anim-fade"
        } `}
      >
        <div className="flex flex-row items-center px-6 py-2 ">
          <img
            src={user?.user_metadata.avatar_url}
            alt={user?.user_metadata.name}
            className="rounded-3xl w-10 border-[1px] "
          />
          <div className="ml-2 font-normal text-white rounded-2xl text-md overflow-hidden text-ellipsis whitespace-nowrap">
            {user?.user_metadata.name}
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
                  className="p-2 text-sm hover:bg-white duration-300 hover:text-main-purple cursor-pointer border-[1px] border-white opacity-25 hover:opacity-100 flex text-white items-center justify-center rounded-3xl mr-1"
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
                  className="p-2 text-sm hover:bg-white opacity-25 hover:opacity-100  duration-300 hover:text-main-purple cursor-pointer border-[1px] flex text-white items-center justify-center rounded-3xl mr-1"
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
                className="p-2 text-sm hover:bg-white opacity-25 hover:opacity-100  duration-300 hover:text-main-purple cursor-pointer border-[1px] flex text-white items-center justify-center rounded-3xl mr-1"
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
            <div className="group hover:bg-white border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full">
              <span className="opacity-75 font-normal group-hover:opacity-100">
                {router.pathname.includes("profile")
                  ? "Dashboard"
                  : "Your profile"}
              </span>
            </div>
          </Link>
          <LeftSideModal />
          <DonationComponent
            btnClass={`hover:bg-white text-opacity-75 border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full`}
          />
          <div className="flex flex-row">
            <div className="flex flex-row items-center text-sm px-3 text-white">
              {isDonor ? (
                <>
                  <Bs.BsFillPatchCheckFill className="mr-2 text-main-purple text-xl" />
                </>
              ) : (
                <>
                  <Bs.BsFillPatchCheckFill className="mr-2 text-accent-gray text-xl" />
                </>
              )}
            </div>
            <div className="text-sm px-3 text-white opacity-75">
              You have access to {hasEdits ? hasEdits.length : "0"} emote sets.
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1 justify-center">
            {availEdits &&
              availEdits
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((data, index) => (
                  <EditingSet
                    key={index}
                    data={data}
                    passProps={passProps}
                    editingSet={editingSet}
                    profile={props.profile}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardLeftSignedIn;
