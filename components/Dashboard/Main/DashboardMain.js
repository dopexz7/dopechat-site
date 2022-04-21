import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardMiddleSection from "./DashboardMiddleSection";
import YourEmoteSets from "./Rightside/YourEmoteSets";
import { Accordion } from "@mantine/core";
import * as Md from "react-icons/md";
import { useAuth } from "../../../contexts/AppContext";

export default function DashboardMain({ data }) {
  const { user } = useAuth();
  const [editingSet, setEditingSet] = useState("");

  const onEditingSet = (x) => {
    setEditingSet(x);
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="text-black border-r-2 h-full w-[55%] flex flex-col">
        <DashboardMiddleSection
          data={data.slice(0, 36)}
          fullSet={data}
          editingSet={editingSet}
        />
      </div>
      {user ? (
        <YourEmoteSets onSuccess={onEditingSet} />
      ) : (
        <div className="h-full bg-border-white w-1/4 flex flex-col">
          <div
            className="font-normal text-main-black text-sm p-6 flex flex-col
          "
          >
            <p className="text-lg mb-3 text-main-purple">Signed in access:</p>
            <Accordion
              icon={<Md.MdOutlineKeyboardArrowDown />}
              iconPosition="right"
              classNames={{
                item: "bg-accent-white p-1",
                itemOpened: "your-itemOpened-class",
                itemTitle: "your-itemTitle-class",
                control: "your-control-class",
                label: "text-main-black",
                icon: "your-icon-class",
                content: "your-content-class",
                contentInner: "your-contentInner-class",
              }}
            >
              <Accordion.Item label="Emote uploading">
                Be able to upload your own custom emotes easily!
              </Accordion.Item>
              <Accordion.Item label="Emote sets">
                Be able to view and edit (with permission) other users&apos;
                sets!
              </Accordion.Item>
              <Accordion.Item label="Your set sharing">
                Create an emote set, share the code with friends and enjoy
                multiple emote sets together!
              </Accordion.Item>
              <Accordion.Item label="Supporter benefits">
                Support the developers by donating and get cool benefits!
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
