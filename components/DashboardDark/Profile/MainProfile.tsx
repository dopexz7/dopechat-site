import { FC, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import * as Im from "react-icons/im";
import * as Md from "react-icons/md";
import ProfileRight from "./ProfileRight";
import { gettingProfileEmotes } from "funcs/updatingEmotes";
import { useUser } from "@supabase/auth-helpers-react";

const MainProfile:FC = () => {
  const user = useUser()
  const [approvedEmotes, setApprovedEmotes] = useState<any[]>();
  
  
  useEffect(() => {
    gettingProfileEmotes(user).then((data: any) => { 
      setApprovedEmotes(data.length ? data : undefined);
    });
  }, [user]);
  
  const EmoteComponent:FC<EmCType> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);
    
    const deleteFromDb = async (v: any) => {
      await supabase.from("allemotes").delete().eq("src", v.src);
      setLoading(true);
      setTimeout(() => {
        setDeleted(true);
        setTimeout(() => {
          const lll = approvedEmotes;
          let lel : any[] = [];
          lll!.forEach((x) => {
            if (v.src !== x.src) lel.push(x);
          });
          setApprovedEmotes(lel);
        }, 1500);
      }, 800);
    };

    return (
      <div className="h-32 w-32 group duration-300 bg-accent-white rounded-md">
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
              <img
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
                </div>
                <div className="flex flex-row justify-center items-center mt-auto">
                  <div
                    onClick={() => deleteFromDb(data)}
                    className={` ${
                      loading ? "anim-totopf" : ""
                    } remove w-full flex items-center justify-center hover:rounded-2xl p-0.5 text-center text-white text-xs cursor-pointer duration-300 h-full`}
                  >
                    <Md.MdRemoveCircleOutline />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="shadow-sm backdrop-blur-sm border-[1px] rounded-3xl lg:p-1 border-white border-opacity-5 h-full w-full lg:w-4/5 flex flex-col">
      <div className="px-6 py-3 flex flex-row items-center shadow-2xl ">
        <div className="flex flex-row items-center  text-white">
          <p className="text-xl">Your approved emotes</p>
        </div>
      </div>
      <div className="p-1">
        {(approvedEmotes && (
          <div className="grid xgrd gap-3 p-6 overflow-y-auto">
            {approvedEmotes.map((data: any, index) => (
              <EmoteComponent key={index} data={data} />
            ))}
          </div>
        )) || <div className="p-6">You have no approved emotes yet.</div>}
      </div>
      <div className="h-max mt-auto border-t-[1px] border-white border-opacity-5">
        <ProfileRight />
      </div>
    </div>
  );
}
export default MainProfile;

interface EmCType {
  data: any;
}