import React from 'react'
import { footerData } from './data';
import { LogoIcon } from '../nav/icons';

const MainFooter = () => {
  const featuresList = [
    "Custom emotes",
    "Customizable chat appearance",
    "Popout chat",
    "Theatre mode",
    "Mouse wheel scroll volume adjusting",
    "Chat splitting",
    "And more!"
  ]
  return (
    <>
    <div id="footer" className='border-t-[2px] border-white border-opacity-5 w-screen flex flex-col lg:flex-row lg:px-[60px] py-[60px] mt-24'>
        <div className='lg:pl-11 mx-0 w-full h-full my-auto'>
          <span className='text-2xl tracking-tighter text-ma-pink font-bold uppercase'>ABOUT</span>
          <div className="h-full mt-2 w-3/4">
              <span className='text-ma-pink'>dopeChat  </span>      
            aims to provide the best possible Facebook Gaming livestream viewing experience. It features tons of new features, customizations (and customizations to those customizations...), quality of life improvements with some other tweaks. It is not opinionated, provides settings for every possible new feature, from how a live stream&apos;s chat looks, to how it behaves.
            
          </div>
          <div className="w-1/2 flex flex-col space-y-2 mt-3">
              <div className="text-ma-pink text-2xl tracking-tighter font-bold">FEATURES</div>
              {featuresList.map((v, index)=> (
                <div key={index} className="text-xs lg:text-base font-bold uppercase opacity-50">{v}</div>
              ) )}
            </div>
        
        </div>
        <div className='border-l-[1px] pb-3 border-opacity-5 border-white pl-11 w-screen max-w-2xl flex flex-col ml-auto font-bold'>
          <h1 className='text-2xl tracking-tighter font-bold text-ma-pink uppercase pb-7'>Links</h1>
          <div className='flex flex-col space-y-10'>
            {footerData.map((v,index)=>(
            <div key={index} className='group text-sm font-bold max-w-lg space-y-1 cursor-pointer'>
              {v.icon}
              <div className='group-hover:text-ma-pink duration-300 text-lg font-medium tracking-wider'>{v.title}</div>
              <div className='uppercase opacity-50'>{v.body}</div>
            </div>
            )
            )}
            
          </div>
          
        </div>
        
      </div>
      <div className='border-t-[2px] border-white border-opacity-5 w-screen flex items-center px-4 lg:px-[60px] py-6 lg:py-[30px]'>
        <div>Made by <span className='text-ma-pink font-bold'>&nbsp;dope</span>, Copyright © 2022, All Rights Reserved by </div>
        <div onClick={()=> window.scrollTo(0,0)} className='ml-2 pl-6 lg:pl-0 group cursor-pointer text-ma-pink duration-300 hover:before:opacity-0 hover:text-white flex items-center justify-center relative before:absolute before:bg-ma-pink before:w-full before:h-1/2 before:top-2.5 before:opacity-20 before:blur-md'>
            <LogoIcon/>
            <span className='text-xl font-bold'>dopeChat</span>
        </div>
      </div>
    </>
  )
}
export default MainFooter;
