import { useEffect, useState } from "react";
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

export default RequestSet;
