import React, { useState } from 'react'
import { lookFeatures } from './lookData'
import Image from 'next/image';
export const LookAtFeatures = () => {
  const [active, setActive] = useState('customChat');

  return (
    <>
    <div id="alookat" className='lg:h-screen mx-0 lg:mx-0 lg:ml-36 flex w-screen lg:w-auto flex-col  font-bold'>
      <div className='flex flex-col justify-center h-full w-full'>
        <h1 className='text-2xl lg:text-2xl font-bold tracking-tighter text-ma-pink uppercase pl-6 lg:pl-0'>A look at the extension&apos;s features</h1>
        <div className='flex flex-col lg:flex-row items-center w-full mt-3'>
        <div className='mt-10 items-center lg:mr-auto h-max lg:pb-0 lg:border-r-[1px] border-opacity-5 border-white  w-screen lg:max-w-xl flex flex-col justify-center font-bold'>
          <div className='flex lg:flex-col lg:space-y-6 w-full flex-wrap'>
              {lookFeatures.map((v,index)=>(
                <div key={index} onClick={()=>setActive(v.metaTitle)} className={`${active === v.metaTitle ? 'border-white lg:border-ma-pink' : 'border-transparent'} duration-300 max-lg:border-b-2 lg:border-r-2 w-1/4 lg:w-full flex flex-col items-center justify-center lg:block p-3 text-center lg:text-left lg:p-0 lg:bg-inherit bg-ma-pink text-black lg:text-white group text-sm font-bold space-y-1 cursor-pointer`}>
                  <span className='hidden lg:block'>{v.desc}</span>
                  <div className={`${active === v.metaTitle ? 'text-ma-pink' : ''} w-[90%] hidden lg:block lg:group-hover:text-ma-pink duration-300 text-sm lg:text-lg font-bold lg:font-medium tracking-wider`}>{v.body}</div>
                  <div className={`${active === v.metaTitle ? '' : 'opacity-75'} uppercase lg:opacity-50`}>{v.title}</div>
                </div>
              ))}
          </div>
        </div>
        <div className='lg:opacity-50 lg:mt-10 lg:h-3/4 justify-center items-center flex w-full lg:pl-6'>
          <div className='w-full h-full lg:h-auto relative flex items-center justify-center'>
          <div className="hidden lg:block h-full overflow-hidden w-full bggradient z-50 absolute top-0 left-0"/>
          <Image width={1919} height={1001} alt="Custom chat appearance & customization" className='z-10 w-full h-full duration-300' src={lookFeatures.filter((v) => v.metaTitle === active)[0].image}/>
          </div>
        </div>
        </div>
      </div>
        
      </div>
    </>
  )
}
