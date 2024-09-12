import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function HeaderTest() {
  return (
    <div className="w-[1224px] h-[60px] justify-start items-center gap-8 inline-flex">
  <div className="self-stretch justify-start items-center gap-6 flex">
    <div className="w-[75.33px] h-[30px] relative">
      <div className="">
      <Link href="/" className='flex gap-2'>
            <Image src='/Logo.png' alt="logo" width={80} height={32} />
          </Link>
      </div>
    </div>
    <div className="self-stretch justify-start items-center gap-3 flex">
      <div className="pl-1.5 pr-4 py-1.5 bg-[#f9f9f9] rounded-[100px] justify-start items-center gap-2.5 flex">
        <div className="self-stretch px-3 py-3.5 bg-[#227b82] rounded-[100px] shadow justify-center items-center gap-2.5 flex">
          <div className="w-6 h-6 relative">
            <div className="w-6 h-6 left-0 top-[-0px] absolute">
            </div>
            <div className="w-[47px] h-1.5 left-0 top-[34px] absolute text-white text-[5px] font-bold font-['Inter']">Created by icon 54</div>
            <div className="w-[54px] h-1.5 left-0 top-[39px] absolute text-white text-[5px] font-bold font-['Inter']">from the Noun Project</div>
          </div>
        </div>
        <div className="text-black text-sm font-medium font-['K2D'] leading-[16.84px]">Book a table</div>
      </div>
    </div>
  </div>



  
  <div className="grow shrink basis-0 h-[60px] p-[5px] bg-[#f9f9f9] rounded-[100px] justify-start items-center gap-5 flex">
    <div className="grow shrink basis-0 h-[50px] pl-3.5 pr-[19px] py-3.5 bg-white rounded-[100px] shadow justify-start items-center gap-3 flex">
      <div className="justify-start items-center gap-2.5 flex">
        <div className="w-[22px] h-[22px] bg-white justify-center items-center flex">
          <div className="w-[22px] h-[22px] relative">
          </div>
        </div>
      </div>
      <div className="w-[57px] h-[13px] text-[#9d9d9d] text-[17px] font-normal font-['K2D'] leading-tight">Search</div>
    </div>
  </div>
  <div className="justify-start items-center gap-3 flex">
    <div className="w-[50px] h-[50px] p-2 bg-[#f9f9f9] rounded-[100px] justify-center items-center gap-2.5 flex">
      <div className="text-black text-lg font-normal font-['K2D'] leading-snug">EN</div>
    </div>
    <div className="justify-start items-start gap-2 flex">
      <div className="p-[5px] bg-[#f9f9f9] rounded-[100px] justify-start items-center gap-1.5 flex">
        <div className="p-2 rounded-[100px] justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <div className="w-6 h-6 relative">
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-[5px] bg-[#f9f9f9] rounded-[100px] justify-start items-center gap-1.5 flex">
        <div className="self-stretch p-2.5 bg-[#227b82] rounded-[100px] justify-center items-center gap-2.5 flex">
          <div className="text-white text-base font-normal font-['K2D'] leading-tight">Login</div>
        </div>
        <div className="self-stretch p-2.5 bg-[#227b82]/10 rounded-[100px] justify-center items-center gap-2.5 flex">
          <div className="text-[#227b82] text-base font-normal font-['K2D'] leading-tight">Sign up</div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
