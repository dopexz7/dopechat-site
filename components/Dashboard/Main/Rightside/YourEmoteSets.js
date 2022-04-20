import { useEffect, useState } from "react";

import * as Md from "react-icons/md";
import * as Go from "react-icons/go";
import useHasEdits from "../../../../funcs/useHasEdits";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AppContext";
import useIsDonor from "../../../../funcs/useIsDonor";

const EditorSet = ({ data, editingSet, passProps }) => {
  const [avatar, setAvatar] = useState();
  const { user } = useAuth();
  const isDonor = useIsDonor(user.user_metadata.name);
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

  return (
    <div
      className={`flex flex-row p-0 items-center shadow-xl bg-white ${
        editingSet === data.name ? "rounded-2xl" : "rounded"
      } duration-300 w-max self-center   overflow-hidden`}
    >
      <div className="flex h-full items-center justify-center w-max flex-col relative  overflow-hidden p-0 text-sm ">
        {data.name !== "global" ? (
          <img src={avatar} alt={data.name} className="w-20 h-20" />
        ) : (
          <div className="font-semibold text-main-purple w-20 text-center">
            global
          </div>
        )}

        <div className="text-xs absolute bottom-0  bg-white bg-opacity-80 font-bold px-1 py-0.5 rounded-t-xl">
          {data?.emotes ? data?.emotes.length : "0"}
          {data.name !== "global"
            ? data?.streamer
              ? "/250"
              : data?.name === user?.user_metadata.name
              ? isDonor
                ? "/10"
                : "/5"
              : ""
            : ""}
        </div>
      </div>
      <div className="w-max flex flex-row justify-center items-center space-x-3 p-3 h-full bg-accent-purple bg-header-bg bg-blend-multiply">
        <div
          title="Select set"
          onClick={() =>
            editingSet === data?.name ? passProps() : passProps(data?.name)
          }
          className={` ${
            editingSet === data?.name
              ? "bg-white text-main-purple rounded-xl"
              : "text-white rounded-xl bg-darker-purple hover:bg-white hover:text-main-purple hover:rounded-3xl"
          }  cursor-pointer p-3  justify-center duration-300 flex items-center w-max `}
        >
          {editingSet === data?.name ? <Md.MdCheck /> : <Md.MdAdd />}
        </div>
        <Link href={`/dashboard/set/${data?.name}`} passHref>
          <a
            title="View full set"
            className="text-white rounded-xl bg-darker-purple hover:bg-white hover:text-main-purple hover:rounded-3xl cursor-pointer   p-3  justify-center duration-300 flex items-center w-max"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Go.GoLinkExternal />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default function YourEmoteSets(props) {
  const [editingSet, setEditingSet] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const availEdits = useHasEdits(user?.user_metadata.name);

  const passProps = (d) => {
    setEditingSet(d);
    props.onSuccess(d);
  };

  return (
    <div className="text-black bg-border-white h-full w-1/4 flex flex-col">
      <div className="px-6 py-5 flex flex-row items-center justify-center ">
        <div className="font-normal text-accent-purple  px-6 py-2 text-lg">
          Your emote sets
        </div>
      </div>
      <div className="w-full overflow-y-auto h-full p-6 flex flex-col space-y-3 justify-center">
        {!availEdits && !loading
          ? "You do not have access to any emote sets."
          : ""}
        {availEdits?.length ? "" : ""}
        {availEdits &&
          availEdits.map((data, index) => (
            <EditorSet
              key={index}
              data={data}
              passProps={passProps}
              editingSet={editingSet}
            />
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
