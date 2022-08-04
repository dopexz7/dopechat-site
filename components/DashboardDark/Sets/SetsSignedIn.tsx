import * as Md from "react-icons/md";
import { Tooltip } from "@mantine/core";
import * as Bs from "react-icons/bs";
import { supabase } from "../../../lib/supabaseClient"
import Link from "next/link";
import { useAuth } from "../../../contexts/AppContext";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import React from "react";
import { getIsMod } from "funcs/useIsMod";
import { getIsDonor } from "funcs/useIsDonor";

const SetsSignedIn: FC = (): React.ReactElement => {
  const { user } = useAuth() as any;
  const [isMod, setIsMod] = useState(false);
  const [isDonor, setIsDonor] = useState(false);
  useEffect(() => {
    getIsMod(user?.user_metadata.name).then((res: any) => {
      setIsMod(res);
    });
    getIsDonor(user?.user_metadata.name).then((res: any) => {
      setIsDonor(res);
    });
  }, [user]);
  return (
    <>
      <div className="flex flex-row items-center w-3/4 overflow-hidden border-[1px] border-white border-opacity-5 shadow-2xl backdrop-blur-sm rounded-3xl">
        <div className="flex flex-row items-center px-6 py-1">
          <Image
            src={user?.user_metadata.avatar_url}
            alt={user?.user_metadata.name}
            width={35}
            height={35}
            className="rounded-3xl border-[1px] "
          />
          <div className="ml-2 py-3 font-normal text-white rounded-2xl text-base w-max overflow-hidden text-ellipsis whitespace-nowrap">
            {user?.user_metadata.name}
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center px-2 text-white">
              {isDonor ? (
                <>
                  <Bs.BsFillPatchCheckFill className="text-main-purple text-sm lg:text-xl" />
                </>
              ) : ""}
            </div>
          </div>
          <div className="flex flex-row items-center">
            {isMod ? (
              <Tooltip
                transition="pop"
                transitionDuration={300}
                label="Mod dashboard"
                withArrow
              >
                <Link href={"/dashboard/admin"} passHref>
                  <div className="p-1.5 text-sm hover:bg-white duration-300 hover:text-main-purple cursor-pointer border-[1px] border-white opacity-50 hover:opacity-100 flex text-white items-center justify-center rounded-3xl mr-1">
                    <Md.MdOutlineAdminPanelSettings />
                  </div>
                </Link>
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
                className="p-1.5 text-sm hover:bg-white opacity-50 hover:opacity-100  duration-300 hover:text-main-purple cursor-pointer border-[1px] flex text-white items-center justify-center rounded-3xl mr-1"
              >
                <Md.MdLogout />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="flex flex-row items-center ml-auto space-x-1 mr-3">
          <Link href="/dashboard" passHref>
            <span className="rounded-3xl flex items-center p-1 px-3 border-white border-opacity-5 border-[1px] hover:bg-white hover:text-main-purple text-sm cursor-pointer duration-300">
              Dashboard
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SetsSignedIn;
