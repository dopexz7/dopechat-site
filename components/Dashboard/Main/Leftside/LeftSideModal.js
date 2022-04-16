import React, { useState } from "react";
import FileDrop from "../FileDrop";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Ri from "react-icons/ri";
import { Stepper, Tabs } from "@mantine/core";
import UploadFileFirst from "./UploadFileFirst";
import { Modal } from "@supabase/ui";
import { motion } from "framer-motion";

export default function LeftSideModal({ username }) {
  const [visible, setVisible] = useState(false);
  const [seeFileUpload, setSeeFileUpload] = useState(false);

  function toggle() {
    setVisible(!visible);
  }
  function StyledTabs(props) {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Tabs
          variant="unstyled"
          classNames={{
            tabControl:
              "border-2 group text-main-black text-md px-6 py-3 w-1/2 font-semibold bg-border-white",
            tabActive: "!bg-main-purple !text-white",
            tabInner:
              "group-hover:scale-95 group-hover:opacity-75 duration-300 ",
          }}
          styles={() => ({
            tabControl: {
              "&:first-of-type": {
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              },

              "&:last-of-type": {
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
              },
            },
          })}
          {...props}
        />
      </motion.div>
    );
  }

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
        className="backdrop-blur"
        title={seeFileUpload ? "" : "Emote submission"}
        description={seeFileUpload ? "" : "Submit your own 15 emotes daily!"}
        visible={visible}
        onCancel={toggle}
        onConfirm={toggle}
        footerBackground
        closable
        customFooter={[
          <div className="w-full flex flex-row space-x-3" key={0}>
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
          <div className="text-lg !text-main-purple bg-border-white p-4 rounded-2xl">
            <Bs.BsEmojiLaughing />
          </div>
        }
      >
        {seeFileUpload ? (
          <>
            <StyledTabs>
              <Tabs.Tab label="Upload files" icon={<Ai.AiOutlineUpload />}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <UploadFileFirst username={username} />
                </motion.div>
              </Tabs.Tab>
              <Tabs.Tab label="Drag & drop" icon={<Ri.RiDragDropFill />}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FileDrop username={username} />
                </motion.div>
              </Tabs.Tab>
            </StyledTabs>
          </>
        ) : (
          <>
            <Stepper
              orientation="vertical"
              classNames={{
                root: "ml-auto mr-auto p-6",
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
              size="sm"
            >
              <Stepper.Step
                label="First."
                description="Submit emotes."
              ></Stepper.Step>
              <Stepper.Step
                label="Second."
                description="Get aproved."
              ></Stepper.Step>
              <Stepper.Step
                label="Third."
                description="Use your emotes."
              ></Stepper.Step>
            </Stepper>
          </>
        )}
      </Modal>
    </>
  );
}
