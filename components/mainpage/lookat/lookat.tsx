import React, { useState } from 'react'
import { lookFeatures } from './lookData'
export const LookAtFeatures = () => {
  const [active, setActive] = useState('customChat');

  return (
    <>
    <div className='lg:h-screen mx-0 lg:mx-0 lg:ml-36 flex w-screen lg:w-auto flex-col  font-bold'>
      <div className='flex flex-col justify-center h-full w-full'>
        <h1 className='text-2xl lg:text-2xl font-bold tracking-tighter text-ma-pink uppercase pl-6 lg:pl-0'>A look at the extension&apos;s features</h1>
        <div className='flex items-center w-full mt-3'>
        <div className='mt-10 items-center mr-auto h-max  pb-24 lg:pb-0 lg:border-r-[1px] border-opacity-5 border-white  w-screen max-w-xl flex flex-col justify-center font-bold'>
          <div className='flex flex-col space-y-3 lg:space-y-6 w-full '>
              {lookFeatures.map((v,index)=>(
                <div key={index} onClick={()=>setActive(v.metaTitle)} className={`${active === v.metaTitle ? 'border-r-2 border-ma-pink' : ''} w-full flex flex-col lg:block p-6 lg:p-0 lg:bg-inherit bg-ma-pink text-black lg:text-white group text-sm font-bold space-y-1 cursor-pointer`}>
                  {v.desc}
                  <div className={`${active === v.metaTitle ? 'text-ma-pink' : ''} w-[90%] lg:group-hover:text-ma-pink text-center lg:text-left duration-300 text-xl lg:text-lg font-bold lg:font-medium tracking-wider`}>{v.body}</div>
                  <div className='uppercase opacity-50'>{v.title}</div>
                </div>
              ))}
          </div>
        </div>
        <div className='lg:opacity-50  mt-10 h-3/4 justify-center items-center flex w-full pl-6'>
          <div className=' w-full h-60 lg:h-auto relative flex items-center justify-center lg:rounded-l-3xl overflow-hidden'>
          <div className="h-full overflow-hidden w-full bggradient z-50 absolute top-0 left-0"/>
          <img alt="Custom chat appearance & customization" className='z-10 w-full lg:round3xl h-full duration-300' src={lookFeatures.filter((v) => v.metaTitle === active)[0].image}/>
          </div>
        </div>
        </div>
        <div className='lg:hidden bg-ma-pink mt-3 h-64 flex items-center w-full'>
            <div className='w-[35%] h-4/5 ml-3 round2xl overflow-hidden relative flex items-center justify-center'>
              <div className='h-full overflow-hidden w-full   z-50 absolute top-0 left-0'></div>
              <img alt="Custom emotes & chat appearance" className='z-10 w-full round2xl h-full duration-300' src="https://i.imgur.com/PXH32YX.png"/>
            </div>
            <span className='text-center text-lg font-bold w-full text-black py-3'>Custom emotes & chat appearance</span>
        </div>

      </div>
        
      </div>
    </>
  )
}
