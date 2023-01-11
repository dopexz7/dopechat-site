import React from 'react'

export const LookAtFeatures = () => {
  return (
    <>
    <div id="alookat" className='border-white border-opacity-5 lg:h-screen mx-0 lg:mx-36 flex w-screen lg:w-auto flex-col font-bold'>
        <h1 className='text-2xl lg:text-2xl font-bold tracking-tighter text-ma-pink uppercase pb-7 lg:pb-0 pl-6 lg:pl-0'>A look at the extension&apos;s features</h1>
        <div className='lg:opacity-50 mt-10 h-3/4 flex flex-row w-full lg:space-x-6'>
          <div className='hidden lg:flex w-full h-60 lg:h-auto lg:w-1/4 relative items-center justify-center rounded-2xl'>
            <div className='h-full overflow-hidden w-full bggradient z-50 absolute top-0 left-0'></div>
            <span className='text-center rounded-b-2xl overflow-hidden bottom-0 absolute z-20 font-medium text-xl w-full bg-ma-pink text-black py-3'>Custom emotes & chat appearance</span>
            <img alt="Custom emotes & chat appearance" className='z-10 w-full rounded-2xl h-full duration-300' src="https://i.imgur.com/PXH32YX.png"/>
          </div>
          <div className='w-full h-60 lg:h-auto relative flex items-center justify-center lg:rounded-2xl'>
            <div className='h-full overflow-hidden w-full bggradient z-50 absolute top-0 left-0'></div>
            <span className='text-center lg:rounded-b-2xl overflow-hidden bottom-0 absolute z-20 font-medium  text-xl w-full bg-ma-pink text-black py-6'>Theatre mode</span>
            <img alt="Theatre mode" className='z-10 w-full lg:rounded-3xl h-full duration-300' src="https://i.imgur.com/GuqL0TJ.png"/>
          </div>
          
        </div>
        <div className='lg:hidden bg-ma-pink mt-3 h-64 flex items-center w-full'>
        <div className='w-[35%] h-4/5 ml-3 rounded-2xl overflow-hidden relative flex items-center justify-center'>
            <div className='h-full overflow-hidden w-full bggradient z-50 absolute top-0 left-0'></div>
            <img alt="Custom emotes & chat appearance" className='z-10 w-full rounded-2xl h-full duration-300' src="https://i.imgur.com/PXH32YX.png"/>
          
          </div>
          <span className='text-center text-lg font-bold w-full text-black py-3'>Custom emotes & chat appearance</span>
        </div>
      </div>
    </>
  )
}
