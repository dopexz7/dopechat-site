import Link from "next/link";
import { navLinks } from "./data";
import { LogoIcon, MobileNavIcon } from "./icons";
import { useUser } from "@supabase/auth-helpers-react";
import { LoggedInNav } from "./loggedinuser";
import { supabase } from "../../../lib/supabaseClient";
import ContactMain from '../../Contact/ContactMain'
import { useEffect, useState } from 'react';
export const MainNav = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };

  }, []);
  const user = useUser();
  async function signInWithTwitch() {
      const href = window.location.href;
      await supabase.auth.signInWithOAuth(
        {
          provider: "twitch",
          options: {
            redirectTo: href
          }
        },
      );
    }
    return (
        <>
        {mobileNav ?
          <div className="fixed top-0 left-0 z-[9999] bg-ma-pink text-black w-screen h-screen flex flex-col space-y-3 justify-center items-center">
            <div onClick={()=>setMobileNav(false)} className="absolute top-3 right-6 font-bold text-xl">x</div>
            {navLinks.map((v, index)=> (
              <Link onClick={() => setMobileNav(false)}  href={v.href} key={index} className="group relative duration-300 text-xl font-bold hover:text-ma-pink ">
                  <span className='absolute group-hover:opacity-50 text-ma-pink duration-200 opacity-0 blur-md'>{v.title}</span>
                  {v.title}
              </Link>
              ))}
          </div>
        : ""
        }
    <div className={` fixed ${scrollPosition >= 100 ? 'bg-black border-white':'border-transparent'} border-b-[1px] duration-300 border-opacity-5 top-0 left-0  z-50 w-full lg:w-screen flex items-center px-4 lg:px-[60px] py-6 lg:py-[30px]`}>
        <Link href='/' className='lg:pl-0 group cursor-pointer text-ma-pink duration-300 hover:before:opacity-0 hover:text-white flex items-center justify-center relative before:absolute before:bg-ma-pink before:w-full before:h-1/2 before:top-2.5 before:opacity-20 before:blur-md'>
            <LogoIcon/>
            <span className='hidden lg:block text-2xl font-bold '>dopeChat</span>
        </Link>
        <div className='lg:border-l-[1px] border-opacity-5 border-white pr-10 lg:pr-0 pl-6 w-full justify-end  lg:max-w-2xl hidden lg:flex items-center ml-auto uppercase text-sm font-bold space-x-3 lg:space-x-8'>
            {navLinks.map((v, index)=> (
            <Link href={v.href} key={index} className="group relative duration-300 hover:text-ma-pink ">
                <span className='absolute group-hover:opacity-50 text-ma-pink duration-200 opacity-0 blur-md'>{v.title}</span>
                {v.title}
            </Link>
            ))}
            <ContactMain btnClass="group relative duration-300 hover:text-ma-pink cursor-pointer" iconClass="hidden"/>
            {user ? 
            <LoggedInNav/>
            : <div onClick={()=>signInWithTwitch()} className="hidden lg:flex items-center relative before:absolute before:bg-ma-pink before:w-full before:h-full before:opacity-20 before:left-0 before:top-0 before:right-0 before:bottom-0 before:blur-md hover:before:opacity-0 before:duration-300 before:rounded-3xl duration-300 hover:bg-white px-5 text-black cursor-pointer py-2 bg-ma-pink rounded-3xl">
            Login
            </div>}
        </div>
        <div onClick={()=>  setMobileNav(true)} className="lg:hidden ml-auto text-ma-pink text-2xl">
          <MobileNavIcon/>
        </div>
    </div>
    </>
    )
}
