import React from 'react'
import { changelogData } from './changelogData';

const Changelog = () => {
  return (
    <div id="changelog" className='w-screen items-center h-screen flex flex-col lg:flex-row lg:px-[60px] py-[60px] mt-24'>
        <div className='mx-10 h-full w-full max-w-5xl ml-16 my-auto'>
          <div className="flex flex-col lg:flex-row lg:items-center h-full ">
          <h1 className="flex items-center text-6xl font-medium ">
                <svg className='text-ma-pink text-4xl mr-3' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg> 
                Latest extension updates
              </h1>
          </div>
        
        </div>
        <div className='h-4/5 border-l-[1px] border-opacity-5 border-white pl-11 w-screen max-w-xl flex flex-col font-bold'>
          <h1 className='text-2xl lg:text-lg font-bold text-ma-pink uppercase pb-7'>
            changelog 
          </h1>
          <div className='flex flex-col space-y-10 overflow-y-scroll'>
          {Object.keys(changelogData).map((key, index) => (
            <div key={index} className='group text-sm font-bold max-w-lg space-y-1 cursor-pointer'>
            <div className='uppercase opacity-50'>{key}</div>
            {changelogData[key].map((v: any, indexe: any) => (
              <div key={indexe} className='hover:text-ma-pink duration-300 text-lg font-medium tracking-wider'>{v}</div>
            ))}
            
            </div>
          ))}
              
            
          </div>
          
        </div>
    </div>
  )
}
export default Changelog;
