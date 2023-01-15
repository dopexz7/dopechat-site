import React from 'react'
import { changelogData } from './changelogData';

const Changelog = () => {
  return (
    <div id="changelog" className='flex border-t-[2px] border-white border-opacity-5 w-screen items-center h-screen flex-col lg:flex-row lg:px-[60px] py-[60px] mt-24'>
        <div className='lg:mx-10 h-full w-full lg:max-w-5xl lg:ml-16 lg:my-auto'>
          <div className="flex relative flex-col lg:flex-row lg:items-center h-full ">
            <h1 className="flex items-center text-2xl lg:text-6xl font-bold tracking-tighter text-ma-pink lg:text-white pl-6 lg:pl-0">
              Latest extension updates
            </h1>
          </div>
        
        </div>
        <div className='h-full mt-6 lg:mt-0 lg:h-4/5 lg:border-l-[1px] border-opacity-5 border-white px-6 lg:px-0 lg:pl-11 mr-auto lg:mr-0 w-screen lg:max-w-xl flex flex-col font-bold'>
          <h1 className='hidden lg:flex items-center text-lg tracking-tighter font-bold text-ma-pink uppercase pb-6'>
            <svg className='bg-ma-pink text-black p-1 h-6 w-6 rounded-lg text-xl mr-3' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg> 
            changelog 
          </h1>
          <div className='border-2 border-white border-opacity-5 rounded-2xl lg:border-0 lg:rounded-none p-3 lg:p-0 flex flex-col space-y-3 lg:space-y-6 overflow-y-scroll'>
          {Object.keys(changelogData).map((key, index) => (
            <div key={index} className='group w-full lg:max-w-lg space-y-1 cursor-pointer'>
            <div className='uppercase opacity-50'>{key}</div>
            {changelogData[key].map((v: any, indexe: any) => (
              <div key={indexe} className='hover:text-ma-pink duration-300 text-sm lg:text-lg font-medium tracking-wider'>{v}</div>
            ))}
            
            </div>
          ))}
              
            
          </div>
          
        </div>
    </div>
  )
}
export default Changelog;
