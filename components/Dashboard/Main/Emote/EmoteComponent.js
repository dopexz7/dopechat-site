import Image from "next/image";
import React, { useState } from "react";
import * as Md from "react-icons/md";
import { supabase } from "../../../../lib/supabaseClient";
import * as Im from "react-icons/im";
import useIsDonor from "../../../../funcs/useIsDonor";
const EmoteComponent = ({ data, session, editingSet, isMod, kekRef }) => {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteFromDb = async (v) => {
    await supabase.from("allemotes").delete().eq("src", v.src);
    setLoading(true);
    setTimeout(() => {
      setDeleted(true);
      kekRef.current.textContent = kekRef.current.textContent - 1;
    }, 800);
  };
  const isDonor = useIsDonor(session?.user?.user_metadata.name);

  const addToSet = async (d) => {
    let { data: useremotes, erro } = await supabase
      .from("useremotes")
      .select("emotes")
      .eq("name", editingSet);
    if (erro) console.log(erro);
    const arr = useremotes[0].emotes;
    if (editingSet === session?.user?.user_metadata.name) {
      if (!isDonor) {
        if (useremotes[0]?.emotes?.length >= 5) {
          return alert("Emote limit reached!");
        } else {
          if (useremotes[0]?.emotes?.length) {
            arr.push(d);
            return await supabase
              .from("useremotes")
              .update({ emotes: arr })
              .eq("name", editingSet);
          } else {
            return await supabase
              .from("useremotes")
              .update({ emotes: [d] })
              .eq("name", editingSet);
          }
        }
      } else {
        if (useremotes[0]?.emotes?.length >= 15) {
          return alert("Emote limit reached!");
        } else {
          if (useremotes[0]?.emotes?.length) {
            arr.push(d);
            return await supabase
              .from("useremotes")
              .update({ emotes: arr })
              .eq("name", editingSet);
          } else {
            return await supabase
              .from("useremotes")
              .update({ emotes: [d] })
              .eq("name", editingSet);
          }
        }
      }
    } else {
      if (useremotes[0]?.emotes?.length) {
        arr.push(d);
        return await supabase
          .from("useremotes")
          .update({ emotes: arr })
          .eq("name", editingSet);
      } else {
        return await supabase
          .from("useremotes")
          .update({ emotes: [d] })
          .eq("name", editingSet);
      }
    }
  };

  const EmoteTools = () => {
    return (
      <div className="flex flex-row">
        {session && editingSet ? (
          <div
            onClick={() => addToSet(data)}
            className=" approve flex items-center justify-center w-full hover:rounded-2xl p-1 text-white text-xs cursor-pointer duration-300 h-full"
          >
            <Md.MdAddCircleOutline className="mr-1" />{" "}
            {isMod ? "" : `${editingSet}'s set`}
          </div>
        ) : (
          ""
        )}
        {isMod ? (
          <div
            onClick={() => deleteFromDb(data)}
            className={` ${
              loading ? "anim-totopf" : ""
            } remove w-full flex items-center justify-center hover:rounded-2xl p-0.5 text-center text-white text-xs cursor-pointer duration-300 h-full`}
          >
            <Md.MdRemoveCircleOutline />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };
  return (
    <div
      className={`h-32 w-32 group duration-300 bg-accent-white rounded-md select-none`}
    >
      <div
        className={`w-full h-32 overflow-hidden text-black flex ${
          deleted ? "flex-col" : "flex-row"
        } justify-center relative border-2 rounded-md`}
      >
        {deleted ? (
          <div className="anim-tobotf remove self-center rounded-md h-4/5 w-4/5 flex items-center justify-center text-center text-accent-white text-lg duration-100">
            <Im.ImCross />
          </div>
        ) : (
          <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
            <Image
              height={64}
              width={64}
              className={`group-hover:scale-50 group-hover:opacity-25 duration-300`}
              src={data.src}
              alt={data.code}
            />
          </div>
        )}

        <div
          className={`w-full relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100`}
        >
          {deleted ? (
            ""
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <div className=" overflow-hidden text-sm font-normal">
                  {data.code}
                </div>
                <div className="text-xs">by {data.by ? data.by : "dope"}</div>
              </div>
              <EmoteTools />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmoteComponent;