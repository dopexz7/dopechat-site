import React, { useState } from "react";
import * as Md from "react-icons/md";
import { supabase } from "../../../../lib/supabaseClient";
import * as Im from "react-icons/im";
import useIsDonor from "../../../../funcs/useIsDonor";
import { useAuth } from "../../../../contexts/AppContext";
import { Modal } from "@mantine/core";
import { FC } from "react";
import { useEffect } from "react";

interface EmoteComponentTypes {
  data: any;
  editingSet: string;
  isMod: boolean;
  kekRef: React.MutableRefObject<HTMLDivElement>;
}
type emoteType = {
  src: string;
  code: string;
  uploaded_by: string;
}

const EmoteComponent: FC<EmoteComponentTypes> = ({ data, editingSet, isMod, kekRef }) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { user } = useAuth();
  const isDonor = useIsDonor();

  const deleteFromDb = async (v: emoteType) => {
    await supabase.from("allemotes").delete().eq("src", v.src);
    setLoading(true);
    setTimeout(() => {
      setDeleted(true);
      kekRef.current.textContent = kekRef.current.textContent - 1;
    }, 800);
  };

  useEffect(() => {
    const checkMod = async (): Promise<any> => {
      try {
        await supabase
          .from("useremotes")
          .select("emotes")
          .eq("name", 'Ramee')
          .then((r) => console.log(r.data![0].emotes))
          
         
      }
      catch (e) {
        console.log(e);
      }
    }
      checkMod();
    
      // const arr = useremotes[0].emotes;
    }, []);

  const addToSet = async (d: emoteType) => {
    let { data: useremotes } = await supabase
      .from("useremotes")
      .select("emotes")
      .eq("name", editingSet);
    const arr : any[] = useremotes![0].emotes;
    if (arr.some((e: emoteType) => e.code === d.code)) {
      return alert("Emote already in the set!");
    }
    if (editingSet === user?.user_metadata.name) {
      if (!isDonor) {
        if (useremotes![0].emotes?.length >= 5) {
          return alert("Emote limit reached!");
        } else {
          if (useremotes![0]?.emotes?.length) {
            arr.push(d);
            toggle(d);
            return await supabase
              .from("useremotes")
              .update({ emotes: arr })
              .eq("name", editingSet);
          } else {
            toggle(d);
            return await supabase
              .from("useremotes")
              .update({ emotes: [d] })
              .eq("name", editingSet);
          }
        }
      } else {
        if (useremotes![0]?.emotes?.length >= 10) {
          return alert("Emote limit reached!");
        } else {
          if (useremotes![0]?.emotes?.length) {
            arr.push(d);
            toggle(d);
            return await supabase
              .from("useremotes")
              .update({ emotes: arr })
              .eq("name", editingSet);
          } else {
            toggle(d);
            return await supabase
              .from("useremotes")
              .update({ emotes: [d] })
              .eq("name", editingSet);
          }
        }
      }
    } else {
      if (useremotes![0]?.emotes?.length) {
        arr.push(d);
        toggle(d);
        return await supabase
          .from("useremotes")
          .update({ emotes: arr })
          .eq("name", editingSet);
      } else {
        toggle(d);
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
        {user && editingSet ? (
          <div
            onClick={() => addToSet(data)}
            className=" approve flex items-center justify-center w-full hover:rounded-2xl p-1 text-white text-xs cursor-pointer duration-300 h-full"
          >
            <Md.MdAddCircleOutline className="mr-1" />
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
  const [emoteAdded, setEmoteAdded] = useState<String>();
  function toggle(d: emoteType) {
    setEmoteAdded(d.code);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setEmoteAdded("");
    }, 1500);
  }
  return (
    <>
      <Modal
        opened={visible}
        withCloseButton={false}
        onClose={() => setVisible(false)}
        classNames={{
          root: "backdrop-blur-2xl ",
          modal: "text-center rounded-lg",
        }}
        size="xs"
        centered
      >
        <div className="flex justify-center text-7xl text-accent-white m-6">
          <Md.MdCheck className="approve rounded-full p-1" />
        </div>
        {emoteAdded} added to {editingSet} set!
      </Modal>
      <div
        className={`h-32 w-32 group duration-300 shadow-2xl rounded-3xl select-none`}
      >
        <div
          className={`w-full h-32 overflow-hidden text-white flex ${
            deleted ? "flex-col" : "flex-row"
          } justify-center relative rounded-3xl border-[1px] border-white border-opacity-[0.03]`}
        >
          {deleted ? (
            <div className="anim-tobotf remove self-center rounded-md h-4/5 w-4/5 flex items-center justify-center text-center text-accent-white text-lg duration-100">
              <Im.ImCross />
            </div>
          ) : (
            <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
              <img
                height={64}
                width={64}
                className={`group-hover:scale-150 group-hover:opacity-25 duration-300`}
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
                  <div className="text-xs">
                    by {data.uploaded_by ? data.uploaded_by : "dope_xz7"}
                  </div>
                </div>
                <EmoteTools />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default EmoteComponent;