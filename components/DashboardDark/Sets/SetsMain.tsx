import DashboardLayout from "../Main/DashboardLayout";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import * as Md from "react-icons/md";
import useIsSetMod from "../../../funcs/useIsSetMod";
import { Tooltip } from "@mantine/core";
import * as Bs from "react-icons/bs";
import DashboardLeftSignedIn from "../Main/Leftside/DashboardLeftSignedIn";
interface SetsMainType {
  pass: any;
}
interface objectType {
  code: string;
}
const SetsMain:FC<SetsMainType> = ({ pass }) => {
  const [q, setQ] = useState<string>("");
  const router = useRouter();
  const [pageSet, setPageSet] = useState<any[]>([]);
  const [pageName, setPageName] = useState<string>();
  const { id } = router.query;
  const isSetMod = useIsSetMod(id);
  const [loading, setLoading] = useState<boolean>(true);
  const [sorting, setSorting] = useState<boolean>(false);
  const [allCount, setAllCount] = useState(0);
  useEffect(() => {
    setAllCount(pass?.emotes?.length);
    setPageSet(pass?.emotes);
    setPageName(pass?.name);
    setLoading(false);
  }, [pass]);
  
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
      title={`${
        pageName
          ? `${pageName}'s set`
          : loading
          ? "Loading..."
          : "Set doesn't exist"
      }`}
    >
      <div className="border-[1px] border-white border-opacity-5 shadow-2xl rounded-3xl h-max backdrop-blur-sm max-w-full w-1/5 flex flex-col">
        <DashboardLeftSignedIn profile={true} onSuccess={function () {
          throw new Error("Function not implemented.");
        } } />
      </div>
      <div className="shadow-sm backdrop-blur-sm border-[1px] rounded-3xl p-1 border-white border-opacity-5 h-full w-[80%] flex flex-col">
        <div className="px-6 py-2 flex flex-row items-center">
          <div className="flex flex-row items-center  text-white">
            <p className="text-xl">
              {pageName
                ? `${pageName}'s set`
                : loading
                ? "Loading..."
                : "Set doesn't exist"}
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

              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-6 overflow-auto">
          <div className="h-full w-full grid grid-cols-10 gap-3">
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
                    : new Date(b.date) - new Date(a.date)
                )
                .map((data, index) => (
                  <div
                    key={index}
                    className={`h-32 w-32 group duration-300 shadow-2xl rounded-3xl select-none`}
                  >
                    <div className="w-full h-32 overflow-hidden text-white flex justify-center relative rounded-3xl border-[1px] border-white border-opacity-5">
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
                        <div className="overflow-hidden mt-auto ml-auto mr-auto text-sm font-normal">
                          {data.code}
                        </div>
                        <div className="overflow-hidden mt-auto ml-auto mr-auto text-xs font-normal">
                          Date: {data.date ? data.date : "unavailable"}
                        </div>
                        {isSetMod ? (
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