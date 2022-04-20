import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import RequestSet from "./RequestSet";
import RequestStream from "./RequestStream";

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
