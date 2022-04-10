import { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import * as Bs from "react-icons/bs";
import * as Ai from "react-icons/ai";
import * as Fa from "react-icons/fa";

export default function Links() {
  return (
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
    </div>
  );
}
