import React, { useEffect, useState } from "react";
import useCheckIfHasSet from "../../../funcs/useCheckIfHasSet";
import useShowSetMods from "../../../funcs/useShowSetMods";
import { Input } from "@mantine/core";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import * as Md from "react-icons/md";
import { useAuth } from "../../../contexts/AppContext";
import ContactMain from "../../Contact/ContactMain";

export default function ProfileRight() {
  const { user } = useAuth();
  const [emotesLen, setEmotesLen] = useState();
  const [mods, setMods] = useState();
  const isOwnerOfSomething = useCheckIfHasSet(user.user_metadata.name);
  const showSetMods = useShowSetMods(user.user_metadata.name);
  const [loading, setLoading] = useState(false);
  const [modValue, setModValue] = useState("");
  const [setDeletion, setSetDeletion] = useState(false);
  const [setDeleted, setSetDeleted] = useState(false);
  const [error, setError] = useState("");
  //const [setCreated, setSetCreated] = useState(false);
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
      .eq("name", user.user_metadata.name);
  };
  const addMod = async () => {
    setLoading(true);
    let p = mods;
    p.push(modValue);
    setMods(p);
    return await supabase
      .from("useremotes")
      .update({ mods: p })
      .eq("name", user.user_metadata.name)
      .then(() => setLoading(false))
      .then(() => setModValue(""));
  };

  const initiateSetDeletion = async () =>
    await supabase
      .from("useremotes")
      .delete()
      .eq("name", user.user_metadata.name)
      .then(() => setError("Set deleted!"))
      .then(() => {
        setTimeout(() => {
          setError("");
          setSetDeleted(true);
        }, 2000);
      });

  return (
    <div className="text-white h-full w-full flex flex-col p-5">
      {!isOwnerOfSomething || setDeleted ? (
        <ContactMain
          btnClass={`hover:bg-white hover:text-main-purple  bg-main-purple duration-300 cursor-pointer text-white flex justify-center items-center p-3 rounded-2xl w-full`}
          iconClass={`hidden`}
          text={`Request an emote set`}
        />
      ) : (
        <>
          <div className="flex flex-col mt-3">
            <div className="flex flex-row items-center space-x-3 mb-3">
              <Input
                placeholder="username"
                radius="md"
                value={modValue}
                onChange={(e) => setModValue(e.target.value)}
                classNames={{
                  wrapper: "w-3/4",
                  defaultVariant:
                    "border-0 p-3 bg-transparent border-[1px] border-white border-opacity-5 rounded-3xl text-white",
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
                className="hover:bg-white border-white border-opacity-50 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-1 rounded-3xl w-1/4"
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
            <div
              onClick={() =>
                !setDeletion ? setSetDeletion(true) : initiateSetDeletion()
              }
              className="mt-6 remove text-white duration-300 font-normal hover:text-red-400 cursor-pointer flex justify-center items-center p-3 rounded-xl w-full"
            >
              {setDeletion ? "Are you sure? Press again" : "Delete your set"}
            </div>
            {error && (
              <div
                className="remove mt-3 text-white justify-center mb-3 text-xs bg-border-white
                rounded font-normal px-2 py-3 flex flex-row items-center"
              >
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
