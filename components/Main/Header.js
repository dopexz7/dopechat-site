import { useEffect, useState, Fragment } from "react";
import { browserName } from "react-device-detect";
import * as Fa from "react-icons/fa";
import * as Bs from "react-icons/bs";
import { motion } from "framer-motion";
import { leftToRightVariant } from "./transitionVariants";
import { Menu, Transition } from "@headlessui/react";

export default function Header() {
  const [browsName, setBrowsName] = useState("");
  useEffect(() => {
    setBrowsName(browserName);
  }, []);
  const chromeUrl =
    "https://chrome.google.com/webstore/detail/dopechat/pfbgacokbnigfgdninjmcgokijpfldkn?hl=en-GB&authuser=3";
  const firefoxUrl = "https://addons.mozilla.org/en-US/firefox/addon/dopechat/";
  const operaUrl =
    "https://chrome.google.com/webstore/detail/dopechat/pfbgacokbnigfgdninjmcgokijpfldkn?hl=en-GB&authuser=3";
  const edgeUrl =
    "https://microsoftedge.microsoft.com/addons/detail/fb-gaming-better/pmmmalmbjnajoogjgbghgiagjpejfhdi";
  const menuData = [
    {
      title: "Chrome",
      href: chromeUrl,
      icon: <Fa.FaChrome />,
    },
    {
      title: "Firefox",
      href: firefoxUrl,
      icon: <Fa.FaFirefox />,
    },
    {
      title: "Opera",
      href: operaUrl,
      icon: <Fa.FaOpera />,
    },
    {
      title: "Edge",
      href: edgeUrl,
      icon: <Fa.FaEdge />,
    },
  ];

  function handleButton() {
    if (browsName === "Chrome") {
      window.open(chromeUrl);
    } else if (browsName === "Firefox") {
      window.open(firefoxUrl);
    } else if (browsName === "Opera") {
      window.open(operaUrl);
    } else if (browsName === "Edge") {
      window.open(edgeUrl);
    }
  }
  return (
    <>
      <div
        className="w-screen max-w-7xl ml-auto mr-auto h-screen "
        id="section0"
      >
        <div className="h-screen flex flex-row mr-auto">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={leftToRightVariant}
            className="winScl:scale-75 winScl:mt-20 p-6 lg:p-8 mt-20 lg:mt-44 w-full lg:w-[50vw] fixed top-0 flex-col flex lg:flex-col"
          >
            <div className="flex flex-col">
              <h1 className="hidden lg:flex text-5xl font-light max-w-xl ">
                The ultimate FB Gaming livestream experience
              </h1>

              <p className="text-base lg:text-lg lg:mt-8 xlx:mt-3 tracking-wider font-light m-0 text-center lg:text-left">
                The all-in-one extension is designed to add custom emotes,
                customize chat appearance and add more quality of life
                improvements, tweaks. All within the easy-to-use settings page.
              </p>
            </div>

            <button
              onClick={() => handleButton()}
              className="box-shadow-purple hidden lg:flex lg:flex-row items-center cursor-pointer duration-300 bg-accent-purple rounded-lg px-4 py-2 w-max text-white hover:bg-white hover:text-darker-purple lg:mt-9 xlx:mt-3"
            >
              <Fa.FaDownload className="mr-3 text-sm" />
              Download for {browsName ? browsName : "your browser"}
            </button>

            <div className="hidden lg:flex items-center mt-3">
              <Menu as="div" className="relative inline-block mr-3">
                <Menu.Button
                  className={`hover:text-white duration-300 hidden lg:flex cursor-pointer lg:flex-row lg:items-center`}
                >
                  <div className="inline-flex items-center justify-center font-normal text-xs">
                    All versions
                    <Bs.BsCaretDownFill
                      className={`text-main-white  group-hover:text-white
                     duration-300 w-3 h-3 ml-2`}
                      aria-hidden="true"
                    />
                  </div>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="text-main-black p-1 rounded-md space-y-1 font-semibold text-sm absolute right-0 w-56 mt-3 origin-top-right bg-accent-white shadow-lg">
                    {menuData.map((data, index) => (
                      <Menu.Item key={index}>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={data.href}
                          className={`hover:bg-darker-purple rounded-md cursor-pointer overflow-hidden duration-300 hover:text-white group flex items-center p-2`}
                        >
                          <div className="mr-1 p-0.5">{data.icon}</div>
                          {data.title}
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="lg:mt-9 xlx:mt-3 text-white flex flex-col h-max lg:text-left  p-3 lg:border-0 lg:p-0">
              Available for
              <div className="flex flex-row lg:flex-row mt-3 space-x-2 lg:self-auto">
                {menuData.map((data, index) => (
                  <div
                    key={index}
                    title={data.title}
                    className="bg-accent-purple p-2 flex justify-center items-center rounded-2xl text-2xl"
                  >
                    {data.icon}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-white flex flex-col">
                <div className="text-main-white text-xs hidden lg:flex">
                  Browsers like Brave might work
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
