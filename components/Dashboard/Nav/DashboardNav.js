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
import Links from "../../Links";

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
          <div className="flex flex-row items-center  hover:text-white duration-300 cursor-pointer">
            <Fa.FaHome className="mr-1" /> Home
          </div>
        </Link>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=BBESL24DMEABC"
          target="_blank"
          rel="noreferrer"
          className={` hover:text-white duration-300 items-center cursor-pointer flex flex-row`}
        >
          <Fa.FaPaypal className="mr-1" />
          Donate
        </a>
        <Links />
      </div>
    </div>
  );
}
