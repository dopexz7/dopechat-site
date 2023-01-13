import React, { MouseEventHandler, useState } from "react";
import FileDrop from "../FileDrop";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Ri from "react-icons/ri";
import { Tabs, Modal } from "@mantine/core";
import UploadFileFirst from "./UploadFileFirst";

const LeftSideModal = ({coolClass} : {coolClass?: any}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggle: MouseEventHandler<HTMLDivElement> = (): void => {
    setVisible(!visible);
  };
  const [activeTab, setActiveTab] = useState<string | null>("uploadfiles");
  return (
    <>
      <div
        onClick={toggle}
        className={coolClass ? coolClass : "hover:bg-white backdrop-blur-md z-20 border-white border-opacity-50 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"}
      >
        Upload emotes
      </div>
      <Modal
        opened={visible}
        onClose={() => setVisible(false)}
        classNames={{
          modal:
            "text-center rounded-2xl bg-black border-2 border-white border-opacity-5 bg-opacity-90",
        }}
        size="sm"
        centered
      >
        <div className="flex justify-center items-center mb-3">
            <div
              className="text-lg text-black bg-ma-pink p-3 rounded-2xl">
              <Bs.BsEmojiLaughing />
            </div>
          </div>

        <div className="flex flex-col space-y-3 text-white">
          <div>Emote submission</div>
          <div className="opacity-50 text-sm">
            Upload your own emotes daily!
          </div>
        </div>
        <div className="h-80 flex w-full mt-3">
              <div
                className="w-full"
              >
                <Tabs
                  value={activeTab}
                  onTabChange={setActiveTab}
                  variant="outline"
                  radius="sm"
                  classNames={{
                    tab: "text-white text-md !px-6 py-3 w-1/2 rounded-none font-semibold hover:bg-transparent hover:bg-ma-pink duration-300",
                    tabsList: 'rounded-t-2xl overflow-hidden'
                  }}
                >
                  <Tabs.List>
                    <Tabs.Tab
                      className={`${
                        activeTab === "uploadfiles"
                          ? "!bg-white !text-black"
                          : ""
                      }`}
                      value="uploadfiles"
                      icon={<Ai.AiOutlineUpload />}
                    >
                      Upload files
                    </Tabs.Tab>
                    <Tabs.Tab
                      className={`${
                        activeTab === "dragndrop"
                          ? "!bg-white !text-black"
                          : ""
                      }`}
                      value="dragndrop"
                      icon={<Ri.RiDragDropFill />}
                    >
                      Drag & drop
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="uploadfiles" pt="xs">
                      <UploadFileFirst />
                  </Tabs.Panel>
                  <Tabs.Panel value="dragndrop" pt="xs">
                      <FileDrop />
                  </Tabs.Panel>
                </Tabs>
              </div>
        </div>
        <div className="flex-col flex w-full mt-6">
          <div
            className="px-5 w-full flex flex-row space-x-0 absolute bottom-0 p-3 left-0 right-0"
            key={0}
          >
            <div
              onClick={() => setVisible(false)}
              className="flex uppercase overflow-hidden relative duration-300 bg-white px-10 text-black cursor-pointer py-3 hover:bg-ma-pink rounded-3xl items-center justify-center font-bold w-full before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl"
              >
              Cancel
            </div>

          </div>
        </div>
      </Modal>
    </>
  );
}
export default LeftSideModal;