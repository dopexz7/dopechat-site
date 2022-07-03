import * as Md from "react-icons/md";
import * as Go from "react-icons/go";
import { forwardRef } from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
const EditingSet = ({ data, editingSet, passProps, profile }) => {
  const [avatar, setAvatar] = useState();
  const getStreamerImg = async (d) => {
    await fetch(`https://api.frankerfacez.com/v1/user/${d.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setAvatar(data?.user?.avatar));
  };

  useEffect(() => {
    if (data.name !== "global") {
      getStreamerImg(data.name);
    } else {
        setAvatar("https://cdn.frankerfacez.com/emoticon/381875/4")
    }
  }, [data]);
    
    
  // eslint-disable-next-line react/display-name
  const MyLink = forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    let { href, children, ...rest } = props;
    return (
      <Link href={href}>
        <a ref={ref} {...rest}
          title="View full set"
          className="text-white rounded-xl bg-darker-purple  hover:rounded-3xl cursor-pointer p-3 justify-center duration-300 flex items-center w-max"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Go.GoLinkExternal />
        </a>
        
      </Link>
    );
  });
    return (
      <>
        {profile ? (
          <Link href={`/dashboard/set/${data?.name}`} passHref>
            <a
              target="_blank"
              className={`hover:border-opacity-50 duration-300 cursor-pointer border-[1px] overflow-hidden border-white
              
                border-opacity-5 bg-opacity-5
             p-0.5 rounded-2xl bg-white `}
            >
              <img
                src={avatar}
                alt={data.name}
                className="w-10 h-full rounded-xl"
              />
            </a>
          </Link>
        ) : (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                className={`hover:border-opacity-50 duration-300 cursor-pointer border-[1px] overflow-hidden border-white ${
                  editingSet === data?.name
                    ? "border-opacity-100 bg-opacity-10"
                    : "border-opacity-5 bg-opacity-5"
                } p-0.5 rounded-2xl bg-white `}
              >
                <img
                  src={avatar}
                  alt={data.name}
                  className="w-10 h-full rounded-xl"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute w-max  rounded-xl bg-black bg-opacity-5 border-[1px] border-white border-opacity-10 shadow-lg">
                <div className="px-1 py-1 flex flex-row space-x-1">
                  <Menu.Item>
                    <div
                      title="Select set"
                      onClick={() =>
                        editingSet === data?.name
                          ? passProps()
                          : passProps(data?.name)
                      }
                      className={`text-white rounded-xl bg-darker-purple hover:rounded-3xl
                        cursor-pointer p-3 justify-center duration-300 flex items-center w-max `}
                    >
                      {editingSet === data?.name ? (
                        <Md.MdCheck />
                      ) : (
                        <Md.MdAdd />
                      )}
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <MyLink href={`/dashboard/set/${data?.name}`}></MyLink>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </>
      //   title="Select set"
      //   onClick={() =>
      //     editingSet === data?.name ? passProps() : passProps(data?.name)
      //   }
    );
};

export default EditingSet;
