import React, { useEffect, useState } from "react";
import * as Md from "react-icons/md";
import { supabase } from "../../../lib/supabaseClient";

const RequestSet = ({ data }) => {
  const [avatar, setAvatar] = useState();
  const [action, setAction] = useState(false);
  const getStreamerImg = async (d) => {
    await fetch(`https://api.frankerfacez.com/v1/user/${d.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setAvatar(data?.user?.avatar));
  };

  useEffect(() => {
    if (data.name !== "global") {
      getStreamerImg(data.name);
    }
  }, [data]);

  const approveSet = async (d) =>
    await supabase
      .from("useremotes")
      .insert([{ name: d, emotes: [], mods: [d] }])
      .then(async () => {
        setAction(true);
        await supabase.from("requested_sets").delete().eq("name", d);
      });
  const deleteSet = async (d) =>
    await supabase
      .from("requested_sets")
      .delete()
      .eq("name", d)
      .then(() => {
        setAction(true);
      });

  return (
    <>
      {!action ? (
        <div
          className={`flex flex-row p-0 items-center shadow-xl bg-white rounded
       duration-300 w-max self-center  overflow-hidden`}
        >
          <div className="flex h-full items-center justify-center w-max flex-col relative overflow-hidden p-0">
            <img src={avatar} alt={data.name} className="w-20 h-full" />

            <div className="text-[10px] w-11/12 text-center absolute bottom-0 bg-darker-purple font-medium py-0.25 rounded-tl-3xl self-end text-main-white">
              {data?.name}
            </div>
          </div>
          <div className="w-max flex flex-row justify-center items-center space-x-3 p-6 h-full bg-accent-purple bg-header-bg bg-blend-multiply">
            <div
              onClick={() => approveSet(data.name)}
              className={` 
              text-white rounded-xl bg-darker-purple hover:bg-main-purple hover:text-white hover:rounded-3xl
           cursor-pointer p-3  justify-center duration-300 flex items-center w-max `}
            >
              <Md.MdCheck />
            </div>

            <div
              onClick={() => deleteSet(data.name)}
              className="text-white rounded-xl bg-darker-purple hover:bg-main-purple hover:text-white hover:rounded-3xl cursor-pointer   p-3  justify-center duration-300 flex items-center w-max"
            >
              <Md.MdOutlineRemoveCircleOutline />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const RequestStream = ({ data }) => {
  const [avatar, setAvatar] = useState();
  const [action, setAction] = useState(false);
  const getStreamerImg = async (d) => {
    await fetch(`https://api.frankerfacez.com/v1/user/${d.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setAvatar(data?.user?.avatar));
  };

  useEffect(() => {
    if (data.name !== "global") {
      getStreamerImg(data.name);
    }
  }, [data]);

  const approveToStreamer = async (d) =>
    await supabase
      .from("useremotes")
      .update({ streamer: true })
      .eq("name", d)
      .then(async () => {
        await supabase.from("request_streamer").delete().eq("name", d);
        setAction(true);
      });
  const notApprove = async (d) =>
    await supabase
      .from("request_streamer")
      .delete()
      .eq("name", d)
      .then(async () => {
        await supabase
          .from("useremotes")
          .update({ requested_streamer: false })
          .eq("name", d.name);
        setAction(true);
      });

  return (
    <>
      {!action ? (
        <div
          className={`flex flex-row p-0 items-center shadow-xl bg-white rounded
       duration-300 w-max self-center  overflow-hidden`}
        >
          <div className="flex h-full items-center justify-center w-max flex-col relative overflow-hidden p-0">
            <img src={avatar} alt={data.name} className="w-20 h-full" />

            <div className="text-[10px] w-11/12 text-center absolute bottom-0 bg-darker-purple font-medium py-0.25 rounded-tl-3xl self-end text-main-white">
              {data?.name}
            </div>
          </div>
          <div className="w-max flex flex-row justify-center items-center space-x-3 p-6 h-full bg-accent-purple bg-header-bg bg-blend-multiply">
            <div
              onClick={() => approveToStreamer(data.name)}
              className={` 
              text-white rounded-xl bg-darker-purple hover:bg-main-purple hover:text-white hover:rounded-3xl
           cursor-pointer p-3  justify-center duration-300 flex items-center w-max `}
            >
              <Md.MdCheck />
            </div>

            <div
              onClick={() => notApprove(data.name)}
              className="text-white rounded-xl bg-darker-purple hover:bg-main-purple hover:text-white hover:rounded-3xl cursor-pointer   p-3  justify-center duration-300 flex items-center w-max"
            >
              <Md.MdOutlineRemoveCircleOutline />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default function AdminRight() {
  const [availEdits, setAvailEdits] = useState([]);
  const [availStream, setAvailStream] = useState([]);
  const getRequestedSets = async () => {
    let { data: requestedSets, error } = await supabase
      .from("requested_sets")
      .select("*");
    if (error) console.log(error);
    return requestedSets;
  };
  const getRequestedStreamers = async () => {
    let { data: requestedStream, error } = await supabase
      .from("request_streamer")
      .select("*");
    if (error) console.log(error);
    return requestedStream;
  };
  useEffect(() => {
    getRequestedSets().then((res) => {
      setAvailEdits(res);
    });
    getRequestedStreamers().then((res) => {
      setAvailStream(res);
    });
  }, []);
  return (
    <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
      <div className="px-6 py-6 font-normal text-lg flex flex-row items-center">
        Pending emote sets
      </div>

      <div className="w-full overflow-y-auto h-1/2 border-b-2 border-main-white p-6 flex flex-col space-y-3 items-center">
        <div>Requested an emote set</div>
        {availEdits &&
          availEdits.map((data, index) => (
            <RequestSet key={index} data={data} />
          ))}
      </div>
      <div className="w-full overflow-y-auto h-1/2 p-6 flex flex-col space-y-3 items-center">
        <div>Requested to be promoted to streamer</div>
        {availStream &&
          availStream.map((data, index) => (
            <RequestStream key={index} data={data} />
          ))}
      </div>
    </div>
  );
}
