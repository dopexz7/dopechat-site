import * as Md from "react-icons/md";
import { Tooltip } from "@mantine/core";
import * as Bs from "react-icons/bs";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import LeftSideModal from "./LeftSideModal";
import DonationComponent from "../../../Donation/DonationComponent";
import { useAuth } from "../../../../contexts/AppContext";
import { useState } from "react";
import EditingSet from "./EditingSet";
import Image from "next/image";
import { FC } from "react";
import React from "react";

const DashboardLeftSignedIn: FC<Typies> = (props): React.ReactElement => {
  const router: NextRouter = useRouter();
  const { user, isMod, isDonor, availEdits } = useAuth() as any;
  const [editingSet, setEditingSet] = useState<string>("");

  const passProps = (d: string): void => {
    setEditingSet(d);
    props.onSuccess(d);
  };



  const LinkComponent = ({href, icon} : {href: any, icon: any}) => {
    return (
      <Link href={href} passHref>
        <div className="p-2 text-sm hover:bg-white opacity-50 hover:opacity-100  duration-300 hover:text-main-purple cursor-pointer border-[1px] flex text-white items-center justify-center rounded-3xl mr-1">
          {icon}
        </div>
      </Link>
    );
  }
  return (
    <div className="border-[1px] border-white border-opacity-5 shadow-2xl rounded-3xl h-[55%] backdrop-blur-sm max-w-full w-full lg:w-1/5 flex flex-col">
      <div className="p-6 flex flex-col h-full">
        <div className="flex flex-row items-center px-6 py-2 ">
          <Image
            src={user?.user_metadata.avatar_url}
            alt={user?.user_metadata.name}
            width={40}
            height={40}
            className="rounded-3xl border-[1px] "
          />
          <div className="ml-2 font-normal text-white text-md overflow-hidden text-ellipsis whitespace-nowrap">
            {user?.user_metadata.name}
          </div>
          <div className="flex flex-row items-center px-3 text-sm lg:text-base text-white">
            {isDonor ? (
              <>
                <Bs.BsFillPatchCheckFill className="mr-2 text-main-purple" />
              </>
            ) : (
              <>
                <Bs.BsFillPatchCheckFill className="mr-2 text-accent-gray" />
              </>
            )}
          </div>
          <div className="ml-auto flex flex-row items-center">
            {isMod ? (
              <Tooltip
                transition="pop"
                transitionDuration={300}
                label="Mod dashboard"
                withArrow
              >
                <LinkComponent
                  href={`/dashboard/admin`}
                  icon={<Md.MdOutlineAdminPanelSettings />}
                />
              </Tooltip>
            ) : (
              ""
            )}

            <Tooltip
              label="Logout"
              withArrow
              transition="pop"
              transitionDuration={300}
            >
              <div
                title="Logout"
                onClick={() => supabase.auth.signOut()}
                className="p-2 text-sm hover:bg-white opacity-50 hover:opacity-100  duration-300 hover:text-main-purple cursor-pointer border-[1px] flex text-white items-center justify-center rounded-3xl mr-1"
              >
                <Md.MdLogout />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="lg:p-6 w-full space-y-3 flex flex-col">
          <div className="flex w-full text-xs text-center lg:text-left lg:text-base flex-row space-x-2 lg:flex-col lg:space-x-0 lg:space-y-3">
            {router.pathname.includes("admin") ? (
              <Link href="/dashboard" passHref>
                <div className="group hover:bg-white border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full">
                  <span className="opacity-75 font-normal group-hover:opacity-100">
                    Dashboard
                  </span>
                </div>
              </Link>
            ) : (
              <div
                onClick={() => props.onRouteChange()}
                className="group hover:bg-white border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"
              >
                <span className="opacity-75 font-normal group-hover:opacity-100">
                  {props.route ? "Dashboard" : "Your profile"}
                </span>
              </div>
            )}

            <LeftSideModal />
            <DonationComponent
              iconEnabled={false}
              btnClass={`hover:bg-white text-opacity-75 border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full`}
            />
          </div>
          <div className="flex flex-row">
            {/* <div className="text-xs lg:text-sm px-3 text-white opacity-75">
              You have access to{" "}
              {Object.keys(availEdits) ? Object.keys(availEdits).length : "0"}{" "}
              emote sets.
            </div> */}
          </div>
          <div className="grid grid-cols-5 gap-1 justify-center">
            {availEdits &&
              Object.keys(availEdits)
                .sort((a, b) => a.localeCompare(b))
                .map((data: any, index: number) => (
                  <EditingSet
                    key={index}
                    data={data}
                    image={availEdits[data]}
                    passProps={passProps}
                    editingSet={editingSet}
                    profile={props.profile}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftSignedIn;

interface Typies {
  profile?: boolean;
  onSuccess: (d: string) => typeof d;
  onRouteChange: () => void;
  route: boolean;
}
