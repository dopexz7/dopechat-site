import * as Md from "react-icons/md";
import { Tooltip } from "@mantine/core";
import * as Bs from "react-icons/bs";
import { supabase } from "../../../../lib/supabaseClient";
import { useEffect, useState } from "react";
import EditingSet from "./EditingSet";
import { FC } from "react";
import React from "react";
import { getAvailEdits } from "../../../../funcs/useHasEdits";
import { useUser } from "@supabase/auth-helpers-react";
import { gettingSetEmotes } from "../../../../funcs/updatingEmotes";
import getMod from "../../../../funcs/useIsSetMod";
import EmoteComponent from "../Emote/EmoteComponent";

const DashboardLeftSignedIn: FC<Typies> = (props): React.ReactElement => {
  const user = useUser();
  const [q, setQ] = useState<string>("");
  const [pageSet, setPageSet] = useState<any[]>([]);
  const [mod, setMod] = useState<boolean>(false);
  const [sorting, setSorting] = useState<boolean>(false);
  const [allCount, setAllCount] = useState(0);
  const [availEdits, setAvailEdits] = useState<string[]>([]);
  const [editingSet, setEditingSet] = useState<string>("");

  const passProps = (d: string): void => {
    setEditingSet(d);
    props.onSuccess(d);
  };

  useEffect(() => {
    getAvailEdits(user?.user_metadata.name).then((res: any[]) => {
      setAvailEdits(res);
    });
  },[user])

  
  
  useEffect(() => {
    gettingSetEmotes(editingSet).then((r: any) => {
      setAllCount(r?.length);
      setPageSet(r);
    });
  }, [editingSet, gettingSetEmotes(editingSet)]);

  useEffect(() => {
    getMod(editingSet, user?.user_metadata.name).then((r: any) => {
      setMod(r);
    });
  },[editingSet, user]);
  
  const deleteFromSet:Function = async (d: any) => {
    const newArray : any[] = pageSet;
    const finalArray : any[] = [];
    newArray.forEach((v) => {
      if (v.code !== d.code) finalArray.push(v);
    });
    await supabase
      .from("useremotes")
      .update({ emotes: finalArray })
      .eq("name", editingSet);
    setPageSet(finalArray);
    setAllCount((prevVal) => prevVal - 1);
    
  };
  return (
    <div className={`border-l-[1px] border-white border-opacity-5 h-full w-full max-w-2xl  flex-col`}>
      <div className="pl-12 w-full space-x-6 flex items-center z-10">
          {availEdits ? <div className="text-ma-pink font-bold text-lg ">
            Available sets
          </div> : 'No sets available'}
          
          <div className="flex flex-row flex-wrap space-x-3 justify-center ">
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
        {editingSet ? 
        <div className="mx-5 overflow-y-auto lg:p-1 border-white border-opacity-5 h-full w-full flex flex-col">
          <div className="px-6 py-2 flex flex-row items-center">
            <div className="flex flex-row items-center  text-white">
              <p className="text-sm lg:text-xl">
                {editingSet ? `${editingSet}'s set` : 'Nothing selected.'}
              </p>
              <p className="text-xs mt-1 opacity-50">{allCount}</p>
            </div>

          <div className="overflow-hidden duration-300 border-[1px] text-white border-white border-opacity-25 rounded-3xl ml-auto flex flex-row items-center text-sm">
            <Tooltip
              position="top"
              label={sorting ? "Latest at the top" : "Sort by name, ascending"}
              withArrow
            >
              <div
                onClick={() => setSorting(!sorting)}
                className="group p-3 text-sm duration-300 cursor-pointer "
              >
                {sorting ? <Bs.BsSortDown /> : <Bs.BsSortAlphaDown />}
              </div>
            </Tooltip>

            <div className="p-1 flex flex-row items-center">
              <Md.MdOutlineSearch className="mr-3 ml-auto" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="text"
                className="peer w-16 bg-transparent border-0 focus:w-36 duration-300"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-6 overflow-auto">
          <div className="h-full w-full flex flex-wrap gap-1">
            {pageSet &&
              pageSet
                .filter((val) => {
                  if (q === "") {
                    return val;
                  } else if (val.code.toLowerCase().includes(q.toLowerCase())) {
                    return val;
                  }
                })
                .sort((a, b) =>
                  sorting
                    ? a.code > b.code
                      ? 1
                      : b.code > a.code
                      ? -1
                      : 0
                    : new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((data, index) => (
                  <EmoteComponent key={index} setEmote={deleteFromSet} setMod={mod} data={data}/>
                ))}
          </div>
        </div>
      </div> 
      :''}        
      </div>
    
  );
};

export default DashboardLeftSignedIn;

interface Typies {
  profile?: boolean;
  onSuccess: (d: string) => typeof d;
  onRouteChange?: () => void;
  route?: boolean;
}
