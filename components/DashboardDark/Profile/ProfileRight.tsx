import React, { FC, useEffect, useState } from "react";
import useCheckIfHasSet from "../../../funcs/useCheckIfHasSet";
import { gettingSetMods } from "../../../funcs/gettingModList";
import { supabase } from "../../../lib/supabaseClient";
import * as Md from "react-icons/md";
import { useUser } from "@supabase/auth-helpers-react";

const ProfileRight:FC = () => {
  const user = useUser()
  const [mods, setMods] = useState<any[]>([]);
  const isOwnerOfSomething = useCheckIfHasSet(user?.user_metadata.name);
  const [loading, setLoading] = useState<boolean>(false);
  const [modValue, setModValue] = useState<string>("");
  useEffect(() => {
    gettingSetMods(user?.user_metadata?.name).then((res: any) => {
      setMods(res)
    })
  }, [user]);

  const removeMod = async (mod : any) => {
    const x : any = mods;
    let p: any[] = [];
    x.forEach((data:any[]) => {
      if (data !== mod) p.push(data);
    });
    setMods(p);
    return await supabase
      .from("useremotes")
      .update({ mods: p })
      .eq("name", user?.user_metadata.name);
  };

  const addMod = async () => {
    setLoading(true);
    let p = mods;
    p.push(modValue);
    setMods(p);
    return await supabase
      .from("useremotes")
      .update({ mods: p })
      .eq("name", user?.user_metadata.name)
      .then(() => setLoading(false))
      .then(() => setModValue(""));
  };

  return (
    <div className="text-white h-full w-full flex flex-col p-5">
      {!isOwnerOfSomething ? (
        <span className="text-sm">
          If you&apos;re a streamer, use the Contact form to request an emote
          set!
        </span>
      ) : (
        <>
          <div className="flex flex-col mt-3">
            <div className="flex flex-row items-center space-x-3 mb-3">
              <input
                placeholder="username"
                value={modValue}
                onChange={(e: any) => setModValue(e.target.value)}
                className="w-full p-3 bg-transparent border-[1px] border-white border-opacity-5 rounded-3xl text-white"
              />

              <button
                onClick={() => addMod()}
                disabled={loading}
                className="hover:bg-white border-white border-opacity-50 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-2 rounded-3xl w-1/4"
              >
                {loading ? "Mod added!" : "Add mod"}
              </button>
            </div>
            <div className="flex flex-row items-center w-full">
              <div className="w-max">Your mods:</div>
              <div className="flex flex-row mx-3 overflow-x-auto">
                {mods &&
                  mods.map((data, index) => (
                    <div
                      key={index}
                      className="group flex flex-row items-center text-sm border-[1px] border-white border-opacity-25 hover:border-opacity-100 duration-300 text-white w-max rounded-3xl m-1 p-1"
                    >
                      {data}
                      <div
                        className="cursor-pointer"
                        onClick={() => removeMod(data)}
                      >
                        <Md.MdOutlineRemoveCircle className="ml-1 opacity-50 group-hover:opacity-100 duration-300" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ProfileRight