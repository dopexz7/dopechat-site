import { Menu } from '@mantine/core'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LeftSideModal from '../../DashboardDark/Main/Leftside/LeftSideModal'
import DonationComponent from '../../Donation/DonationComponent'
import { getIsMod } from '../../../funcs/useIsMod'

export const LoggedInNav = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [isMod, setIsMod] = useState<boolean>(false);
  useEffect(() => {
    getIsMod(user?.user_metadata.name).then((res: any) => {
      setIsMod(res);
    });
  },[user])
  return (
    <Menu
        position="right-start"
        classNames={{
          dropdown: '!w-40 uppercase !left-auto mt-10 !ml-10 bg-ma-pink rounded-2xl !border-0',
          item: "duration-300 text-black hover:text-white rounded-2xl font-bold !bg-transparent",
        }}
        closeOnClickOutside={false}
        >
            <Menu.Target>
                <div className="hidden w-max max-w-[9rem] items-center lg:flex normal-case relative before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl duration-300 hover:bg-white px-5 text-black cursor-pointer py-2 bg-ma-pink rounded-3xl">
                    <span className='whitespace-nowrap text-ellipsis max-w-[6rem] w-max overflow-hidden mr-2'>{user?.user_metadata.name} </span>&gt;
                </div>
            </Menu.Target>
            <Menu.Dropdown>
            <div className="p-1 px-3 rounded-2xl text-black normal-case flex items-center cursor-normal">
                <img src={user?.user_metadata.avatar_url} alt={user?.user_metadata.name} width={36} height={36} 
                className="border-[1px] mr-3 border-ma-pink rounded-2xl"
                /> 
                {user?.user_metadata.name}
            </div>
            <Link href="/dashboard" className="p-3 m-1 hover:bg-black hover:text-white duration-300 cursor-pointer rounded-2xl text-black flex items-center cursor-normal">
            Dashboard
            </Link>
            <Link href= "/dashboard/profile" className="p-3 m-1 hover:bg-black hover:text-white duration-300 cursor-pointer rounded-2xl text-black flex items-center cursor-normal">
            Your Profile
            </Link>
            <LeftSideModal coolClass={"p-3 m-1 hover:bg-black hover:text-white duration-300 cursor-pointer rounded-2xl text-black flex items-center cursor-normal"} />
            <DonationComponent
              iconEnabled={false}
              btnClass={`p-3 m-1 hover:bg-black hover:text-white duration-300 cursor-pointer rounded-2xl text-black flex items-center cursor-normal`}
            />
            {isMod ? (
              <Link href="/dashboard/admin" className="p-3 m-1 hover:bg-black hover:text-white duration-300 cursor-pointer rounded-2xl text-black flex items-center cursor-normal">
              Mod panel
              </Link>
            ) : (
              ""
            )}
            <div onClick={()=>supabaseClient.auth.signOut()} className="p-3 m-1 hover:bg-black hover:text-white duration-300 cursor-pointer rounded-2xl text-black flex items-center cursor-normal">
            Log out
            </div>
            </Menu.Dropdown>
          </Menu>
  )
}
