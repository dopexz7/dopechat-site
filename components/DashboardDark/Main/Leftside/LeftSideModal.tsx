import React, { MouseEventHandler, useState } from "react";
import FileDrop from "../FileDrop";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Ri from "react-icons/ri";
import { Stepper, Tabs, Modal } from "@mantine/core";
import UploadFileFirst from "./UploadFileFirst";
import { motion } from "framer-motion";
import StyledTabs from "../../../Misc/StyledTabs";
import { FC } from "react";
const LeftSideModal:FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [seeFileUpload, setSeeFileUpload] = useState<boolean>(false);

  const toggle: MouseEventHandler<HTMLDivElement> = (): void => {
    setVisible(!visible);
  };

  const iconVariant: any = {
    hover : {
      scale: 1.05,
      rotate: 360,
    },
    transition: {
      yoyo: 1,
    },
  };
  return (
    <>
      <div
        onClick={toggle}
        className="hover:bg-white backdrop-blur-md z-20 border-white border-opacity-50 shadow-2xl text-white duration-300 border-2 font-normal hover:text-main-purple cursor-pointer flex justify-center items-center p-3 rounded-3xl w-full"
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
              <StyledTabs>
                <Tabs.Tab label="Upload files" icon={<Ai.AiOutlineUpload />}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <UploadFileFirst />
                  </motion.div>
                </Tabs.Tab>
                <Tabs.Tab label="Drag & drop" icon={<Ri.RiDragDropFill />}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FileDrop />
                  </motion.div>
                </Tabs.Tab>
              </StyledTabs>
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