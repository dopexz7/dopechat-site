import * as Scroll from "react-scroll";
import Link from "next/link";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import ContactMain from "../Contact/ContactMain";

export default function MainNav() {
  const scroll = Scroll.animateScroll;

  return (
    <>
      <div
        className={`z-50 w-screen fixed top-0 bg-black bg-opacity-25 backdrop-blur-md lg:bg-darker-purple`}
      >
        <div
          className={`relative max-w-6xl w-screen mx-auto flex flex-row justify-center items-center p-4 lg:p-6 duration-300 space-x-6 text-main-white text-sm font-semibold`}
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
