import { FC, useEffect, useState } from "react";
import { browserName } from "react-device-detect";
import * as Fa from "react-icons/fa";
import { Menu } from "@mantine/core";

const MainHeader:FC = () => {
  const [browsName, setBrowsName] = useState<string>("your browser");

  useEffect(() => {
    setBrowsName(browserName);
  }, []);

  const chromeUrl =
    "https://chrome.google.com/webstore/detail/dopechat/pfbgacokbnigfgdninjmcgokijpfldkn?hl=en-GB&authuser=3";
  const firefoxUrl = "https://addons.mozilla.org/en-US/firefox/addon/dopechat/";
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
      href: chromeUrl,
      icon: <Fa.FaOpera />,
    },
    {
      title: "Edge",
      href: edgeUrl,
      icon: <Fa.FaEdge />,
    },
  ];
  return (
    <div className="w-screen max-w-6xl mt-20 lg:mt-0 flex flex-col lg:flex-row lg:space-x-10 lg:items-center pt-0 h-full lg:h-screen">
      <div className="flex flex-col p-6">
        <h1 className="flex text-2xl lg:text-6xl font-light">
          The ultimate FB Gaming livestream experience
        </h1>

        <p className="text-sm lg:text-lg lg:mt-3 xlx:mt-3 tracking-wider font-light m-0">
          The all-in-one extension is designed to add custom emotes, customize
          chat appearance and add more quality of life improvements, tweaks. All
          within the easy-to-use settings page.
        </p>
      </div>

      <div className="lg:mt-0 p-6 xlx:mt-3 text-white flex flex-col h-max py-3 lg:p-0">
        <p>Available for</p>

        <div className="flex flex-col lg:flex-row mt-3 lg:space-x-2 space-y-2 lg:space-y-0 lg:self-auto">
          {menuData &&
            menuData.map((data, index) => (
              <div
                key={index}
                className="flex flex-row space-x-3 items-center tracking-wider font-light text-sm"
              >
                <div
                  title={data.title}
                  className="bg-black bg-opacity-25 p-2 flex w-max justify-center items-center rounded-2xl text-2xl"
                >
                  {data.icon}
                </div>
                <div className="ml-1 lg:hidden">{data.title}</div>
              </div>
            ))}
        </div>
        <div className="mt-3 text-white flex flex-col">
          <div className="lg:text-main-white lg:text-xs mt-1 lg:m-0">
            Other browsers like Brave might work
          </div>
          <p className="text-main-white text-xs mt-1 lg:m-0 block lg:hidden">
            Only on desktop
          </p>
        </div>
        <button
          onClick={() =>
            browsName === "Chrome"
              ? window.open(chromeUrl)
              : browsName === "Firefox"
              ? window.open(firefoxUrl)
              : browsName === "Opera"
              ? window.open(chromeUrl)
              : browsName === "Edge"
              ? window.open(edgeUrl)
              : window.open(chromeUrl)
          }
          className="hidden lg:flex lg:flex-row items-center cursor-pointer duration-300 bg-black bg-opacity-25 box-shadow-purple rounded-lg px-4 py-2 w-max text-white hover:bg-white hover:text-darker-purple lg:mt-3 xlx:mt-3"
        >
          <Fa.FaDownload className="mr-3 text-sm" />
          Download for {browsName}
        </button>

        <Menu
          control={
            <button
              type="button"
              className="font-normal hidden lg:flex text-xs mt-3 "
            >
              All versions
            </button>
          }
          classNames={{
            item: "duration-300 text-main-black",
            itemHovered: "bg-border-white text-darker-purple",
          }}
        >
          {menuData &&
            menuData.map((data, index) => (
              <a key={index} target="_blank" rel="noreferrer" href={data.href}>
                <Menu.Item icon={data.icon}>{data.title}</Menu.Item>
              </a>
            ))}
        </Menu>
      </div>

      <div className="hidden lg:flex flex-row items-center m-auto w-1/6 -z-10 opacity-10 scale-90 blur-sm">
        <div className="lll3 rounded-3xl z-20 absolute translate-x-[-170%] scale-x-[0.86] skew-y-[8deg]"></div>
        <div className="lll2 rounded-3xl z-10 absolute translate-x-[-130%] translate-y-[100px] skew-y-[8deg]"></div>
        <div className="lll  rounded-3xl z-0  absolute translate-x-[-60%]  scale-x-[0.86] skew-y-[8deg]"></div>
      </div>
    </div>
  );
};

export default MainHeader;
