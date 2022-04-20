import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "@mantine/core";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import React, { useRef, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import useIsMod from "../../../funcs/useIsMod";
import EmoteComponent from "./Emote/EmoteComponent";

export default function DashboardMiddleSection({ data, fullSet, editingSet }) {
  /* eslint-disable no-unused-vars */
  const [blogs, setBlogs] = useState(fullSet);
  const [allCount, setAllCount] = useState(fullSet.length);
  /* eslint-enable no-unused-vars */
  const [q, setQ] = useState("");
  const [startUpdate, setStartUpdate] = useState(false);
  const [posts, setPosts] = useState(data);
  const [sorting, setSorting] = useState(false);
  const isMod = useIsMod();

  const getMorePost = async () => {
    try {
      const kekl = posts.length + 12;
      let { data, error } = await supabase
        .from("allemotes")
        .select("*")
        .range(posts.length, kekl)
        .order("code", { ascending: true });
      if (error) console.log(error);
      const newPosts = data;
      setPosts((post) => [...post, ...newPosts]);
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
  const divRef = useRef();
  return (
    <>
      <div className="px-6 py-5  border-b-2 flex flex-row items-center">
        <div className="font-normal  space-x-3 flex flex-row items-center">
          <p className="text-lg">All emotes</p>
          <p
            className="border-2 px-2 rounded-2xl text-sm text-darker-purple "
            ref={divRef}
          >
            {allCount}
          </p>
        </div>

        <div className="overflow-hidden duration-300 border-2 rounded-2xl ml-auto flex flex-row items-center text-md font-semibold">
          <Tooltip
            position="top"
            placement="center"
            gutter={10}
            label={sorting ? "Latest at the top" : "Sort by name, ascending"}
            withArrow
          >
            <div
              onClick={() => setSorting(!sorting)}
              className="group p-3 text-sm hover:bg-darker-purple hover:text-white duration-300 cursor-pointer"
            >
              {sorting ? <Bs.BsSortDown /> : <Bs.BsSortAlphaDown />}
            </div>
          </Tooltip>

          <div className="px-3 py-1 flex flex-row items-center border-l-2 ">
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
              className="font-normal hover:border-darker-purple text-main-black hover:bg-darker-purple hover:text-white cursor-pointer peer-focus:opacity-100 opacity-0 duration-300 w-1 peer-focus:w-20 overflow-hidden border-2 px-1 items-center flex justify-center rounded-3xl"
            >
              Update
            </div>
            <Tooltip
              position="top"
              placement="end"
              gutter={15}
              label="at least 3 characters"
              opened={moreThanTwo}
            ></Tooltip>
          </div>
        </div>
      </div>
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
            .sort((a, b) =>
              sorting
                ? a.code > b.code
                  ? 1
                  : b.code > a.code
                  ? -1
                  : 0
                : new Date(b.date) - new Date(a.date)
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
          >
            {posts &&
              posts
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
                  <EmoteComponent
                    key={index}
                    data={data}
                    editingSet={editingSet}
                    isMod={isMod}
                    kekRef={divRef}
                  />
                ))}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}
