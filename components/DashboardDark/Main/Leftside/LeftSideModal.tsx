import React, { MouseEventHandler, useState } from "react";
import FileDrop from "../FileDrop";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Ri from "react-icons/ri";
import { Stepper, Tabs, Modal } from "@mantine/core";
import UploadFileFirst from "./UploadFileFirst";
import { motion } from "framer-motion";

const LeftSideModal = ({coolClass} : {coolClass?: any}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [seeFileUpload, setSeeFileUpload] = useState<boolean>(false);

  const toggle: MouseEventHandler<HTMLDivElement> = (): void => {
    setVisible(!visible);
  };

  const iconVariant: any = {
    hover: {
      scale: 1.05,
      rotate: 360,
    },
    transition: {
      yoyo: 1,
    },
  };
  const [activeTab, setActiveTab] = useState<string | null>("uploadfiles");
  return (
    <>
      <div
        onClick={toggle}
        className={coolClass ? coolClass : "hover:bg-white backdrop-blur-md z-20 border-white border-opacity-50 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"}
        //className="hover:bg-white backdrop-blur-md z-20 border-white border-opacity-50 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"
      >
        Upload emotes
      </div>
      <Modal
        opened={visible}
        onClose={() => setVisible(false)}
        classNames={{
          root: "backdrop-blur-2xl",
          modal:
            "text-center rounded-lg bg-header-bg bg-main-purple bg-blend-multiply ",
        }}
        size="sm"
        centered
      >
        <div className="flex justify-center items-center mb-3">
          <motion.div
            variants={seeFileUpload ? iconVariant : ""}
            whileInView="hover"
            className="text-lg !text-main-purple bg-border-white p-4 rounded-2xl"
          >
            <Bs.BsEmojiLaughing />
          </motion.div>
        </div>

        <div className="flex flex-col space-y-3 text-white">
          <div>Emote submission</div>
          <div className="opacity-50 text-sm">
            Upload your own emotes daily!
          </div>
        </div>
        <div className="h-80 flex w-full mt-3">
          {seeFileUpload ? (
            <>
              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Tabs
                  value={activeTab}
                  onTabChange={setActiveTab}
                  variant="pills"
                  radius="sm"
                  classNames={{
                    tab: "text-white text-md px-6 py-3 w-1/2 font-semibold hover:bg-transparent hover:scale-90 duration-300",
                  }}
                >
                  <Tabs.List>
                    <Tabs.Tab
                      className={`${
                        activeTab === "uploadfiles"
                          ? "!bg-white !text-main-purple"
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
                          ? "!bg-white !text-main-purple"
                          : ""
                      }`}
                      value="dragndrop"
                      icon={<Ri.RiDragDropFill />}
                    >
                      Drag & drop
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="uploadfiles" pt="xs">
                    <motion.div
                      initial={{ opacity: 0.5, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.5 }}
                    >
                      <UploadFileFirst />
                    </motion.div>
                  </Tabs.Panel>
                  <Tabs.Panel value="dragndrop" pt="xs">
                    <motion.div
                      initial={{ opacity: 0.5, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0.5 }}
                    >
                      <FileDrop />
                    </motion.div>
                  </Tabs.Panel>
                </Tabs>
              </motion.div>
            </>
          ) : (
            <>
              <div className="m-auto">
                <Stepper
                  active={0}
                  orientation="vertical"
                  classNames={{
                    root: "m-auto",
                    separator: "bg-accent-purple",
                    stepIcon: "!border-accent-purple",
                    stepCompletedIcon: "!bg-accent-purple rounded-full",
                    stepLabel: "text-white",
                    stepDescription:
                      "text-white text-base m-auto font-semibold",
                  }}
                  styles={{
                    stepIcon: {
                      backgroundColor: "var(--main-purple) !important",
                      color: "white",
                    },
                  }}
                  size="md"
                >
                  <Stepper.Step description="Upload emotes." />
                  <Stepper.Step description="Get aproved." />
                  <Stepper.Step description="Use your emotes." />
                </Stepper>
              </div>
            </>
          )}
        </div>
        <div className="flex-col flex w-full mt-6">
          <div
            className="w-full flex flex-row space-x-3 absolute bottom-0 p-3 left-0 right-0"
            key={0}
          >
            <div
              onClick={() => setVisible(false)}
              className="group hover:bg-white border-white border-opacity-5 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"
            >
              <span className="opacity-75 font-normal group-hover:opacity-100">
                Cancel
              </span>
            </div>

            <div
              onClick={() => setSeeFileUpload(!seeFileUpload)}
              className={`${
                seeFileUpload
                  ? "bg-white hover:bg-darker-purple hover:text-white"
                  : "hover:bg-white text-white hover:text-main-purple"
              } border-white border-opacity-50 shadow-2xl  duration-300 border-2 font-normal  cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full`}
            >
              {seeFileUpload ? "Back" : "Start"}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default LeftSideModal;