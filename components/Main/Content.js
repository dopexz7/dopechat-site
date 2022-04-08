import * as Bs from "react-icons/bs";
import * as Go from "react-icons/go";
import * as Fa from "react-icons/fa";
import * as Hi from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { EmoteData } from "./EmoteData";
import { Fade } from "react-reveal";
import { PayPalButton } from "react-paypal-button-v2";
import { supabase } from "../../lib/supabaseClient";
import { Modal } from "@mantine/core";
import Script from "next/script";
import Image from "next/image";

const DonationAmount = ({ amount, setAmount, value }) => {
  return (
    <span
      className={`px-4 py-2 text-md cursor-pointer hover:border-b-2 ${
        amount === value
          ? "border-b-2 border-darker-purple text-darker-purple font-bold"
          : ""
      } `}
      onClick={() => setAmount(value)}
    >
      {value}$
    </span>
  );
};

export default function Content() {
  const [emotes, setEmotes] = useState(false);
  const [amount, setAmount] = useState(10);
  const [opened, setOpened] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const addDonationInDB = async (name, email) => {
    try {
      const { data, error } = await supabase
        .from("donations")
        .insert([{ name: name, email: email, amount: amount }]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen bg-accent-white ">
        <div className=" w-screen max-w-7xl ml-auto mr-auto">
          <div
            className="winScl:scale-90 winScl:mt-0 flex flex-col items-center pt-6 lg:pt-16 h-screen"
            id="section1"
          >
            <Fade top>
              <h3 className="text-xs lg:text-sm font-bold text-accent-gray">
                about
              </h3>
            </Fade>
            <Fade top>
              <h1 className="text-2xl lg:text-6xl font-bold lg:font-normal text-main-black mt-6 tracking-tight">
                What are the key features?
              </h1>
            </Fade>

            <div className="flex flex-col lg:flex-row lg:space-x-16 lg:mt-28 text-white lg:mr-16 lg:ml-16">
              <Fade left>
                <div className="flex flex-row lg:flex-col items-center lg:rounded-3xl lg:shadow-lg h-full lg:h-4/5 w-screen lg:w-2/5 p-3 lg:p-10 mt-10 lg:mt-28 bg-darker-purple lg:bg-accent-white bg-opacity-25">
                  <Bs.BsChatRightText className="text-white lg:text-main-purple drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />
                  <div className="lg:mt-14 text-base lg:text-lg text-accent-white lg:text-main-black font-bold w-2/4 lg:w-full text-center border-l-2 border-r-2  lg:border-0">
                    Chat look
                  </div>
                  <div className="lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-bold w-3/4 lg:w-full p-3 text-justify lg:text-left">
                    Freedom to customize the chat however you want: change
                    colors, font, text size, hide elements and more! All within
                    the easy-to-use settings.
                  </div>
                </div>
              </Fade>
              <Fade bottom>
                <div
                  onMouseEnter={() => {
                    setEmotes(true);
                  }}
                  onMouseLeave={() => {
                    setEmotes(false);
                  }}
                  className="relative flex flex-row lg:flex-col items-center lg:rounded-3xl lg:min-h-[450px] h-full lg:h-4/5 w-screen lg:w-2/5 p-3 lg:p-10 mt-0.5 lg:mt-0 bg-darker-purple lg:bg-accent-white bg-opacity-25 box-xl"
                >
                  <Hi.HiOutlineEmojiHappy className="text-white lg:text-main-purple drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />
                  <div className="flex flex-row items-center justify-center lg:mt-6 text-base lg:text-lg text-accent-white lg:text-main-black font-bold w-2/4 lg:w-full text-center border-l-2 border-r-2  lg:border-0">
                    Custom emotes
                  </div>
                  {emotes ? (
                    <div
                      className={`hidden lg:block lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-bold w-3/4 lg:w-full p-1 text-justify lg:text-left`}
                    >
                      {EmoteData.map((item, index) => {
                        return (
                          <Image
                            key={index}
                            src={item.path}
                            alt={item.title}
                            width={40}
                            height={40}
                            className="anim-bt inline p-0.5"
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="anim-bt hidden lg:block lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-bold w-3/4 lg:w-full p-3 text-justify lg:text-left">
                      {EmoteData.map((item, index) => {
                        return (
                          <span key={index}>
                            {item.title}
                            {index < EmoteData.length - 1 ? ", " : ""}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="anim-bt lg:hidden lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-bold w-3/4 lg:w-full p-3 text-justify lg:text-left">
                    {EmoteData.map((item, index) => {
                      return <span key={index}>{item.title}, </span>;
                    })}
                    and more!
                  </div>

                  {/*
              <div className="lg:mt-6 text-xs lg:text-sm text-accent-gray font-bold w-3/4 lg:w-full p-3 text-justify lg:text-left">
                The extension was designed to support any custom emotes, from
                your favorite KEKWs, to your favorite streamer's emotes!
              </div> */}
                  <span className="absolute bottom-6 anim-bt text-main-white lg:text-accent-gray font-bold lg:block hidden">
                    and more!
                  </span>
                </div>
              </Fade>
              <Fade right>
                <div className="flex flex-row lg:flex-col items-center lg:rounded-3xl lg:shadow-lg h-full lg:h-4/5 w-screen lg:w-2/5 p-3 lg:p-10 mt-0.5 lg:mt-28 bg-darker-purple lg:bg-accent-white bg-opacity-25 anim-bt1">
                  <Go.GoSettings className="text-white lg:text-main-purple drop-shadow-md lg:mt-6 p-3 h-10 w-12 mr-2 lg:mr-0 lg:w-10" />
                  <div className="lg:mt-14 text-base lg:text-lg text-accent-white lg:text-main-black font-bold w-2/4 lg:w-full text-center border-l-2 border-r-2 lg:border-0">
                    Quality of life
                  </div>
                  <div className="lg:mt-6 text-xs lg:text-sm text-main-white lg:text-accent-gray font-bold w-3/4 lg:w-full p-3 text-justify lg:text-left">
                    The extension features other quality of life (toggleable)
                    tweaks, including mouse wheel scroll volume control, chat
                    splitting and more!
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          <div
            className="winScl:scale-[0.9] winScl:mt-20 hidden lg:flex flex-row space-x-10 items-center pt-0 h-screen"
            id="section2"
          >
            <div className="w-full p-10 lg:p-0 lg:w-2/5 flex flex-col lg:flex-coltext-white lg:mr-16 lg:ml-16">
              <Fade left>
                <h3 className="text-xs lg:text-sm font-bold text-accent-gray">
                  features
                </h3>
              </Fade>
              <Fade left>
                <h1 className="text-2xl lg:text-6xl font-bold lg:font-normal text-main-black mt-6 tracking-tight w-3/4">
                  A look at extension&apos;s features
                </h1>
              </Fade>
              <Fade left>
                <h3 className="text-xs lg:text-sm font-bold text-accent-gray mt-6 w-3/4">
                  Extension features customized chat apperance, custom emotes,
                  popout chat and theatre mode.
                </h3>
              </Fade>
              <Fade left>
                <Link
                  className="border-2 hidden lg:flex lg:flex-row cursor-pointer duration-300 rounded-lg px-4 py-2 w-max text-main-black font-bold hover:border-accent-purple hover:text-main-purple mt-6"
                  to="section3"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                >
                  View the full changelog
                </Link>
              </Fade>
            </div>

            <div className="flex items-center relative justify-center">
              <Fade right>
                <div className="flex justify-center items-center absolute w-[500px]">
                  <Image
                    src="https://i.imgur.com/e4cVsgT.png"
                    alt=""
                    width={500}
                    className="xdd3 rounded-xl"
                  />
                  <span className="xdd13 right-0 absolute rounded-2xl bg-darker-purple p-3 overflow-hidden text-white opacity-90">
                    Theatre mode
                  </span>
                </div>
              </Fade>

              <div className="flex justify-center items-center absolute">
                <Image
                  src="https://i.imgur.com/xEc2M4J.png"
                  width={320}
                  className="xdd2 max-w-xs rounded-xl "
                  alt=""
                />
                <span className="xdd12 right-0 absolute rounded-2xl bg-darker-purple p-3 overflow-hidden text-white opacity-90">
                  Popout chat
                </span>
              </div>

              <Fade left>
                <div className="flex justify-center items-center relative">
                  <Image
                    src="https://i.imgur.com/dMSwaCj.png"
                    width={320}
                    className="xdd max-w-xs rounded-xl"
                    alt=""
                    layout="fill"
                  />
                  <span className="xdd1 right-0 absolute rounded-2xl bg-darker-purple p-3 overflow-hidden text-white opacity-90">
                    Chat appearance & emotes
                  </span>
                </div>
              </Fade>
            </div>
          </div>
          <div
            className="p-6 lg:p-0 flex flex-row relative h-screen items-center "
            id="section3"
          >
            <div className="ml-auto h-3/4 w-full flex flex-row lg:flex-row text-white lg:mr-16 justify-center items-center">
              <Fade left>
                <div className="w-2/3 text-2xl lg:text-8xl font-bold lg:font-normal text-main-black tracking-tight">
                  Changelog
                </div>
              </Fade>
              <Fade right>
                <div className="h-5/6 shadow-2xl p-3 font-bold text-main-black rounded-xl flex flex-col scrollbar-thin scrollbar-thumb-darker-purple scrollbar-track-main-white overflow-y-scroll border-2 w-3/4 text-sm">
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.3.5
                  </div>
                  <div className="m-3">Minor fixes, improvements</div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.3.4
                  </div>
                  <div className="m-3">
                    <div className="">
                      improved settings page with a better logo and top bar
                    </div>
                    <div className="">about page:</div>
                    <div className="">-export chat appearance settings</div>
                    <div className="">-import chat appearance settings</div>
                    <div className="">
                      -moved reset to default settings to about page
                    </div>
                    <div className="">minor improvements</div>
                  </div>

                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.3.3
                  </div>
                  <div className="m-3">
                    <div className="">
                      theatre mode (next to popout chat button or ALT+T keyboard
                      shortcut)
                    </div>
                    <div className="">performance improvements:</div>
                    <div className="">
                      -chat appearance doesn&apos;t check for new values every
                      second anymore, so it won&apos;t update live, but either
                      after something has changed in the page like a new message
                      typed in chat, or you refresh the page
                    </div>
                    <div className="">
                      -random username coloring doesn&apos;t check every half a
                      second anymore, it now detects if there&apos;s a new
                      message in chat and updates instantly
                    </div>
                    <div className="">
                      -popout chat should work a bit faster now
                    </div>
                  </div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.3.2
                  </div>
                  <div className="m-3">
                    <div className="">
                      double click to open emote menu, so that it doesn&apos;t
                      open while dragging
                    </div>
                    <div className="">chat appearance presets</div>
                    <div className="">
                      fixed chat popout button not showing up when switching
                      pages
                    </div>
                    <div className="">
                      added version in popup menu instead of &quot;welcome to fb
                      gaming&quot; update pages so you could follow updates
                    </div>
                    <div className="">minor improvements, fixes</div>
                  </div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.3.1
                  </div>
                  <div className="m-3">
                    <div className="">
                      you can now install multiple emote sets (and uninstall)
                    </div>
                    <div className="">emote count while viewing emotes</div>
                  </div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.3.0
                  </div>
                  <div className="m-3">
                    <div className="">
                      overhauled settings &amp; popup menu:
                    </div>
                    <div className="">
                      -interactive chat appearance changing, no more toggles
                    </div>
                    <div className="">
                      -overhauled viewing emotes in settings
                    </div>
                    <div className="">
                      -installed emote set visible in the popup menu
                    </div>
                    <div className="">
                      -added faq and tutorials in extension&apos;s settings (not
                      finished)
                    </div>
                    <div className="">
                      -advanced emote set dashboard (for mods)
                    </div>
                    <div className="">
                      sets are updated automatically without the need to update
                      the extension or import a new set
                    </div>
                    <div className="">popout chat</div>
                    <div className="">
                      added tooltips for emotes in the emote menu
                    </div>
                    <div className="">minor improvements</div>
                  </div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.2.7
                  </div>
                  <div className="m-3">
                    <div className="">feedback for reset to defaults</div>
                    <div className="">hide replies toggle</div>
                    <div className="">
                      fixed chat split/message separator setting
                    </div>
                    <div className="">
                      notification when the extension is updated
                    </div>
                    <div className="">fixed random color usernames</div>
                    <div className="">mac support</div>
                    <div className="">fixed firefox version</div>
                    <div className="">minor improvements</div>
                  </div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.2.6.4
                  </div>
                  <div className="m-3">
                    <div className="">
                      removed annoying emotes from the bottom of the live stream
                    </div>
                    <div className="">fixed wide emotes</div>
                    <div className="">
                      readability setting: separate chat messages
                    </div>
                    <div className="">tooltips for settings</div>
                    <div className="">vod chat background</div>
                    <div className="">reset to defaults button in settings</div>
                    <div className="">tooltips for settings</div>
                    <div className="">
                      extension now only works in livestream and vods pages
                    </div>
                  </div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.2.6
                  </div>
                  <div className="m-3">
                    <div className="">emote menu</div>
                    <div className="">like/reply buttons toggle</div>
                    <div className="">
                      fixed chat messages alignment with usernames
                    </div>
                    <div className="">custom color for names in chat</div>
                    <div className="">
                      fixed random color usernames in compact mode / dark mode /
                      light mode
                    </div>
                    <div className="">remove chat top bar toggle</div>
                    <div className="">tooltips for emotes</div>
                    <div className="">
                      chat width doesn&apos;t require to type px anymore
                    </div>
                    <div className="">remove comment reactions toggle</div>
                    <div className="">remove three dots toggle</div>
                    <div className="">minor improvements</div>
                  </div>
                  <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
                    0.1.0
                  </div>
                  <div className="m-3">
                    <div className="">initial release</div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          <div
            className="p-6 lg:p-0 winScl:scale-90 winScl:mt-0 flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-screen"
            id="section4"
          >
            <div className="flex flex-col w-full lg:w-1/4">
              <Script
                id="paypal-sdk-x"
                src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
                onLoad={() => {
                  return (
                    <Script id="kekw">
                      {PayPal.Donation.Button({
                        env: "production",
                        hosted_button_id: "BBESL24DMEABC",
                        image: {
                          src: "https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif",
                          alt: "Donate with PayPal",
                          title: "Donate using Paypal",
                        },
                      }).render("#paypal-button-container")}
                    </Script>
                  );
                }}
              ></Script>
              <Fade left>
                <div className="paypal-button group">
                  <div id="paypal-button-container" />
                  <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-accent-white pointer-events-none duration-300 border-2 group-hover:bg-darker-purple group-hover:border-darker-purple group-hover:text-white flex-row items-center justify-center flex  p-6 text-accent-purple font-bold rounded-3xl">
                    <Fa.FaPaypal className="mr-3" />
                    <div className="flex flex-col">Donate with Paypal</div>
                  </div>
                </div>
              </Fade>
            </div>
            <Fade right>
              <div className="w-full lg:w-3/4 flex flex-col ml-10">
                <h3 className="hidden lg:flex text-xs lg:text-sm font-bold text-accent-gray ml-auto">
                  donate
                </h3>

                <h1 className=" hidden lg:flex text-2xl lg:text-6xl font-bold ml-auto lg:font-normal text-main-black mt-6 tracking-tight">
                  Support the creator!
                </h1>

                <h1 className="flex text-sm lg:ml-auto lg:text-right font-bold lg:font-bold text-accent-gray mt-6 mr-6 lg:mr-0 tracking-tight">
                  note: this is purely for donations to support the creator! If
                  you want any benefits, check out subscription in the
                  dashboard!
                </h1>
              </div>
            </Fade>
          </div>

          <div
            className="p-6 lg:p-0 winScl:scale-90 winScl:mt-0 flex flex-col justify-center items-center lg:flex-row lg:pt-16 h-screen"
            id="section5"
          >
            <div className="duration-300 w-full h-1/2 bg-darker-purple rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
              <h1 className="z-50 duration-300 text-6xl text-white">
                Get started
              </h1>
              <div
                className="z-50 border-2 duration-300 hover:bg-white hover:text-main-purple text-white p-3 px-6 rounded-3xl font-bold cursor-pointer mt-6"
                onClick={() => window.scrollTo(0, 0)}
              >
                Download now
              </div>
            </div>
          </div>

          <div
            className="winScl:scale-90 flex text-accent-gray justify-center"
            id="section6"
          >
            <div className="flex flex-col mb-6 text-xs space-y-1 justify-center items-center">
              <Image
                width={40}
                height={40}
                src="https://i.imgur.com/a1AhdsO.png"
                alt="dopeChat"
              />
              <div>© All rights reserved</div>
              <div className="">
                made by{" "}
                <span className="text-darker-purple font-bold">dope</span>, 2022
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//Acqmd8q7IA90BulyZ4KqnJQF4Kx3IxzW7QhNbNxNU7rAhmpfMVMWQxY-IfuyolzwmeF3gtkhwN72Uh23
