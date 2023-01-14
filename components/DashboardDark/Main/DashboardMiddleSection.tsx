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
  const divRef: any = useRef();
  
  const user = useUser();
  const [isMod, setIsMod] = useState(false);
  useEffect(() => {
    gettingFirstEmotes().then((data: any) => {
      let sortedData = data.sort((a: any, b: any) =>new Date(b.date != null ? b.date : "2022-01-26").getTime() - new Date(a.date != null ? a.date : "2022-01-26").getTime())
      setBlogs(sortedData);
      setAllCount(sortedData.length);
      setPosts(sortedData.slice(0, 42))
    });
    setIsMod(user?.user_metadata.name === 'dope_xz7')
  }, [user]);
  
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
    <div className="lg:p-1 h-full w-full flex flex-col">
      <div className="px-6 pb-3 flex flex-row items-center ">
        <div className="flex flex-row items-center text-ma-pink">
          <p className="text-xl tracking-tighter font-bold uppercase">All emotes</p>
          <p className="text-xs font-bold ml-1 opacity-25" ref={divRef}>
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
                : new Date(b.date != null ? b.date : "2022-01-26").getTime() - new Date(a.date != null ? a.date : "2022-01-26").getTime()
              )}
            </div>
          ) : (
            <div
              id="scrollableDiv"
              className="overflow-y-scroll overflow-x-hidden w-full"
            >
              <InfiniteScroll
                  className="flex flex-wrap gap-3 p-6" //grid xgrd
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
                      : new Date(b.date != null ? b.date : "2022-01-26").getTime() - new Date(a.date != null ? a.date : "2022-01-26").getTime()
                    )
                    .map((data, index) => (
                      <EmoteComponent
                        key={index}
                        data={data}
                        editingSet={editingSet}
                        isMod={isMod}
                        kekRef={divRef}/>

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
