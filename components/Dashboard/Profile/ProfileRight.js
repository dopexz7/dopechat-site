import React, { useEffect, useState } from "react";
import useCheckIfHasSet from "../../../funcs/useCheckIfHasSet";
import useShowSetMods from "../../../funcs/useShowSetMods";
import { Input } from "@mantine/core";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import * as Md from "react-icons/md";

export default function ProfileRight({ session }) {
  const [emotesLen, setEmotesLen] = useState();
  const [mods, setMods] = useState();
  const isOwnerOfSomething = useCheckIfHasSet(
    session?.user?.user_metadata.name
  );
  const [creatingSet, setCreatingSet] = useState("Create your own set");
  const showSetMods = useShowSetMods(session?.user?.user_metadata.name);
  const [loading, setLoading] = useState(false);
  const [modValue, setModValue] = useState("");
  const [requested, setRequested] = useState(false);
  useEffect(() => {
    setEmotesLen(showSetMods?.emotes?.length);
    setMods(showSetMods?.mods);
  }, [showSetMods]);

  const removeMod = async (mod) => {
    const x = mods;
    let p = [];
    x.forEach((data) => {
      if (data !== mod) p.push(data);
    });
    setMods(p);
    return await supabase
      .from("useremotes")
      .update({ mods: p })
      .eq("name", session?.user?.user_metadata.name);
  };
  const addMod = async () => {
    setLoading(true);
    let p = mods;
    p.push(modValue);
    setMods(p);
    return await supabase
      .from("useremotes")
      .update({ mods: p })
      .eq("name", session?.user?.user_metadata.name)
      .then(() => setLoading(false))
      .then(() => setModValue(""));
  };
  const createNewSet = async () => {
    setCreatingSet("Creating set");
    return await supabase
      .from("useremotes")
      .insert([
        {
          name: session?.user?.user_metadata.name,
          mods: [session?.user?.user_metadata.name],
        },
      ])
      .then(() =>
        setTimeout(() => {
          setCreatingSet("Set created! Refresh the page");
        }, 1000)
      );
  };
  const requestToBePromoted = async () =>
    await supabase
      .from("useremotes")
      .update({ requested_streamer: true })
      .eq("name", session?.user?.user_metadata.name)
      .then(() => setRequested(true));

  return (
    <div className="text-black bg-border-white h-full w-1/4 flex flex-col p-5">
      {!isOwnerOfSomething ? (
        <div
          onClick={() => createNewSet()}
          className="group hover:bg-white hover:text-main-purple  bg-main-purple duration-300 cursor-pointer text-white flex justify-center items-center p-3 rounded-2xl w-1/2"
        >
          {creatingSet}
        </div>
      ) : (
        <>
          <div className="space-x-1 flex flex-row p-0 items-center bg-white w-full rounded-3xl">
            <div className="flex h-full flex-col items-center mr-auto self-start p-4 text-sm border-4 rounded-l-2xl w-max">
              <div className="font-semibold text-main-purple">
                {session?.user?.user_metadata.name}&apos;s set
              </div>
              <div className="text-xs">
                {emotesLen ? emotesLen : "0"} emotes
              </div>
            </div>

            <Link
              href={`/dashboard/set/${session?.user?.user_metadata.name}`}
              passHref
            >
              <div className="cursor-pointer h-full hover:bg-main-purple hover:text-white p-3 flex items-center text-sm font-semibold rounded-r-2xl border-4 duration-300 ml-auto">
                View full set
              </div>
            </Link>
          </div>
          {!showSetMods?.requested_streamer && !requested ? (
            <div
              onClick={() => requestToBePromoted()}
              className="w-max cursor-pointer duration-300 text-xs mt-3 hover:text-main-purple"
            >
              Request to be promoted to streamer
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col mt-3">
            <div className="flex flex-row items-center space-x-3 mb-3">
              <Input
                placeholder="mod name"
                radius="md"
                value={modValue}
                onChange={(e) => setModValue(e.target.value)}
                classNames={{
                  wrapper: "w-3/4",
                  defaultVariant: "border-0 p-2",
                  invalid: "your-invalid-class",
                  disabled: "your-disabled-class",
                  icon: "your-icon-class",
                  withIcon: "your-withIcon-class",
                  input: "your-input-class",
                  rightSection: "your-rightSection-class",
                }}
              />
              <button
                onClick={() => addMod()}
                disabled={loading}
                className="w-1/4 p-2 text-sm bg-main-purple text-white rounded-lg flex items-center justify-center cursor-pointer"
              >
                {loading ? "Mod added!" : "Add mod"}
              </button>
            </div>
            Your mods:
            <div className="flex flex-row mt-3 flex-wrap w-full">
              {mods &&
                mods.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center text-sm bg-main-purple text-white w-max rounded-md m-1 p-1"
                  >
                    {data}
                    <div
                      className="cursor-pointer"
                      onClick={() => removeMod(data)}
                    >
                      <Md.MdOutlineRemoveCircle className="ml-1" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
