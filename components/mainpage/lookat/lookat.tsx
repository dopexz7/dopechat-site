import React from 'react'

export const LookAtFeatures = () => {
  return (
    <>
    <div id="alookat" className='border-white border-opacity-5 lg:h-screen mx-6 lg:mx-36 flex flex-col font-bold'>
        <h1 className='text-xl lg:text-2xl font-bold tracking-tighter text-ma-pink uppercase'>A look at the extension&apos;s features</h1>
        <div className='opacity-50 mt-10 h-[calc(240 * 2)px] lg:h-3/4 flex flex-col lg:flex-row w-full space-y-3 lg:space-y-0 lg:space-x-6'>
          <div className='w-full h-60 lg:h-auto lg:w-1/4 relative flex items-center justify-center rounded-2xl'>
            <div className='h-full overflow-hidden w-full bggradient z-50 absolute top-0 left-0'></div>
            <span className='text-center rounded-b-2xl overflow-hidden bottom-0 absolute z-20 font-medium  text-xl w-full bg-ma-pink text-black py-3'>Custom emotes & chat appearance</span>
            <img alt="Custom emotes & chat appearance" className='z-10 w-full rounded-2xl h-full duration-300' src="https://i.imgur.com/PXH32YX.png"/>
          </div>
          <div className='w-full h-60 lg:h-auto relative flex items-center justify-center rounded-2xl'>
            <div className='h-full overflow-hidden w-full bggradient z-50 absolute top-0 left-0'></div>
            <span className='text-center rounded-b-2xl overflow-hidden bottom-0 absolute z-20 font-medium  text-xl w-full bg-ma-pink text-black py-6'>Theatre mode</span>
            <img alt="Theatre mode" className='z-10 w-full rounded-3xl h-full duration-300' src="https://i.imgur.com/GuqL0TJ.png"/>
          </div>
        </div>
      </div>
    </>
  )
}
