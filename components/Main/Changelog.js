import React from "react";
import { motion } from "framer-motion";
import { leftToRightVariant, rightToLeftVariant } from "./transitionVariants";
export default function Changelog() {
  return (
    <>
      <div
        className="p-6 w-full max-w-7xl lg:p-0 flex flex-row relative h-screen items-center"
        id="section3"
      >
        <div className="ml-auto h-3/4 w-full flex flex-row lg:flex-row text-white lg:mr-16 justify-center items-center">
          <motion.span
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={leftToRightVariant}
            className="w-2/3 text-2xl lg:text-8xl font-normal lg:font-light text-main-black tracking-tight"
          >
            Changelog
          </motion.span>

          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={rightToLeftVariant}
            className="h-5/6 shadow-2xl p-3 font-normal text-main-black rounded-xl flex flex-col scrollbar-thin scrollbar-thumb-darker-purple scrollbar-track-main-white overflow-y-scroll border-2 w-3/4 text-sm"
          >
            <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
              1.0
            </div>
            <div className="m-3">
              -Official website! dopechat.ddns.net
              <div className="">--Dashboard</div>
              <div className="">--Current dashboard features:</div>
              <div className="">
                ---Login with Twitch and upload your own emotes
              </div>
              <div className="">
                ---Create your own emote set (up to 5 emotes)
              </div>
              <div className="">
                ---View all current emotes in the extension
              </div>
              <div>-Reworked a big part of the extension:</div>
              <div>--No more installing emote sets: </div>
              <div>---Global emotes:</div>
              <div>----They will be constantly updated with new emotes.</div>
              <div>---Channel emotes:</div>
              <div>
                ----If the streamer has an emote set made in the new website,
                mods will approve it and it will automatically be enabled on the
                channel ready to use.
              </div>
              <div>-Improved settings UI:</div>
              <div>
                --Font settings now show 50+ font options, with the ability to
                add your own fonts
              </div>
              <div>--Random username colors toggle (enabled by default)</div>
              <div>--Made it easier to add new highlighted keywords</div>
              <div>-Theatre mode:</div>
              <div>
                --Theatre mode no longer has a button, use the keyboard shortcut
                ALT+T (button clutter)
              </div>
              <div>-Updated emote menu:</div>
              <div>--Reworked emote menu completely</div>
              <div>
                --You can either click on the emote menu button or ALT+E to
                bring up the emote menu (it&apos;s no longer draggable)
              </div>
              <div>--Emote menu search:</div>
              <div>---TAB to autocomplete the emote name</div>
              <div>
                ---TAB also inputs the first emote into the chatbox (if you have
                typed anything in it)
              </div>
              <div>--Left navigation:</div>
              <div>
                ---Buttons for global/streamer emotes and extension settings
              </div>
              <div>-TAB autocomplete emotes:</div>
              <div>
                --You can now press TAB while typing in the chat input box to
                autocomplete emotes.
              </div>
              <div>
                --Type exact start of emote codes, ex. Pepe finds all the emotes
                starting with &quot;Pepe&quot;, &quot;PepeL&quot; or
                &quot;Pepeg&quot; narrows downthe search and so on.
              </div>
              <div>
                -Moved &quot;Enable emote set&quot; to the Other settings tab
              </div>
              <div>
                -Fixed emote menu sometimes causing browsers to lag (now loads
                &apos;infinitely&apos; emotes - scroll down to load more)
              </div>
              <div>-Other minor fixes and improvements</div>
              <div>
                -Timestamps in chat toggle (in settings, hidden by default)
              </div>
            </div>

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
                -chat appearance doesn&apos;t check for new values every second
                anymore, so it won&apos;t update live, but either after
                something has changed in the page like a new message typed in
                chat, or you refresh the page
              </div>
              <div className="">
                -random username coloring doesn&apos;t check every half a second
                anymore, it now detects if there&apos;s a new message in chat
                and updates instantly
              </div>
              <div className="">-popout chat should work a bit faster now</div>
            </div>
            <div className="bg-darker-purple px-3 py-1 flex text-main-white w-max rounded-2xl">
              0.3.2
            </div>
            <div className="m-3">
              <div className="">
                double click to open emote menu, so that it doesn&apos;t open
                while dragging
              </div>
              <div className="">chat appearance presets</div>
              <div className="">
                fixed chat popout button not showing up when switching pages
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
              <div className="">overhauled settings &amp; popup menu:</div>
              <div className="">
                -interactive chat appearance changing, no more toggles
              </div>
              <div className="">-overhauled viewing emotes in settings</div>
              <div className="">
                -installed emote set visible in the popup menu
              </div>
              <div className="">
                -added faq and tutorials in extension&apos;s settings (not
                finished)
              </div>
              <div className="">-advanced emote set dashboard (for mods)</div>
              <div className="">
                sets are updated automatically without the need to update the
                extension or import a new set
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
              <div className="">fixed chat split/message separator setting</div>
              <div className="">notification when the extension is updated</div>
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
                fixed random color usernames in compact mode / dark mode / light
                mode
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
          </motion.div>
        </div>
      </div>
    </>
  );
}
