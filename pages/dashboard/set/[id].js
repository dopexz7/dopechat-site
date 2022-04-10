import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/Dashboard/Main/DashboardLayout";
import AuthRoute from "../../../contexts/authRoute";
import { supabase } from "../../../lib/supabaseClient";
import InfiniteScroll from "react-infinite-scroll-component";
import * as Md from "react-icons/md";
import Image from "next/image";
import * as Bi from "react-icons/bi";

export default function Set(props) {
  const [session, setSession] = useState(null);
  const [q, setQ] = useState("");
  const [startUpdate, setStartUpdate] = useState(false);
  const [error, setError] = useState("");
  const [mod, setMod] = useState(false);
  const seeMods = async () => {
    let { data: mods, error } = await supabase
      .from("useremotes")
      .select("mods")
      .eq("name", pageName);
    const availMods = mods[0]?.mods;
    availMods?.forEach((v) => {
      if (v === session.user.user_metadata.name) setMod(true);
    });
  };
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    seeMods();
  }, [session]);

  const router = useRouter();
  const [pageSet, setPageSet] = useState();
  const pageData = props.data;
  const [pageName, setPageName] = useState();
  const { id } = router.query;

  useEffect(() => {
    pageData.map((v) => {
      if (v.name.toLowerCase() === id.toLowerCase()) {
        setPageSet(v.emotes);
        setPageName(v.name);
      }
    });
  }, [props]);
  const beginUpdate = () => {
    if (q.length > 2) {
      setStartUpdate(true);
      setError("");
    } else {
      setError("Type at least 3 letters!");
    }
  };
  const deleteFromSet = async (d) => {
    const newArray = pageSet;
    const finalArray = [];
    newArray.forEach((v) => {
      if (v.code !== d.code) finalArray.push(v);
    });
    setPageSet(finalArray);
    //console.log(finalArray);
    const { data, error } = await supabase
      .from("useremotes")
      .update({ emotes: finalArray })
      .eq("name", pageName);
    //console.log(d.emotes);
  };
  return (
    <AuthRoute>
      <DashboardLayout
        session={session}
        title={`${pageName ? `${pageName}'s set` : "Set doesn't exist"}`}
      >
        <div className="text-black border-r-2 h-full w-[80%] flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b-2 flex flex-row items-center">
            <div className="font-normal text-lg flex-1 max-w-xs">
              {pageName ? `${pageName}'s set` : "Set doesn't exist"}
            </div>

            {error && (
              <div className="mr-auto ml-auto bg-red-500 py-2 px-3 rounded-2xl text-accent-white">
                {error}
              </div>
            )}

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
            </div>
          </div>
          <div className="w-full flex flex-col p-6 overflow-auto">
            <div className="h-full w-full grid grid-cols-11">
              {startUpdate && q.length > 2 ? (
                <>
                  {pageSet
                    .filter((val) => {
                      if (q === "") {
                        return val;
                      } else if (
                        val.code.toLowerCase().includes(q.toLowerCase())
                      ) {
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
                              src={`https://res.cloudinary.com/demo/image/fetch/${data.src}`}
                              alt={data.code}
                            />
                          </div>

                          <div className="w-full  relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                            <div className="overflow-hidden mt-auto ml-auto mr-auto text-sm font-normal">
                              {data.code}
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
                </>
              ) : (
                <>
                  {pageSet &&
                    pageSet.map((data, index) => (
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
                              src={`https://res.cloudinary.com/demo/image/fetch/${data.src}`}
                              alt={data.code}
                            />
                          </div>

                          <div className="w-full  relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                            <div className="overflow-hidden mt-auto ml-auto mr-auto text-sm font-normal">
                              {data.code}
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
                </>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthRoute>
  );
}

export const getServerSideProps = async () => {
  const data = await fetch(
    "https://emxllayyisdskjtscvck.supabase.co/rest/v1/useremotes?select=*",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwODgxNDMsImV4cCI6MTk2MjY2NDE0M30.-AGqiBqpHvuSGzlp3WPLwBfrUXu7hk0wl5OkH9AQjvI",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVteGxsYXl5aXNkc2tqdHNjdmNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzA4ODE0MywiZXhwIjoxOTYyNjY0MTQzfQ.A4onJm_IC2wRv1ATjlSGzI62msRjZ8V3p0KeL9I3bQg",
      },
    }
  ).then((response) => response.json());
  return {
    props: { data },
  };
};
