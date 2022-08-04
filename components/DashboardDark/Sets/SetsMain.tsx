import DashboardLayout from "../Main/DashboardLayout";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as Md from "react-icons/md";
import { Tooltip } from "@mantine/core";
import * as Bs from "react-icons/bs";
import DashboardLeftSignedIn from "../Main/Leftside/DashboardLeftSignedIn";
import { gettingSetEmotes } from "funcs/updatingEmotes";
import { useAuth } from "contexts/AppContext";
import getMod from "../../../funcs/useIsSetMod";
import SetsSignedIn from './SetsSignedIn'
const SetsMain:FC = () => {
  const [q, setQ] = useState<string>("");
  const router = useRouter();
  const [pageSet, setPageSet] = useState<any[]>([]);
  const [pageName, setPageName] = useState<any>();
  const { id } = router.query as any;
  const [mod, setMod] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [sorting, setSorting] = useState<boolean>(false);
  const [allCount, setAllCount] = useState(0);
  const { user } = useAuth() as any;
  
  useEffect(() => {
    gettingSetEmotes(id).then((r: any) => {
      setAllCount(r?.length);
      setPageSet(r);
      let name =
        id?.toString().charAt(0).toUpperCase() + id?.toString().slice(1);
      setPageName(name);
      setTimeout(() => {
        setLoading(false);
       }, 500)
    });
  }, [id]);

  useEffect(() => {
    getMod(pageName, user?.user_metadata.name).then((r: any) => {
      setMod(r);
    });
  },[pageName, user])
  
  const deleteFromSet:Function = async (d: objectType) => {
    const newArray : any[] = pageSet;
    const finalArray : any[] = [];
    newArray.forEach((v) => {
      if (v.code !== d.code) finalArray.push(v);
    });
    setPageSet(finalArray);
    setAllCount((prevVal) => prevVal - 1);
    await supabase
      .from("useremotes")
      .update({ emotes: finalArray })
      .eq("name", pageName);
  };
  
  return (
    <DashboardLayout
      layout="sets"
      title={`${
        loading
          ? "Loading..."
          : pageName
          ? pageName.toLowerCase() === "global"
            ? "Global set"
            : `${pageName}'s set`
          : "Set doesn't exist..."
      }`}
    >
      <SetsSignedIn />
      <div className="overflow-auto shadow-sm backdrop-blur-sm border-[1px] rounded-3xl lg:p-1 border-white border-opacity-5 h-full w-3/4 flex flex-col">
        <div className="px-6 py-2 flex flex-row items-center">
          <div className="flex flex-row items-center  text-white">
            <p className="text-sm lg:text-xl">
              {loading
                ? "Loading..."
                : pageName
                ? pageName.toLowerCase() === "global"
                  ? "Global set"
                  : `${pageName}'s set`
                : "Set doesn't exist..."}
            </p>
            <p className="text-xs mt-1 opacity-50">{allCount}</p>
          </div>

          <div className="overflow-hidden duration-300 border-[1px] text-white shadow-2xl backdrop-blur-sm border-white border-opacity-25 rounded-3xl ml-auto flex flex-row items-center text-sm">
            <Tooltip
              position="top"
              placement="center"
              gutter={10}
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
              <Tooltip
                position="top"
                placement="end"
                gutter={15}
                label="at least 3 characters"
              >
                <></>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-6 overflow-auto">
          <div className="h-full w-full grid grid-cols-4 lg:grid-cols-10 gap-3">
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
                  <div
                    key={index}
                    className={`h-16 w-16 lg:h-32 lg:w-32 group duration-300 shadow-2xl rounded-3xl select-none`}
                  >
                    <div className="h-16 w-full lg:h-32 lg:w-full overflow-hidden text-white flex justify-center relative rounded-3xl border-[1px] border-white border-opacity-5">
                      <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
                        <img
                          height={64}
                          width={64}
                          className={`group-hover:scale-125 group-hover:opacity-25 duration-300`}
                          src={data.src}
                          alt={data.code}
                        />
                      </div>

                      <div className="w-full  relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                        <div className="overflow-hidden mt-auto ml-auto mr-auto text-xs lg:text-sm font-normal">
                          {data.code}
                        </div>
                        <div className="overflow-hidden mt-auto ml-auto mr-auto hidden lg:block text-xs font-normal">
                          Date: {data.date ? data.date : "unavailable"}
                        </div>
                        {mod ? (
                          <div className="flex flex-row justify-center items-center mt-auto">
                            <div
                              onClick={() => deleteFromSet(data)}
                              className="remove w-full flex items-center justify-center hover:rounded-2xl p-1 text-center text-white text-sm  cursor-pointer duration-300 h-full"
                            >
                              <Md.MdRemoveCircleOutline />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
export default SetsMain;

interface objectType {
  code: string;
}