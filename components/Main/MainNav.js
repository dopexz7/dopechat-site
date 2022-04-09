import * as Scroll from "react-scroll";
import { Dialog, Transition, Menu } from "@headlessui/react";
import Link from "next/link";
import * as Fa from "react-icons/fa";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Md from "react-icons/md";
import { Fragment } from "react";
import { NavData } from "./NavData";
import MobileNav from "./MobileNav";

const Linkx = Scroll.Link;

export default function MainNav() {
  const scroll = Scroll.animateScroll;

  return (
    <>
      <MobileNav />
      <div
        className={`duration-300 z-50 w-screen fixed top-0 bg-darker-purple bg-opacity-10 backdrop-blur-sm`}
      >
        <div
          className={`winScl:scale-[0.85] relative max-w-7xl w-screen mr-auto ml-auto flex flex-row justify-center items-center p-4 lg:p-6 duration-300 space-x-6 text-main-white text-sm font-semibold`}
        >
          <div
            onClick={() => scroll.scrollToTop()}
            className={` text-xl duration-300 font-normal cursor-pointer whitespace-nowrap text-clip w-max mr-auto text-white`}
          >
            dopeChat
          </div>

          <div
            className={`text-white duration-300 hidden lg:flex cursor-pointer lg:flex-row lg:items-center`}
            onClick={() => scroll.scrollToTop()}
          >
            <Fa.FaHome className="mr-1" /> Home
          </div>
          {NavData.map((item, index) => {
            return (
              <Linkx
                className="hover:text-white duration-300 hidden lg:flex cursor-pointer lg:flex-row lg:items-center"
                activeClass="text-accent-purple duration-300"
                key={index}
                to={item.section ? item.section : ""}
                spy={true}
                smooth={true}
                offset={-50}
                duration={600}
              >
                {item.icon}
                {item.title}
              </Linkx>
            );
          })}
          <div className="hidden lg:flex items-center">
            <Menu as="div" className="relative inline-block  mr-3">
              <Menu.Button
                className={`hover:text-white duration-300 hidden lg:flex cursor-pointer lg:flex-row lg:items-center`}
              >
                <div className="inline-flex items-center justify-center font-semibold">
                  <Ai.AiOutlineLink className="mr-1" />
                  Links
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
                <Menu.Items className="text-darker-purple font-semibold font-xs absolute right-0 w-56 mt-3 origin-top-right bg-accent-white rounded-lg shadow-lg ">
                  <div className="p-0">
                    <Menu.Item>
                      <a
                        href="#"
                        className={`hover:bg-darker-purple hover:p-4 rounded-t-md overflow-hidden duration-300 hover:text-white group flex items-center p-3`}
                      >
                        <Bs.BsTwitter className="mr-3" /> Twitter
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href="#"
                        className={`hover:bg-darker-purple hover:p-4 overflow-hidden duration-300 hover:text-white group flex items-center p-3 rounded-b-md`}
                      >
                        <Fa.FaDiscord className="mr-3" /> Discord
                      </a>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link href="/dashboard" passHref>
              <a
                className={`ml-3 flex flex-row items-center group w-max text-center cursor-pointer duration-300  text-main-white  hover:text-white`}
              >
                <Md.MdDashboard className="mr-1" /> Dashboard
              </a>
            </Link>
          </div>
          <div
            onClick={() => {
              setIsOpen(true);
            }}
            className="pr-3 duration-300 lg:hidden text-main-white"
          >
            <Fa.FaBars />
          </div>
        </div>
      </div>
    </>
  );
}
