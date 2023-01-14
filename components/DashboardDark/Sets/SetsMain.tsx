import DashboardLayout from "../Main/DashboardLayout";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as Md from "react-icons/md";
import { Tooltip } from "@mantine/core";
import * as Bs from "react-icons/bs";
import { gettingSetEmotes } from "funcs/updatingEmotes";
import getMod from "../../../funcs/useIsSetMod";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import AuthRoute from "contexts/authRoute";
import EmoteComponent from "../Main/Emote/EmoteComponent";

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
  const user = useUser();
  
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
    >
      <AuthRoute>
      <Head>
      <title>{
        loading
          ? "Loading..."
          : pageName
          ? pageName.toLowerCase() === "global"
            ? "Global set"
            : `${pageName}'s set`
          : "Set doesn't exist..."
      }</title>
      <meta name="description" content="Facebook Gaming extension dopeChat" />
      </Head>
      <div className="overflow-auto lg:p-1 h-full w-full flex flex-col">
        <div className="px-6 py-2 flex flex-row items-center">
          <div className="flex flex-row items-center  text-ma-pink font-bold">
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
          <div className="h-full w-full flex flex-wrap gap-3">
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
                  <EmoteComponent data={data} key={index} setMod={mod} setEmote={deleteFromSet}/>
                ))}
          </div>
        </div>
      </div>
      </AuthRoute>
    </DashboardLayout>
  );
}
export default SetsMain;

interface objectType {
  code: string;
}