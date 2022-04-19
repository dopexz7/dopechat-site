import { useState } from "react";

import * as Md from "react-icons/md";
import useHasEdits from "../../../../funcs/useHasEdits";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AppContext";
export default function YourEmoteSets(props) {
  const [editingSet, setEditingSet] = useState("");
  const { user } = useAuth();
  //const [availEdits, setAvailEdits] = useState([]);
  const availEdits = useHasEdits(user.user_metadata.name);

  const EditorSet = ({ data }) => {
    return (
      <div className="space-x-1 flex flex-row p-0 items-center justify-center bg-white w-full rounded-3xl">
        <div className="flex h-full flex-col items-center justify-center mr-auto p-4 text-sm border-4 rounded-l-2xl">
          <div className="font-semibold text-main-purple">
            {data.name}&apos;s set
          </div>
          <div className="text-xs">{data?.emotes?.length} emotes</div>
        </div>
        <Link href={`/dashboard/set/${data?.name}`} passHref>
          <div className="w-1/2 hover:border-main-purple hover:bg-main-purple cursor-pointer hover:text-white duration-300 text-xs border-2 p-3 text-center rounded-2xl">
            View full set
          </div>
        </Link>

        <div
          onClick={() =>
            editingSet === data?.name ? passProps() : passProps(data?.name)
          }
          className={` ${
            editingSet === data?.name
              ? "bg-main-purple text-white"
              : "text-darker-purple bg-white hover:bg-main-purple hover:text-white"
          }  cursor-pointer h-full p-6 rounded-r-2xl border-4 duration-300 flex items-center`}
        >
          <div className="p-1">
            {editingSet === data?.name ? <Md.MdCheck /> : <Md.MdAdd />}
          </div>
        </div>
      </div>
    );
  };

  const passProps = (d) => {
    setEditingSet(d);
    props.onSuccess(d);
  };
  // const getStreamerImg = async (d) => {
  //   let strmimg = await fetch(
  //     `https://api.frankerfacez.com/v1/user/${d.toLowerCase()}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => data.user.avatar);
  //   return strmimg;
  // };

  return (
    <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
      <div className="px-6 py-5 flex flex-row items-center justify-center ">
        <div className="font-normal text-accent-purple  px-6 py-2 text-lg">
          Your emote sets
        </div>
      </div>
      <div className="w-full overflow-y-auto h-full p-6 flex flex-col space-y-3">
        {availEdits?.length ? "" : "You do not have access to any emote sets."}
        {availEdits &&
          availEdits.map((data, index) => (
            <EditorSet key={index} data={data} />
          ))}
      </div>
      {availEdits?.length ? (
        <div className="text-sm flex justify-center p-3 border-t-2 border-white">
          To add emotes to a set, click the + icon to select that set.
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
