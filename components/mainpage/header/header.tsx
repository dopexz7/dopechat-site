import { useEffect, useState } from "react";
import { browserName } from "react-device-detect";
import * as Fa from "react-icons/fa";
import * as Si from 'react-icons/si';
import { Menu } from "@mantine/core";
import { headerData } from "./headerdata";

const MainHeader = () => {
    const [browsName, setBrowsName] = useState<string>("your browser");

  useEffect(() => {
    setBrowsName(browserName);
    //@ts-ignore
    if(navigator.brave) {
      setBrowsName("Brave");
    }
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
    {
      title: "Brave",
      href: chromeUrl,
      icon: <Si.SiBrave/>
    }
  ];
    return (
    <>
    <div id="afterHeader" className='w-screen flex flex-col lg:flex-row lg:px-[60px] lg:py-[60px] lg:mt-24'>
      <div className='lg:pl-11 h-screen lg:mx-10 w-screen lg:h-full lg:my-auto'>
        <div className="relative flex flex-col lg:flex-row h-full ">
          <div className='flex-col ml-auto mr-auto mt-auto mb-auto lg:hidden flex'>
            <span className='font-bold text-6xl text-ma-pink'>dopeChat</span>
            <span className="bg-ma-pink text-black rounded-md px-2 font-bold">The ultimate FB Gaming livestream experience</span>
          </div>
          <div className="hidden lg:flex mt-auto pb-10 lg:pb-0 pl-3 lg:pl-0 justify-center items-center flex-col lg:mr-6">
          
            <h1 className="text-6xl font-medium">
              The ultimate FB Gaming livestream experience
            </h1>
            <p className="text-lg mt-1 tracking-wider font-light">
              The all-in-one browser extension is designed to add custom emotes, customize
              chat appearance and add more quality of life improvements, tweaks.
            </p>
          </div>
          <div className="ml-auto mr-auto pl-0 text-white flex flex-col items-center lg:items-start h-max lg:mt-3 mb-6">
          Available for <span className="lg:hidden">PC only</span>
          <div className="flex flex-row mt-3 space-x-1 lg:self-auto">
            {menuData.map((data, index) => (
                  <div
                    key={index}
                    title={data.title}
                    className={` ${browsName === data.title ? 'bg-ma-pink text-black ' : ''} p-1 flex w-max justify-center items-center rounded-2xl text-2xl`}
                  >
                    {data.icon}
                  </div>
              ))}
          </div>
          <button
            onClick={() =>
              window.open(menuData.filter(v => v.title === browsName)[0]?.href)
            }
            className="hidden lg:flex uppercase overflow-hidden relative before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl duration-300 hover:bg-white px-10 text-black cursor-pointer py-2 bg-ma-pink rounded-3xl items-center w-max mt-3 font-bold"
          >
            Download 
          </button>
          
          <Menu
            position="right-start"
            classNames={{
              dropdown: 'w-1/2 !left-auto mt-6 bg-black rounded-2xl shadow-md border-[1px] border-white border-opacity-5 backdrop-blur-sm border-0',
              item: "duration-300 text-ma-pink hover:text-white rounded-2xl font-bold !bg-transparent",
            }}
          >
            <Menu.Target>
              <button
                type="button"
                className="text-xs mt-2 hidden lg:flex "
              >
                All versions &gt;
              </button>
            </Menu.Target>
            <Menu.Dropdown>
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
            </Menu.Dropdown>
          </Menu>
          </div>
          <div className="hidden lg:flex flex-row items-center m-auto w-1/7 -z-10 opacity-5 scale-90 blur-sm">
          <div className="lll3 rounded-3xl z-20 absolute translate-x-[-170%] scale-x-[0.86] skew-y-[8deg]"></div>
          <div className="lll2 rounded-3xl z-10 absolute translate-x-[-130%] translate-y-[100px] skew-y-[8deg]"></div>
          <div className="lll  rounded-3xl z-0  absolute translate-x-[-60%]  scale-x-[0.86] skew-y-[8deg]"></div>
          </div>
        </div>
      
      </div>
      <div id="afterHeaderRight" className='mt-24 lg:mt-0 lg:border-l-[1px] pb-24 lg:pb-3 border-opacity-5 border-white  lg:pl-11 w-screen max-w-2xl flex flex-col ml-auto font-bold'>
        <h1 className='text-2xl lg:text-lg font-bold tracking-tighter text-ma-pink uppercase pb-7 pl-6 lg:pl-0'>Key features</h1>
        <div className='flex flex-col space-y-3 lg:space-y-10'>
          {headerData.map((v, index)=> (
            <div key={index} className='flex flex-col lg:block items-center p-6 lg:p-0 lg:bg-inherit bg-ma-pink text-black lg:text-white group text-sm font-bold max-w-lg space-y-1 cursor-pointer'>
              {v.icon}
              <div className='lg:group-hover:text-ma-pink text-center lg:text-left duration-300 text-xl lg:text-lg font-bold lg:font-medium tracking-wider'>{v.body}</div>
              <div className='uppercase opacity-50'>{v.title}</div>
          </div>
          ))}
        </div>
        
      </div>
    </div>
    </>
    )
}

export default MainHeader;