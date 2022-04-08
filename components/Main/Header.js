import { useEffect, useState } from "react";
import { browserName } from "react-device-detect";
import * as Fa from "react-icons/fa";
import HeaderH1 from "./HeaderH1";

export default function Header() {
  const [download, setDownload] = useState("");
  const [browsName, setBrowsName] = useState("");
  useEffect(() => {
    setBrowsName(browserName);
  }, []);
  function handleButton() {
    if (browsName === "Chrome") {
      window.open(
        "https://chrome.google.com/webstore/detail/fb-gaming-better/aflheebbcchbhephcfamiiciepiibpak"
      );
    } else if (browsName === "Firefox") {
      window.location.replace(
        "https://addons.mozilla.org/en-US/firefox/addon/better-fb-gaming/"
      );
    } else if (browsName === "Opera") {
      window.open(
        "https://chrome.google.com/webstore/detail/fb-gaming-better/aflheebbcchbhephcfamiiciepiibpak"
      );
    } else if (browsName === "Edge") {
      window.open(
        "https://microsoftedge.microsoft.com/addons/detail/fb-gaming-better/pmmmalmbjnajoogjgbghgiagjpejfhdi"
      );
    } else {
      setDownload("Your browser might not be supported");
    }
  }
  return (
    <>
      <div
        className="w-screen max-w-7xl ml-auto mr-auto h-screen "
        id="section0"
      >
        <div className="h-screen flex flex-row mr-auto">
          <div className="winScl:scale-75 winScl:mt-20 p-6 lg:p-8 mt-20 lg:mt-44 w-full lg:w-[50vw] fixed top-0 flex-col flex lg:flex-col">
            <div className="flex flex-col">
              <h1 className="hidden lg:flex text-5xl max-w-xl anim-rl">
                The ultimate FB Gaming livestream experience
              </h1>

              <p
                className="text-base lg:text-lg lg:mt-8 xlx:mt-3 tracking-wider anim-rl m-0 text-center lg:text-left"
                style={{ "--delay": "0s" }}
              >
                The all-in-one extension is designed to add custom emotes,
                customize chat appearance and add more quality of life
                improvements, tweaks. All within the easy-to-use settings page.
              </p>
            </div>

            <button
              onClick={() => handleButton()}
              className="anim-rl box-shadow-purple hidden lg:flex lg:flex-row cursor-pointer duration-300 bg-accent-purple rounded-lg px-4 py-2 w-max text-main-white hover:bg-white hover:text-darker-purple lg:mt-9 xlx:mt-3"
              style={{ "--delay": ".15s" }}
            >
              {download ? download : `Download for ${browsName}`}

              {browsName === "Chrome" ? (
                <Fa.FaChrome className="mt-1 ml-2" />
              ) : browsName === "Firefox" ? (
                <Fa.FaFirefox className="mt-1 ml-2" />
              ) : browsName === "Opera" ? (
                <Fa.FaOpera className="mt-1 ml-2" />
              ) : browsName === "Edge" ? (
                <Fa.FaEdge className="mt-1 ml-2" />
              ) : browsName === "Safari" ? (
                <Fa.FaSafari className="mt-1 ml-2" />
              ) : (
                ""
              )}
            </button>
            {download ? (
              <>
                <div className="flex flex-row space-x-3">
                  <a
                    href="https://chrome.google.com/webstore/detail/fb-gaming-better/aflheebbcchbhephcfamiiciepiibpak"
                    className="box-shadow-purple flex flex-row cursor-pointer duration-300 bg-accent-purple rounded-lg px-4 py-2 w-max text-main-white hover:bg-main-white hover:text-main-purple mt-3"
                  >
                    Chrome version
                  </a>
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/better-fb-gaming/"
                    className="box-shadow-purple flex flex-row cursor-pointer duration-300 bg-accent-purple rounded-lg px-4 py-2 w-max text-main-white hover:bg-main-white hover:text-main-purple mt-3"
                  >
                    Firefox version
                  </a>
                  <a
                    href="https://microsoftedge.microsoft.com/addons/detail/fb-gaming-better/pmmmalmbjnajoogjgbghgiagjpejfhdi"
                    className="box-shadow-purple flex flex-row cursor-pointer duration-300 bg-accent-purple rounded-lg px-4 py-2 w-max text-main-white hover:bg-main-white hover:text-main-purple mt-3"
                  >
                    Edge version
                  </a>
                </div>
              </>
            ) : (
              ""
            )}
            <div
              className="lg:mt-9 xlx:mt-3 text-white flex flex-col anim-rl h-max lg:text-left  p-3 lg:border-0 lg:p-0"
              style={{ "--delay": ".15s" }}
            >
              Available for
              <div className="flex flex-row lg:flex-row mt-3 space-x-2 lg:self-auto">
                <div className="bg-accent-purple p-2 rounded-xl">
                  <Fa.FaChrome className="w-6 h-6" />
                </div>
                <div className="bg-accent-purple p-2 rounded-xl">
                  <Fa.FaFirefox className="w-6 h-6" />
                </div>
                <div className="bg-accent-purple p-2 rounded-xl">
                  <Fa.FaOpera className="w-6 h-6" />
                </div>
                <div className="bg-accent-purple p-2 rounded-xl">
                  <Fa.FaEdge className="w-6 h-6" />
                </div>
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
