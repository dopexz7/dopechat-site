
import { ChatLookIcon, CustomEmotesIcon, NewFeatIcon, QolIcon } from "./icons";
import * as Fa from "react-icons/fa";
import * as Si from 'react-icons/si';

export const headerData = [
    {
      title: 'Chat look',
      body: 'Freedom to personalize the chat to your liking: with options to alter colors, font, text size, conceal elements and more!',
      icon: <ChatLookIcon/>
    },
    {
      title: 'Custom emotes',
      body: 'Streamers can create their own distinct emote collections for their audience. The extension also features a frequently updated global emote collection',
      icon: <CustomEmotesIcon/>
    },
    {
      title: 'Quality of life',
      body: 'The extension offers additional quality of life enhancements, which can be enabled or disabled at will, such as volume control through mouse wheel scrolling, chat splitting, and other options.',
      icon: <QolIcon/>
    },
    {
      title: 'New features',
      body: 'New features have been introduced to improve the user experience including pop-out chat, theater mode and true picture-in-picture mode.',
      icon: <NewFeatIcon/>
    },
  ]

export const chromeUrl =
  "https://chrome.google.com/webstore/detail/dopechat/pfbgacokbnigfgdninjmcgokijpfldkn?hl=en-GB&authuser=3";
export const firefoxUrl = "https://addons.mozilla.org/en-US/firefox/addon/dopechat/";
export const edgeUrl =
  "https://microsoftedge.microsoft.com/addons/detail/fb-gaming-better/pmmmalmbjnajoogjgbghgiagjpejfhdi";

export const menuData = [
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