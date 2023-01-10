import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "@mantine/core";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import React, { FC, useEffect, useRef, useState } from "react";
import EmoteComponent from "./Emote/EmoteComponent";
import { gettingFirstEmotes, gettingMoreEmotes } from "../../../funcs/updatingEmotes";
import { useUser } from "@supabase/auth-helpers-react";

const DashboardMiddleSection:FC<MiddleTypes> = ({ editingSet }) => {
  /* eslint-disable no-unused-vars */
  const [blogs, setBlogs] = useState<any[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [q, setQ] = useState<string>("");
  const [startUpdate, setStartUpdate] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const [showingAllEmotes, setShowingAllEmotes] = useState<boolean>(false);
  const divRef: any = useRef();
  // const { isMod } = useAuth() as any;
  const user = useUser()

  useEffect(() => {
    gettingFirstEmotes().then((data: any) => {
      setBlogs(data);
      setAllCount(data.length);
      setPosts(data.slice(0, 36))
    });
    
  }, [user])
  
  const getMorePost = async () => {
    const kekl = posts.length + 12;
    gettingMoreEmotes(posts.length, kekl).then((data: any) => {
      const newPosts: any[] | null = data;
      return setPosts((post) => [...post, ...newPosts!]);
    });
  };

  const beginUpdate = () => {
    if (q.length >= 2) {
      setStartUpdate(true);
    } else {
      setStartUpdate(false);
    }
  };

  return (
    <div className="border-[0px] rounded-3xl lg:p-1 border-white border-opacity-5 h-full w-4/5 flex flex-col">
      <div className="px-6 py-3 flex flex-row items-center">
        <div className="flex flex-row items-center text-ma-pink">
          <p className="text-xl font-bold">All emotes</p>
          <p className="text-xs mt-1 opacity-50" ref={divRef}>
            {allCount}
          </p>
        </div>

        <div className="overflow-hidden duration-300 border-[1px] text-white border-white border-opacity-25 rounded-3xl ml-auto flex flex-row items-center text-sm">
          <Tooltip
            position="top"
            label={sorting ? "Latest at the top" : "Sort by name, ascending"}
            withArrow
          >
            <div
              onClick={() => setSorting(!sorting)}
              className="group px-3 text-sm duration-300 cursor-pointer "
            >
              {sorting ? <Bs.BsSortDown /> : <Bs.BsSortAlphaDown />}
            </div>
          </Tooltip>

          <div className="px-1 h-7 flex flex-row items-center">
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
            
          </div>
        </div>
      </div>
      
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
                    isMod={false}
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
                        isMod={false}
                        kekRef={divRef}                    />
                    ))}
              </InfiniteScroll>
            </div>
          )}
        </>
      
    </div>
  );
}
export default DashboardMiddleSection;

interface MiddleTypes {
  editingSet: string;
}
