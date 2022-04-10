import React, { useEffect, useState } from "react";
import * as Bs from "react-icons/bs";
import * as Md from "react-icons/md";
import * as Io from "react-icons/io5";
import { Modal, Tabs, Tooltip } from "@mantine/core";
import FileDrop from "../FileDrop";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { Stepper } from "@mantine/core";

const DashboardLeftSignedIn = ({ session }) => {
  const [opened, setOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selfilename, setSelfilename] = useState("");
  const router = useRouter();
  const [errors, setsError] = useState("");
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [mod, setMod] = useState(false);
  const checkMod = async () => {
    let { data: mods, error } = await supabase
      .from("mods")
      .select("*")
      .eq("name", session.user.user_metadata.name); //session.user.user_metadata.name
    if (mods?.length) return true;
    return false;
  };

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleUploadFile = async () => {
    try {
      setUploading(true);
      if (!selectedFile || selectedFile === 0) {
        console.log("err1");
        setErrors("You must select an image to upload.");
      }
      const file = selectedFile;

      let { data, error } = await supabase.storage
        .from("uploads")
        .upload(selfilename, file);
      //
      const { data: fileUrl, er } = await supabase.storage
        .from("uploads")
        .getPublicUrl(selfilename);

      const newFile = {
        uploaded_by: supabase.auth.user().user_metadata.name,
        name: selfilename,
        url: fileUrl.publicURL,
      };

      const { data: drx, e } = await supabase
        .from("submitfiles")
        .insert(newFile);

      if (error) {
        throw error;
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setUploading(false);
      setTimeout(() => {
        setSelectedFile();
        setSelectedFileName("");
      }, 1000);
    }
  };

  const changeHandler = (event) => {
    event.preventDefault();
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    setSelectedFile(event.target.files[0]);
    setSelectedFileName(event.target.files[0].name);
  };

  useEffect(() => {
    const user = supabase.auth.user();
    setUsername(user.user_metadata.name);
    setAvatarUrl(user.user_metadata.avatar_url);
    checkMod().then((res) => {
      setMod(res);
    });
  }, [session, mod]);

  return (
    <>
      <Modal
        size="xl"
        centered
        classNames={{
          root: "anim-fade duration-300",
          modal: "bg-darker-purple text-white shadow-xl rounded-xl",
          overlay: "bg-darker-purple",
          title: "text-xl",
          close:
            "rounded-3xl bg-main-purple hover:bg-accent-white hover:text-main-purple duration-300 text-white",
        }}
        opened={opened}
        onClose={() => setOpened(false)}
        overlayOpacity={0.99}
        title="Emote submission"
      >
        <Tabs
          classNames={{
            tabsListWrapper: "border-0 ",
            tabsList: "border-0 ",
            tabActive: "text-white border-0 border-b-2 !border-white ",
            tabInner: "font-normal ",
            tabLabel: "text-main-white hover:text-white duration-300 ",
          }}
        >
          <Tabs.Tab label="File upload">
            <div className="h-96 flex flex-col">
              {errors ? (
                <div className="text-sm bg-accent-white rounded-sm text-accent-gray font-normal p-3 flex flex-row items-center">
                  <Bs.BsExclamationSquareFill className="mr-2 text-red-500 rounded-sm" />
                  {errors}
                </div>
              ) : (
                ""
              )}

              <div id="fileupload" className="p-0.5 relative mb-4">
                <div className="file-upload">
                  <div className="file-select">
                    <div className="file-select-button" id="fileName">
                      Choose File
                    </div>

                    <div className="file-select-name" id="noFile">
                      {selectedFileName ? selectedFileName : "No file chosen"}
                    </div>
                    <input
                      type="file"
                      id="single"
                      accept="image/*"
                      onChange={changeHandler}
                      disabled={uploading}
                    />
                  </div>
                </div>
              </div>
              <div id="filename" className="p-0.5 relative mb-4">
                <input
                  className="peer w-full py-4 px-4 mb-0 text-base text-white outline-none border-b-[1px] bg-transparent border-transparent-black placeholder-transparent"
                  type="text"
                  placeholder="Code"
                  onChange={(e) => setSelfilename(e.target.value)}
                  required
                />
                <span className=" peer-focus:before:w-2/4 peer-focus:after:w-2/4 relative block w-full after:content-[''] after:h-[2px] after:w-0 after:bottom-[0px] after:absolute after:bg-main-purple after:duration-300 before:content-[''] before:h-[2px] before:w-0 before:bottom-[0px] before:absolute before:bg-main-purple before:duration-300 before:left-2/4 after:right-2/4 before:box-shadow-purple after:box-shadow-purple"></span>
                <label className="absolute left-4 top-[-5px] text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-6 pointer-events-none peer-focus:top-[-5px] peer-focus:text-sm">
                  Emote code
                </label>
              </div>
              <button
                onClick={() => handleUploadFile()}
                type="submit"
                className="p-5 border-2 border-white text-white hover:bg-white hover:text-darker-purple mb-6 font-normal text-xl rounded-3xl cursor-pointer duration-300 w-full"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </Tabs.Tab>
          <Tabs.Tab label="Quick upload">
            <div className="h-96 flex flex-col">
              <FileDrop />
            </div>
          </Tabs.Tab>
          <Tabs.Tab label="How does it work?">
            <div className="h-96 flex flex-col">
              <h1 className="text-3xl text-center mt-6 mb-6">
                How does emote submission work?
              </h1>
              <Stepper
                classNames={{
                  separator: "bg-accent-purple",
                  stepIcon: "!border-accent-purple",
                  stepCompletedIcon: "!bg-accent-purple rounded-full",
                  stepLabel: "text-white",
                  stepDescription: "text-main-white",
                }}
                styles={{
                  stepIcon: {
                    backgroundColor: "var(--main-purple) !important",
                    color: "white",
                  },
                }}
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
              >
                <Stepper.Step label="First" description="Submit emotes">
                  1. You submit emotes by uploading files or using the Quick
                  upload function
                </Stepper.Step>
                <Stepper.Step label="Second" description="Get approved">
                  2. Moderators review and approve or deny the submitted emotes
                </Stepper.Step>
                <Stepper.Step
                  label="Final step"
                  description="Use in your emote set"
                >
                  3. If your emote is approved, you can use it in your emote
                  set!
                </Stepper.Step>
                <Stepper.Completed>Done!</Stepper.Completed>
              </Stepper>
              <div className="mt-3 flex flex-row items-center justify-center space-x-3">
                <div
                  className={` ${
                    active === 0
                      ? " opacity-10"
                      : "cursor-pointer hover:bg-white hover:text-accent-purple"
                  } p-2 px-4 border-2 rounded-2xl  duration-300 `}
                  onClick={() => prevStep()}
                >
                  Back
                </div>
                <div
                  className={` ${
                    active === 3
                      ? "opacity-10"
                      : "hover:bg-main-purple cursor-pointer"
                  } p-2 px-4 rounded-2xl bg-accent-purple  duration-300 `}
                  onClick={() => nextStep()}
                >
                  Next
                </div>
              </div>
            </div>
          </Tabs.Tab>
        </Tabs>
      </Modal>

      <div
        className={`px-6 py-5 flex flex-col h-full overflow-hidden ${
          router.route.includes("profile") ? "" : "anim-fade"
        } `}
      >
        <div className="flex flex-row items-center px-6 py-2 ">
          <img
            src={avatarUrl}
            alt={username}
            className="rounded-3xl w-10 border-2 shadow-xl"
          />
          <div className="ml-2 font-normal text-main-black rounded-2xl text-md overflow-hidden text-ellipsis whitespace-nowrap">
            {session.user.user_metadata.name}
          </div>

          <div className="ml-auto flex flex-row items-center">
            {mod ? (
              <Tooltip
                transition="pop"
                transitionDuration={300}
                transitionTimingFunction="ease"
                label="Mod dashboard"
                withArrow
              >
                <a
                  onClick={() => router.push("/dashboard/admin")}
                  className="p-2 hover:border-main-purple text-sm hover:bg-main-purple duration-300 hover:text-white cursor-pointer border-2 flex text-darker-purple items-center justify-center rounded-3xl mr-1"
                >
                  <Md.MdOutlineAdminPanelSettings />
                </a>
              </Tooltip>
            ) : (
              ""
            )}

            {router.pathname.includes("profile") ||
            router.pathname.includes("admin") ? (
              <Tooltip
                transition="pop"
                transitionDuration={300}
                transitionTimingFunction="ease"
                label="Return back to dashboard"
                withArrow
              >
                <a
                  onClick={() => router.push("/dashboard")}
                  className="p-2 hover:border-main-purple text-sm hover:bg-main-purple duration-300 hover:text-white cursor-pointer border-2 flex text-darker-purple items-center justify-center rounded-3xl mr-1"
                >
                  <Io.IoReturnUpBack />
                </a>
              </Tooltip>
            ) : (
              ""
            )}
            <Tooltip
              label="Logout"
              withArrow
              transition="pop"
              transitionDuration={300}
              transitionTimingFunction="ease"
            >
              <div
                title="Logout"
                onClick={() => supabase.auth.signOut()}
                className="p-2 hover:border-main-purple text-sm hover:bg-main-purple duration-300 hover:text-white cursor-pointer border-2 flex text-darker-purple items-center justify-center rounded-3xl mr-3"
              >
                <Md.MdLogout />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="p-6 w-full space-y-3 flex flex-col">
          <Link
            href={
              router.pathname.includes("profile")
                ? "/dashboard"
                : "/dashboard/profile"
            }
            passHref
          >
            <div className="hover:border-main-purple hover:bg-main-purple hover:text-white duration-300 border-2 font-normal text-main-black cursor-pointer flex justify-center items-center p-3 rounded-xl w-full">
              {router.pathname.includes("profile")
                ? "Dashboard"
                : "Your profile"}
            </div>
          </Link>
          <div
            onClick={() => setOpened(true)}
            className="group border-2 border-main-purple  bg-main-purple duration-300 cursor-pointer text-white flex justify-center items-center p-3 rounded-xl w-full"
          >
            <span className="opacity-75 font-normal group-hover:opacity-100 duration-300">
              Submit emotes
            </span>
          </div>
          <div className="hover:border-main-purple hover:bg-main-purple hover:text-white duration-300 border-2 font-normal text-main-black cursor-pointer flex justify-center items-center p-3 rounded-xl w-full">
            Subscribe
          </div>
          <div className="flex flex-row items-center text-sm px-3 text-accent-gray font-normal">
            <Bs.BsPatchCheckFill className="mr-2 text-main-purple text-xl" />
            Not currently subscribed
          </div>
          <div className="flex flex-row items-center text-sm px-3 text-accent-gray font-normal">
            Has no access to emote sets
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardLeftSignedIn;
