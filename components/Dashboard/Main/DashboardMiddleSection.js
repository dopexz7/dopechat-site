import InfiniteScroll from "react-infinite-scroll-component";

import { Tooltip } from "@mantine/core";
import * as Md from "react-icons/md";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";

export default function DashboardMiddleSection({ session, data }) {
  // const [posts, setPosts] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [pl, setPl] = useState(false);
  const [q, setQ] = useState("");
  const [startUpdate, setStartUpdate] = useState(false);

  const [posts, setPosts] = useState(data);

  const getMorePost = async () => {
    try {
      const kekl = posts.length + 12;
      const res = await fetch(
        "https://emxllayyisdskjtscvck.supabase.co/rest/v1/allemotes?select=*",
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwODgxNDMsImV4cCI6MTk2MjY2NDE0M30.-AGqiBqpHvuSGzlp3WPLwBfrUXu7hk0wl5OkH9AQjvI",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzA4ODE0MywiZXhwIjoxOTYyNjY0MTQzfQ.A4onJm_IC2wRv1ATjlSGzI62msRjZ8V3p0KeL9I3bQg",
            Range: `${posts.length}-${kekl}`,
          },
        }
      );
      const newPosts = await res.json();
      setPosts((post) => [...post, ...newPosts]);
    } catch (e) {
      console.log(e);
    }
  };

  const [moreThanTwo, setMoreThanTwo] = useState(false);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, []);

  const beginUpdate = async () => {
    try {
      const kekres = await fetch(
        "https://emxllayyisdskjtscvck.supabase.co/rest/v1/allemotes?select=*",
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwODgxNDMsImV4cCI6MTk2MjY2NDE0M30.-AGqiBqpHvuSGzlp3WPLwBfrUXu7hk0wl5OkH9AQjvI",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzA4ODE0MywiZXhwIjoxOTYyNjY0MTQzfQ.A4onJm_IC2wRv1ATjlSGzI62msRjZ8V3p0KeL9I3bQg",
          },
        }
      );
      const allEms = await kekres.json();
      setBlogs(allEms);
      if (q.length > 2) {
        setStartUpdate(true);
        setMoreThanTwo(false);
      } else {
        setStartUpdate(false);
        setMoreThanTwo(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="px-6 py-5  border-b-2 flex flex-row items-center">
        <div className="font-normal text-lg flex-1 max-w-xs">All emotes</div>

        <div className="overflow-hidden duration-300 border-2 px-3 py-1 rounded-2xl ml-auto flex flex-row items-center text-md font-semibold">
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
            className="hover:border-darker-purple text-main-black hover:bg-darker-purple hover:text-white cursor-pointer peer-focus:opacity-100 opacity-0 duration-300 w-1 peer-focus:w-20 overflow-hidden border-2 px-1 items-center flex justify-center rounded-3xl"
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
            .map((data, index) => (
              <div
                key={index}
                className="h-32 w-32 group duration-300 bg-accent-white rounded-md"
              >
                <div className="w-full h-32 overflow-hidden text-black flex flex-row items-center justify-center relative border-2 rounded-md">
                  <img
                    className="absolute w-16 duration-300 group-hover:w-36 group-hover:opacity-25"
                    src={data.src}
                    alt=""
                  />
                  <div className="duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 justify-center items-center">
                    <div className="overflow-hidden text-sm font-normal ">
                      {data.code}
                    </div>
                    <div className="text-xs ">by {data.by}</div>
                    {session ? (
                      <div className="text-xs mt-1 bg-darker-purple rounded-3xl items-center justify-center p-1 flex flex-row text-white hover:bg-white hover:text-darker-purple duration-300 font-normal cursor-pointer">
                        <Md.MdAddCircleOutline className="mr-1" /> add to
                        channel
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
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
            {(posts &&
              posts.map((data, index) => (
                <div
                  key={index}
                  className="h-32 w-32 group duration-300 bg-accent-white rounded-md"
                >
                  <div className="w-full h-32 overflow-hidden text-black flex flex-row items-center justify-center relative border-2 rounded-md">
                    <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
                      <Image
                        height={64}
                        width={64}
                        className="group-hover:scale-50 group-hover:opacity-25 duration-300"
                        src={`https://res.cloudinary.com/demo/image/fetch/${data.src}`}
                        alt={data.code}
                      />
                    </div>

                    <div className="duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 justify-center items-center">
                      <div className="overflow-hidden text-sm font-normal ">
                        {data.code}
                      </div>
                      <div className="text-xs ">by {data.by}</div>
                      {session ? (
                        <div className="text-xs mt-1 bg-darker-purple rounded-3xl items-center justify-center p-1 flex flex-row text-white hover:bg-white hover:text-darker-purple duration-300 font-normal cursor-pointer">
                          <Md.MdAddCircleOutline className="mr-1" /> add to
                          channel
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))) || (
              <>
                <Skeleton
                  height={125}
                  count={6}
                  width={125}
                  baseColor="#e5e7eb"
                  highlightColor="#f9fafb"
                />
                <Skeleton
                  height={125}
                  count={6}
                  width={125}
                  baseColor="#e5e7eb"
                  highlightColor="#f9fafb"
                />
                <Skeleton
                  height={125}
                  count={6}
                  width={125}
                  baseColor="#e5e7eb"
                  highlightColor="#f9fafb"
                />
                <Skeleton
                  height={125}
                  count={6}
                  width={125}
                  baseColor="#e5e7eb"
                  highlightColor="#f9fafb"
                />
                <Skeleton
                  height={125}
                  count={6}
                  width={125}
                  baseColor="#e5e7eb"
                  highlightColor="#f9fafb"
                />
                <Skeleton
                  height={125}
                  count={6}
                  width={125}
                  baseColor="#e5e7eb"
                  highlightColor="#f9fafb"
                />
              </>
            )}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}
