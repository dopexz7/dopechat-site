import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import * as Md from "react-icons/md";
import Link from "next/link";
export default function YourEmoteSets(props) {
  const [editingSet, setEditingSet] = useState("");
  const [availEdits, setAvailEdits] = useState([]);
  const seeMods = async () => {
    let { data: mods, error } = await supabase.from("useremotes").select("*");
    if (error) console.log(error);
    mods?.forEach((v) => {
      if (v.mods?.includes(props.session?.user?.user_metadata.name)) {
        setAvailEdits((prevState) => [...prevState, v]);
      }
    });
  };

  useEffect(() => {
    seeMods();
  }, [props.session]);

  const passProps = (d) => {
    setEditingSet(d);
    props.onSuccess(d);
  };
  return (
    <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
      <div className="px-6 py-5 flex flex-row items-center justify-center ">
        <div className="font-normal text-accent-purple  px-6 py-2 rounded-2xl  text-lg">
          Your emote sets
        </div>
      </div>
      <div className="w-full overflow-y-auto h-full p-6 flex flex-col space-y-3">
        {availEdits.length ? "" : "You do not have access to any emote sets."}
        {availEdits &&
          availEdits.map((data, index) => (
            <div
              key={index}
              className="space-x-1 flex flex-row p-0 items-center justify-center bg-white w-full rounded-3xl"
            >
              <div className="flex h-full flex-col items-center justify-center mr-auto p-4 text-sm border-4 rounded-l-2xl">
                <div className="font-semibold text-main-purple">
                  {data.name}&apos;s set
                </div>
                <div className="text-xs">{data.emotes.length} emotes</div>
              </div>
              <Link href={`/dashboard/set/${data.name}`} passHref>
                <div className="w-1/2 hover:border-main-purple hover:bg-main-purple cursor-pointer hover:text-white duration-300 text-xs border-2 p-3 text-center rounded-2xl">
                  View full set
                </div>
              </Link>

              <div
                onClick={() =>
                  editingSet === data.name ? passProps() : passProps(data.name)
                }
                className={` ${
                  editingSet === data.name
                    ? "bg-main-purple text-white"
                    : "text-darker-purple bg-white hover:bg-main-purple hover:text-white"
                }  cursor-pointer h-full p-6 rounded-r-2xl border-4 duration-300`}
              >
                <div className="p-1">
                  {editingSet === data.name ? <Md.MdCheck /> : <Md.MdAdd />}
                </div>
              </div>
            </div>
          ))}
      </div>
      {availEdits.length ? (
        <div className="text-sm flex justify-center p-3 border-t-2 border-white">
          To add emotes to a set, click the + icon to select that set.
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
