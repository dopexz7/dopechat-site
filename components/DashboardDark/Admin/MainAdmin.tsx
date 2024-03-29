import React, { FC, useEffect, useState } from "react";
import AdminRoute from "../../../contexts/adminRoute";
import DashboardLayout from "../Main/DashboardLayout";
import * as Bi from "react-icons/bi";
import * as Md from "react-icons/md";
import { gettingAdminEmotes } from "funcs/updatingEmotes";
import {
  deletingFromDb,
  insertingNewFile,
  movingToApproved,
  removeFromUploads,
  updateAdminEmotes,
} from "funcs/databaseFuncs";

const MainAdmin: FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    gettingAdminEmotes().then((r: any) => {
      setData(r);
    });
  }, []);

  const deleteFromDb: Function = (v: submitFileTypes): void => {
    deletingFromDb(v); // deleting from database
    removeFromUploads(v); // removing from uploads
    updateAdminEmotes(data, v).then((r: any) => {
      setData(r);
    }); // updating data
  };

  const approveToDb: Function = (v: submitFileTypes): void => {
    movingToApproved(v); // move to approved folder
    deletingFromDb(v); // delete from uploads db
    insertingNewFile(v); // insert into allemotes db
    updateAdminEmotes(data, v).then((r: any) => {
      setData(r);
    }); // update data
  };

  return (
    <DashboardLayout layout="admin">
      <AdminRoute>

        <div className="shadow-sm backdrop-blur-sm border-[1px] rounded-3xl p-1 border-white border-opacity-5 h-full w-full lg:w-[55%] flex flex-col">
          <div className="px-6 py-2 flex flex-row items-center">
            <div className="flex flex-row items-center  text-white">
              <p className="text-xl">User submitted emotes</p>
            </div>
          </div>

          <div className="grid xgrd gap-3 p-6 overflow-y-auto">
            {data &&
              data.map((d, index) => (
                <div
                  key={index}
                  className="h-16 w-16 lg:h-32 lg:w-32 group duration-300 shadow-2xl rounded-3xl select-none"
                >
                  <div className="h-16 lg:h-32 w-full overflow-hidden text-white flex justify-center relative rounded-3xl border-[1px] border-white border-opacity-[0.03]">
                    <div className="group absolute w-full h-full duration-300 flex items-center justify-center">
                      <img
                        height={64}
                        width={64}
                        className="group-hover:scale-50 group-hover:opacity-25 duration-300"
                        src={d.url}
                        alt={d.code}
                      />
                    </div>

                    <div className="w-full  relative duration-300 flex flex-col opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100">
                      <div className="overflow-hidden mt-auto ml-auto mr-auto text-xs lg:text-sm font-normal">
                        {d.name}
                      </div>
                      <div className="hidden lg:block overflow-hidden mt-auto ml-auto mr-auto text-sm font-normal">
                        by {d.uploaded_by}
                      </div>
                      <div className="flex flex-row justify-center items-center mt-auto">
                        <div
                          onClick={() => approveToDb(d)}
                          className="approve flex items-center justify-center w-full hover:rounded-2xl p-1 text-white text-sm cursor-pointer duration-300 h-full"
                        >
                          <Bi.BiCheckCircle />
                        </div>
                        <div
                          onClick={() => deleteFromDb(d)}
                          className="remove w-full flex items-center justify-center hover:rounded-2xl p-1 text-center text-white text-sm  cursor-pointer duration-300 h-full"
                        >
                          <Md.MdRemoveCircleOutline />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </AdminRoute>
    </DashboardLayout>
  );
}

export default MainAdmin;

interface submitFileTypes {
  url: string;
  name: string;
  uploaded_by: string;
  created_at: Date;
}
