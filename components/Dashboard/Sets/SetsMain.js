import React from "react";

import DashboardLayout from "../Main/DashboardLayout";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Md from "react-icons/md";
import Image from "next/image";
import useIsSetMod from "../../../funcs/useIsSetMod";
export default function SetsMain(props) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const [pageSet, setPageSet] = useState();
  const pageData = props.data;
  const [pageName, setPageName] = useState();
  const { id } = router.query;
  const isSetMod = useIsSetMod(id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    pageData.map((v) => {
      if (v.name.toLowerCase() === id.toLowerCase()) {
        setPageSet(v.emotes);
        setPageName(v.name);
      }
    });
    setLoading(false);
  }, [props]);

  const deleteFromSet = async (d) => {
    const newArray = pageSet;
    const finalArray = [];
    newArray.forEach((v) => {
      if (v.code !== d.code) finalArray.push(v);
    });
    setPageSet(finalArray);
    //console.log(finalArray);
    await supabase
      .from("useremotes")
      .update({ emotes: finalArray })
      .eq("name", pageName);
    //console.log(d.emotes);
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
      <div className="text-black border-r-2 h-full w-[80%] flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b-2 flex flex-row items-center">
          <div className="font-normal text-lg flex-1 max-w-xs">
            {pageName
              ? `${pageName}'s set`
              : loading
              ? "Loading..."
              : "Set doesn't exist"}
          </div>
          <div className="overflow-hidden duration-300 border-2 px-3 py-1 rounded-2xl ml-auto flex flex-row items-center text-md font-semibold">
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
        <div className="w-full flex flex-col p-6 overflow-auto">
          <div className="h-full w-full grid grid-cols-11">
            {pageSet &&
              pageSet
                .filter((val) => {
                  if (q === "") {
                    return val;
                  } else if (val.code.toLowerCase().includes(q.toLowerCase())) {
                    return val;
                  }
                })
                .map((data, index) => (
                  <div
                    key={index}
                    className="h-32 w-32 group duration-300 bg-accent-white rounded-md"
                  >
                    <div className="w-full h-32 overflow-hidden text-black flex flex-row justify-center relative border-2 rounded-md">
                      <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
                        <Image
                          height={64}
                          width={64}
                          className="group-hover:scale-50 group-hover:opacity-25 duration-300"
                          src={data.src}
                          alt={data.code}
                        />
                      </div>

                      <div className="w-full  relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                        <div className="overflow-hidden mt-auto ml-auto mr-auto text-sm font-normal">
                          {data.code}
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
