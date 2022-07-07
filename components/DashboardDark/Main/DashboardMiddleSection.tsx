import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "@mantine/core";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import React, { FC, useEffect, useRef, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import useIsMod from "../../../funcs/useIsMod";
import EmoteComponent from "./Emote/EmoteComponent";
 
interface MiddleTypes {
  data: any[];
  fullSet: any[];
  editingSet: string;
}


const DashboardMiddleSection:FC<MiddleTypes> = ({ data, fullSet, editingSet }) => {
  /* eslint-disable no-unused-vars */
  const [blogs, setBlogs] = useState<any[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [q, setQ] = useState<string>("");
  const [startUpdate, setStartUpdate] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>(data);
  const [sorting, setSorting] = useState<boolean>(false);
  const isMod : boolean = useIsMod();
  const [showingAllEmotes, setShowingAllEmotes] = useState<boolean>(false);
  const divRef: any = useRef();
  const getMorePost = async () => {
    try {
      const kekl = posts.length + 12;
      let { data, error } = await supabase
        .from("allemotes")
        .select("*")
        .range(posts.length, kekl)
        .order("code", { ascending: true });
      if (error) console.log(error);
      const newPosts: any[] | null = data;
      setPosts((post) => [...post, ...newPosts!]);
    } catch (e) {
      console.log(e);
    }
  };

  const [moreThanTwo, setMoreThanTwo] = useState(false);
  const beginUpdate = () => {
    if (q.length >= 2) {
      setStartUpdate(true);
      setMoreThanTwo(false);
    } else {
      setStartUpdate(false);
      setMoreThanTwo(true);
      setTimeout(() => {
        setMoreThanTwo(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setBlogs(fullSet);
    setAllCount(fullSet.length);
  },[])
  
  return (
    <>
      <div className="px-6 py-2 flex flex-row items-center shadow-2xl ">
        <div className="flex flex-row items-center  text-white">
          <p className="text-xl">All emotes</p>
          <p className="text-xs mt-1 opacity-50" ref={divRef}>
            {allCount}
          </p>
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
            <div
              onClick={() => {
                beginUpdate();
              }}
              className="font-normal hover:border-darker-purple text-main-black hover:bg-white hover:text-main-purple text-white cursor-pointer peer-focus:opacity-100 opacity-0 duration-300 w-1 peer-focus:w-20 overflow-hidden border-[1px] border-white border-opacity-25 px-1 items-center flex justify-center rounded-3xl"
            >
              Update
            </div>
            <Tooltip
              position="top"
              placement="end"
              gutter={15}
              label="at least 3 characters"
              opened={moreThanTwo}>
              
              </Tooltip>
          </div>
        </div>
      </div>
      {showingAllEmotes ? (
        <>
          {startUpdate && q.length >= 2 ? (
            <div className="overflow-y-scroll overflow-x-hidden w-full grid xgrd gap-3 p-6">
              {blogs
                .filter((val) => {
                  if (q === "") {
                    return val;
                  } else if (val.code.toLowerCase().includes(q.toLowerCase())) {
                    return val;
                  }
                })
                .map((data, index) => (
                  <EmoteComponent
                    key={index}
                    data={data}
                    editingSet={editingSet}
                    isMod={isMod}
                    kekRef={divRef}
                  />
                ))
                .sort((a:any, b:any) =>
                  sorting
                    ? a.code > b.code
                      ? 1
                      : b.code > a.code
                      ? -1
                      : 0
                    : new Date(b.date).getTime() - new Date(a.date).getTime()
                )}
            </div>
          ) : (
            <div
              id="scrollableDiv"
              className="overflow-y-scroll overflow-x-hidden w-full"
            >
              <InfiniteScroll
                  className="grid xgrd gap-3 p-6"
                  dataLength={posts.length}
                  next={getMorePost}
                  hasMore={true}
                  scrollableTarget="scrollableDiv"
                  loader={undefined}              >
                {posts &&
                  posts
                    .sort((a: any, b: any) =>
                      sorting
                        ? a.code > b.code
                          ? 1
                          : b.code > a.code
                          ? -1
                          : 0
                        : new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((data, index) => (
                      <EmoteComponent
                        key={index}
                        data={data}
                        editingSet={editingSet}
                        isMod={isMod}
                        kekRef={divRef}                    />
                    ))}
              </InfiniteScroll>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            onClick={() => setShowingAllEmotes(true)}
            className="p-3 px-6 m-auto cursor-pointer text-white bg-darker-purple hover:bg-main-purple duration-300 rounded-3xl bg-opacity-10  flex justify-center items-center text-xl"
          >
            Show all emotes
          </div>
        </>
      )}
    </>
  );
}
export default DashboardMiddleSection;
