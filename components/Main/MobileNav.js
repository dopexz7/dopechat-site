import { useState, Fragment } from "react";
//import { Dialog, Transition } from "@headlessui/react";
import * as Scroll from "react-scroll";
import { NavData } from "./NavData";
import { useRouter } from "next/router";
import * as Fa from "react-icons/fa";

const Link = Scroll.Link;

export default function MobileNav() {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const splitLocation = pathname.split("/");

  return (
    <>
      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Overlay
            as="div"
            className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-60 duration-300"
          >
            <div className="h-screen w-4/6 text-center">
              <Transition.Child
                as={Fragment}
                enter="duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="w-full h-full p-6 overflow-hidden text-left align-middle transition-all transform bg-darker-purple">
                  <div className="mt-4">
                    <div className="flex flex-col text-lg space-y-3">
                      {NavData.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            className={
                              splitLocation[1] === item.path
                                ? "hover:text-main-white text-white duration-500 cursor-pointer"
                                : "hover:text-white text-main-white duration-500 cursor-pointer"
                            }
                            to={item.section}
                            spy={true}
                            onClick={() => {
                              setIsOpen(false);
                            }}
                            smooth={true}
                            offset={-70}
                            duration={500}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog.Overlay>
        </Dialog>
      </Transition>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="pr-3 duration-300 lg:hidden text-main-white"
      >
        <Fa.FaBars />
      </div> */}
    </>
  );
}
