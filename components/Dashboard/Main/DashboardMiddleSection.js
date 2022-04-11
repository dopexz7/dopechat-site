import InfiniteScroll from "react-infinite-scroll-component";

import { Tooltip } from "@mantine/core";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";
export default function DashboardMiddleSection({ session, data, editingSet }) {
  const [blogs, setBlogs] = useState(null);
  const [q, setQ] = useState("");
  const [startUpdate, setStartUpdate] = useState(false);
  const [posts, setPosts] = useState(data);
  const [sorting, setSorting] = useState(false);
  const getMorePost = async () => {
    try {
      const kekl = posts.length + 12;
      let { data, error } = await supabase
        .from("allemotes")
        .select("*")
        .range(posts.length, kekl)
        .order("code", { ascending: true });
      const newPosts = data;
      setPosts((post) => [...post, ...newPosts]);
    } catch (e) {
      console.log(e);
    }
  };
  const [moreThanTwo, setMoreThanTwo] = useState(false);
  const beginUpdate = async () => {
    try {
      let { data, error } = await supabase
        .from("allemotes")
        .select("*")
        .order("code", { ascending: true });
      setBlogs(data);
      console.log(blogs);
      if (q.length > 2) {
        setStartUpdate(true);
        setMoreThanTwo(false);
      } else {
        setStartUpdate(false);
        setMoreThanTwo(true);
        setTimeout(() => {
          setMoreThanTwo(false);
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const EmoteComponent = ({ data }) => {
    return (
      <div
        className={`h-32 w-32 group duration-300 bg-accent-white rounded-md select-none`}
      >
        <div className="w-full h-32 overflow-hidden text-black flex flex-row justify-center relative border-2 rounded-md">
          <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
            <Image
              height={64}
              width={64}
              className={`group-hover:scale-50 group-hover:opacity-25 duration-300`}
              src={`https://res.cloudinary.com/demo/image/fetch/${data.src}`}
              alt={data.code}
            />
          </div>

          <div
            className={`w-full relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className=" overflow-hidden text-sm font-normal">
                {data.code}
              </div>
              <div className="text-xs">by {data.by ? data.by : "dope"}</div>
            </div>
            <div className="flex flex-row">
              {session && editingSet ? (
                <div
                  onClick={() => addToSet(data)}
                  className="approve flex items-center justify-center w-full hover:rounded-2xl p-1 text-white text-xs cursor-pointer duration-300 h-full"
                >
                  <Md.MdAddCircleOutline className="mr-1" />{" "}
                  {mod ? "" : `${editingSet}'s set`}
                </div>
              ) : (
                ""
              )}
              {mod ? (
                <div
                  onClick={() => deleteFromDb(data)}
                  className="remove w-full flex items-center justify-center hover:rounded-2xl p-0.5 text-center text-white text-xs cursor-pointer duration-300 h-full"
                >
                  <Md.MdRemoveCircleOutline />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [mod, setMod] = useState(false);
  const checkMod = async () => {
    let { data: mods, error } = await supabase
      .from("mods")
      .select("*")
      .eq("name", session?.user.user_metadata.name);
    if (mods.length) return true;
    return false;
  };

  const deleteFromDb = async (v) => {
    const { lulerz, error } = await supabase
      .from("allemotes")
      .delete()
      .eq("code", v.code);
    setPosts(data);
  };

  const addToSet = async (d) => {
    let { data: useremotes, erro } = await supabase
      .from("useremotes")
      .select("emotes")
      .eq("name", editingSet);
    const arr = useremotes[0].emotes;

    arr.push(d);
    const { data, error } = await supabase
      .from("useremotes")
      .update({ emotes: arr })
      .eq("name", editingSet);
  };

  useEffect(() => {
    checkMod().then((res) => {
      setMod(res);
    });
  }, [session, mod, data]);

  return (
    <>
      <div className="px-6 py-5  border-b-2 flex flex-row items-center">
        <div className="font-normal text-lg flex-1 max-w-xs">All emotes</div>

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
      {startUpdate && q.length > 2 ? (
        <div className="overflow-y-scroll overflow-x-hidden w-full grid xgrd gap-3 p-6">
          {blogs
            .filter((val) => {
              if (q === "") {
                return val;
              } else if (val.code.toLowerCase().includes(q.toLowerCase())) {
                return val;
              }
            })
            .map((data, index) => <EmoteComponent key={index} data={data} />)
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
                  <EmoteComponent key={index} data={data} />
                ))}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}
