import { FC, useEffect, useState } from "react";
import { browserName } from "react-device-detect";
import * as Fa from "react-icons/fa";
import { Menu } from "@mantine/core";

const Header:FC = () => {
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

  function handleButton() {
    if (browsName === "Chrome") {
      window.open(chromeUrl);
    } else if (browsName === "Firefox") {
      window.open(firefoxUrl);
    } else if (browsName === "Opera") {
      window.open(chromeUrl);
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
          <div
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
              Download for {browsName}
            </button>

            <Menu
              control={
                <button type="button" className="font-normal text-xs mt-3 ">
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
                  <a
                    key={index}
                    target="_blank"
                    rel="noreferrer"
                    href={data.href}
                  >
                    <Menu.Item icon={data.icon}>{data.title}</Menu.Item>
                  </a>
                ))}
            </Menu>

            <div className="lg:mt-9 xlx:mt-3 text-white flex flex-col h-max lg:text-left  p-3 lg:border-0 lg:p-0">
              Available for
              <div className="flex flex-row lg:flex-row mt-3 space-x-2 lg:self-auto">
                {menuData &&
                  menuData.map((data, index) => (
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
                  Other browsers like Brave might work
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header