import useIsDonor from "../../../../funcs/useIsDonor";
import * as Md from "react-icons/md";
import * as Go from "react-icons/go";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../contexts/AppContext";
const EditorSet = ({ data, editingSet, passProps }) => {
  const [avatar, setAvatar] = useState();
  const { user } = useAuth();
  const isDonor = useIsDonor(user?.user_metadata.name);
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
      <div className="flex h-full items-center justify-center w-max flex-col relative overflow-hidden p-0">
        {data.name !== "global" ? (
          <img src={avatar} alt={data.name} className="w-20 h-full" />
        ) : (
          <div className="font-semibold text-main-purple w-24 text-center">
            global
          </div>
        )}

        <div className="text-[10px] w-11/12 text-center absolute bottom-0 bg-darker-purple font-medium py-0.25 rounded-tl-3xl self-end text-main-white">
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
      <div className="w-max flex flex-row justify-center items-center space-x-3 p-6 h-full bg-accent-purple bg-header-bg bg-blend-multiply">
        <div
          title="Select set"
          onClick={() =>
            editingSet === data?.name ? passProps() : passProps(data?.name)
          }
          className={` ${
            editingSet === data?.name
              ? "bg-white text-main-purple rounded-xl"
              : "text-white rounded-xl bg-darker-purple hover:bg-main-purple hover:text-white hover:rounded-3xl"
          }  cursor-pointer p-3  justify-center duration-300 flex items-center w-max `}
        >
          {editingSet === data?.name ? <Md.MdCheck /> : <Md.MdAdd />}
        </div>
        <Link href={`/dashboard/set/${data?.name}`} passHref>
          <a
            title="View full set"
            className="text-white rounded-xl bg-darker-purple hover:bg-main-purple hover:text-white hover:rounded-3xl cursor-pointer   p-3  justify-center duration-300 flex items-center w-max"
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

export default EditorSet;
