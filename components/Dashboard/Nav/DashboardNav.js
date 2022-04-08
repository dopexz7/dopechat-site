import React from "react";
import Link from "next/link";
import { DashboardNavData } from "./DashboardNavData";
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";
import * as Go from "react-icons/go";
import * as Ai from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import { supabase } from "../../../lib/supabaseClient";

export default function DashboardNav({ session }) {
  const extensionVersion = "0.3.5.3";
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  return (
    <div className={`duration-300 z-50 w-screen`}>
      <div
        className={`max-w-7xl w-screen mr-auto ml-auto flex flex-row justify-center items-center p-6 duration-300 space-x-8 text-main-white text-sm font-semibold`}
      >
        <Link href="/" passHref>
          <div className="font-normal cursor-pointer whitespace-nowrap text-clip w-max mr-auto text-white text-xl">
            dopeChat
          </div>
        </Link>
        <Link href="/" passHref>
          <div className="flex flex-row items-center anim hover:text-white duration-300 cursor-pointer">
            <Fa.FaHome className="mr-1" /> Home
          </div>
        </Link>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=BBESL24DMEABC"
          target="_blank"
          rel="noreferrer"
          className={`anim hover:text-white duration-300 items-center cursor-pointer flex flex-row`}
        >
          <Fa.FaPaypal className="mr-1" />
          Donate
        </a>
        <Menu as="div" className="anim relative inline-block">
          <Menu.Button className="hover:text-white duration-300">
            <div className="inline-flex items-center justify-center font-semibold">
              <Ai.AiOutlineLink className="mr-1" />
              Links
              <Bs.BsCaretDownFill
                className={`
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
                  className={`rounded-b-md hover:bg-darker-purple hover:p-4 overflow-hidden duration-300 hover:text-white group flex items-center p-3`}
                >
                  <Fa.FaDiscord className="mr-3" /> Discord
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
