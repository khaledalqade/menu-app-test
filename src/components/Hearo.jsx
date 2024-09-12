'use client';



import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check the screen size when the component mounts
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row mt-[2rem] items-center justify-between md:justify-start h-[213px] md:h-[208px] bg-[#FAFAFA] rounded-2xl gap-[16px] py-[12px] px-[7px] md:py-6 md:px-6 md:gap-6 md:rounded-xl">

      <div className='flex flex-col justify-start w-full  md:w-44 md:my-[3rem] items-start'>
      <h2 className="text-[24px] md:text-[3rem]">Offers</h2>

      <p className="text-[16px] md:text-[1.25rem] text-[#666666]">Unmissable Amazing Deals!</p>
      </div>
      <div className="w-full flex h-[128px]  md:h-full gap-[12px] md:gap-[1.25rem] overflow-hidden rounded-xl  bg-[#FAFAFA]">

      {isMobile ? (
          <>
            <Image src='/imag1.png' alt="logo" className='rounded-xl' width={311} height={128} />
            <Image src='/imag1.png' alt="logo" className='rounded-xl' width={311} height={128} />
            <Image src='/imag1.png' alt="logo" className='rounded-xl' width={311} height={128} />
          </>
        ) : (
          <>
            <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} />
            <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} />
            <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} />
          </>
        )}






        {/* <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} />
        <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} /> */}
      {/* <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
      <Image
        src="/imag1.png"
        alt="logo"
        className="rounded-xl"
        width={586}
        height={160}
        layout="responsive"
      />
     
    </div> */}
        {/* <Image src='/imag1.png' alt="logo" className='rounded-xl' width={311} height={128} />
        <Image src='/imag1.png' alt="logo" className='rounded-xl' width={311} height={128} />
        <Image src='/imag1.png' alt="logo" className='rounded-xl' width={311} height={128} /> */}


        {/* <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} />
        <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} />
        <Image src='/imag1.png' alt="logo" className='rounded-xl' width={586} height={160} />  */}



      </div>

    </section>
  )
}

export default Hero