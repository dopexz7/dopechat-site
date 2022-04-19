import React, { useState } from "react";
import FileDrop from "../FileDrop";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Ri from "react-icons/ri";
import { Stepper, Tabs } from "@mantine/core";
import UploadFileFirst from "./UploadFileFirst";
import { Modal } from "@supabase/ui";
import { motion } from "framer-motion";
import StyledTabs from "../../../Misc/StyledTabs";
export default function LeftSideModal({ username }) {
  const [visible, setVisible] = useState(false);
  const [seeFileUpload, setSeeFileUpload] = useState(false);

  function toggle() {
    setVisible(!visible);
  }

  const stepperVariant = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 1,
        yoyo: Infinity,
      },
    },
  };
  const iconVariant = {
    hover: {
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
        className="group border-2 border-main-purple  bg-main-purple duration-300 cursor-pointer text-white flex justify-center items-center p-3 rounded-xl w-full"
      >
        <span className="opacity-75 font-normal group-hover:opacity-100 duration-300">
          Submit emotes
        </span>
      </div>

      <Modal
        className="backdrop-blur mt-auto mb-auto"
        title={"Emote submission"}
        description={"Submit your own 15 emotes daily!"}
        visible={visible}
        onCancel={toggle}
        onConfirm={toggle}
        footerBackground
        closable
        customFooter={[
          <div
            className="w-full flex flex-row space-x-3 absolute bottom-0 p-3 left-0 right-0"
            key={0}
          >
            <div
              onClick={toggle}
              className="p-2 text-center bg-border-white text-main-black font-medium text-sm rounded cursor-pointer duration-300 w-full"
            >
              Cancel
            </div>

            <div
              onClick={() => setSeeFileUpload(!seeFileUpload)}
              className="p-2 text-center bg-main-purple text-white font-medium text-sm rounded cursor-pointer duration-300 w-full"
              style={{ background: "var(--main-purple)" }}
            >
              {seeFileUpload ? "Back" : "Start"}
            </div>
          </div>,
        ]}
        layout="vertical"
        size="small"
        contentStyle={{
          background: "transparent !important",
        }}
        icon={
          <motion.div
            variants={seeFileUpload ? iconVariant : ""}
            whileInView="hover"
            className="text-lg !text-main-purple bg-border-white p-4 rounded-2xl"
          >
            <Bs.BsEmojiLaughing />
          </motion.div>
        }
      >
        <div className="h-80 flex w-full">
          {seeFileUpload ? (
            <>
              <StyledTabs>
                <Tabs.Tab label="Upload files" icon={<Ai.AiOutlineUpload />}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <UploadFileFirst username={username} />
                  </motion.div>
                </Tabs.Tab>
                <Tabs.Tab label="Drag & drop" icon={<Ri.RiDragDropFill />}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FileDrop username={username} />
                  </motion.div>
                </Tabs.Tab>
              </StyledTabs>
            </>
          ) : (
            <>
              <motion.div
                //initial={{ opacity: 0, x: -50 }}
                variants={stepperVariant}
                whileInView="hover"
                className="m-auto"
              >
                <Stepper
                  orientation="vertical"
                  classNames={{
                    root: "m-auto",
                    separator: "bg-accent-purple",
                    stepIcon: "!border-accent-purple",
                    stepCompletedIcon: "!bg-accent-purple rounded-full",
                    stepLabel: "text-black",
                    stepDescription: "text-main-black",
                  }}
                  styles={{
                    stepIcon: {
                      backgroundColor: "var(--main-purple) !important",
                      color: "white",
                    },
                  }}
                  size="md"
                >
                  <Stepper.Step label="First." description="Submit emotes." />
                  <Stepper.Step label="Second." description="Get aproved." />
                  <Stepper.Step label="Third." description="Use your emotes." />
                </Stepper>
              </motion.div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
