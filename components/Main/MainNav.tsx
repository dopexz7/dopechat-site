import * as Scroll from "react-scroll";
import Link from "next/link";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import { NavData } from "./NavData";
import MobileNav from "./MobileNav";
import ContactMain from "../Contact/ContactMain";

const Linkx = Scroll.Link;

export default function MainNav() {
  const scroll = Scroll.animateScroll;

  return (
    <>
      <MobileNav />

      <div
        className={`z-50 w-screen bg-darker-purple`}
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
          <ContactMain
            btnClass={`hover:text-white duration-300 hidden lg:flex cursor-pointer lg:flex-row lg:items-center`}
            iconClass={`mr-3`} text={undefined}          />
          <Link href="/dashboard" passHref>
            <a
              className={`ml-3 hidden lg:flex flex-row items-center group w-max text-center cursor-pointer duration-300  text-main-white  hover:text-white`}
            >
              <Md.MdDashboard className="mr-1" /> Dashboard
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
