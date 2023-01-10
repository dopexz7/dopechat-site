import Link from "next/link";
import { navLinks } from "./data";
import { LogoIcon } from "./icons";
import { useUser } from "@supabase/auth-helpers-react";
import { LoggedInNav } from "./loggedinuser";

export const MainNav = ({ dashboard = false }) => {
    const user = useUser();
    return (
        <>
    <div id="mainNav" className={`overflow-hidden ${dashboard ? '' : 'fixed'} top-0 left-0 bg-black z-50 w-full lg:w-screen flex items-center px-4 lg:px-[60px] py-6 lg:py-[30px]`}>
        <Link href='/' id="logo" className='pl-6 lg:pl-0 group cursor-pointer text-ma-pink duration-300 hover:before:opacity-0 hover:text-white flex items-center justify-center relative before:absolute before:bg-ma-pink before:w-full before:h-1/2 before:top-2.5 before:opacity-20 before:blur-md'>
            <LogoIcon/>
            <span className='text-2xl font-bold '>dopeChat</span>
        </Link>
        <div id="rightNav" className='lg:border-l-[1px] border-opacity-5 border-white pr-10 lg:pr-0 pl-6 w-full justify-end  lg:max-w-2xl flex items-center ml-auto uppercase text-sm font-bold space-x-3 lg:space-x-8'>
            {navLinks.map((v, index)=> (
            <Link href={v.href} key={index} className="group relative duration-300 hover:text-ma-pink ">
                <span className='absolute group-hover:opacity-50 text-ma-pink duration-200 opacity-0 blur-md'>{v.title}</span>
                {v.title}
            </Link>
            ))}
            {dashboard ? 
            <>
            {user ? 
            <LoggedInNav/>
            : <Link href={`/dashboard`} className="hidden lg:flex relative before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl duration-300 hover:bg-white px-5 text-black cursor-pointer py-2 bg-ma-pink rounded-3xl">
            Dashboard
            </Link>}
            </> : 
            <Link href={`/dashboard`} className="hidden lg:flex relative before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl duration-300 hover:bg-white px-5 text-black cursor-pointer py-2 bg-ma-pink rounded-3xl">
            Dashboard
            </Link>
            }
        </div>
    </div>
    </>
    )
}
