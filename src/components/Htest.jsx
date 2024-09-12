'use client';



import Image from 'next/image';



import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Htest = () => {

  return (
    <div
     className='w-full h-full'
    >
    <div className="h-[110px] p-2 bg-[#f9f9f9] w-full rounded-3xl justify-start items-center gap-2 inline-flex">
  <div className="grow shrink basis-0 self-stretch justify-start items-center gap-3 flex">
    <Image width={198} height={94} className="w-[198px] h-[94px] relative rounded-[18px]" src="/image.png" alt='image' />
    <div className="grow shrink basis-0 h-[94px] px-4 py-[7px] bg-white rounded-[18px] flex-col justify-center items-start gap-3 inline-flex">
      <div className="justify-center items-start gap-[7px] inline-flex">
        <div className="text-[#227b82] text-xl font-semibold font-['K2D'] leading-normal">Goodies Restaurant (Branch 2)</div>
        <div className="w-[109px] h-1.5 text-[#34c759] text-base font-normal font-['K2D'] leading-snug">Open until 1:00</div>
      </div>
      <div className="justify-center items-center gap-1.5 inline-flex">
        <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">Breakfast</div>
        <div className="w-[5px] h-[5px] relative bg-[#adaaaa] rounded-[5px]" />
        <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">Lunch</div>
        <div className="w-[5px] h-[5px] relative bg-[#adaaaa] rounded-[5px]" />
        <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">Dinner</div>
      </div>
      <div className="h-[13px] justify-center items-center gap-1.5 inline-flex">
        <div className="w-4 h-4 justify-center items-center flex">
          <div className="w-4 h-4 relative">
          </div>
        </div>
        <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
      </div>
    </div>
  </div>
  <div className="self-stretch justify-start items-center gap-2 flex">
    <div className="w-32 self-stretch px-2.5 pt-5 bg-[#227b82] rounded-[18px] flex-col justify-start items-center gap-4 inline-flex">
      <div className="w-6 h-6 justify-center items-center inline-flex">
        <div className="w-6 h-6 relative">
          <div className="w-[18px] h-[17.98px] left-[3px] top-[3.01px] absolute">
          </div>
        </div>
      </div>
      <div className="text-white text-base font-normal font-['K2D'] leading-tight">Change branch</div>
    </div>
    <div className="w-[132px] self-stretch px-2.5 pt-5 bg-[#227b82]/10 rounded-[18px] flex-col justify-start items-center gap-4 inline-flex">
      <div className="w-6 h-6 justify-center items-center inline-flex">
        <div className="w-6 h-6 relative">
        </div>
      </div>
      <div className="text-[#227b82] text-base font-normal font-['K2D'] leading-tight">Branch location</div>
    </div>
  </div>
</div>
{/* <div className="h-[222px]  pt-5 pb-4 bg-white border-b-2 border-[#f7f7f7] flex-col justify-start items-center gap-4 inline-flex  w-full">
  <div className="w-full justify-start items-center gap-8 inline-flex">
    <div className="self-stretch justify-start items-center gap-6 flex">
      <div className="w-[75.33px] h-[30px] relative">
        <div className="w-[25.35px] h-[25.44px] left-[-0px] top-[2.44px] absolute">
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
      <div className="justify-start items-start gap-2.5 flex">
        <div className="p-[5px] bg-[#f9f9f9] rounded-[100px] justify-start items-center gap-1.5 flex">
          <div className="p-2 rounded-[100px] justify-start items-start gap-2.5 flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative">
              </div>
            </div>
          </div>
          <div className="w-[34px] h-[34px] justify-center items-center gap-2.5 flex">
            <div className="p-2 rounded-[100px] justify-start items-start gap-2.5 flex">
              <div className="w-6 h-6 justify-center items-center flex">
                <div className="w-6 h-6 relative">
                </div>
              </div>
            </div>
          </div>
          <div className="w-[34px] h-[34px] justify-center items-center gap-2.5 flex">
            <div className="w-10 h-10 p-2 bg-[#227b82]/10 rounded-[100px] justify-center items-center gap-2.5 flex">
              <div className="text-center text-[#227b82] text-base font-medium font-['K2D'] leading-tight">MA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="self-stretch p-2 bg-[#f9f9f9] rounded-3xl justify-start items-center gap-2 inline-flex">
    <div className="grow shrink basis-0 self-stretch justify-start items-center gap-3 flex">
      <img className="w-[168px] h-[94px] relative rounded-[18px]" src="https://via.placeholder.com/168x94" />
      <div className="grow shrink basis-0 h-[94px] px-4 py-[7px] bg-white rounded-[18px] flex-col justify-center items-start gap-3 inline-flex">
        <div className="justify-center items-start gap-[7px] inline-flex">
          <div className="text-[#227b82] text-xl font-semibold font-['K2D'] leading-normal">Goodies Restaurant (Branch 2)</div>
          <div className="w-[109px] h-1.5 text-[#34c759] text-base font-normal font-['K2D'] leading-snug">Open until 1:00</div>
        </div>
        <div className="justify-center items-center gap-1.5 inline-flex">
          <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">Breakfast</div>
          <div className="w-[5px] h-[5px] relative bg-[#adaaaa] rounded-[5px]" />
          <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">Lunch</div>
          <div className="w-[5px] h-[5px] relative bg-[#adaaaa] rounded-[5px]" />
          <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">Dinner</div>
        </div>
        <div className="h-[13px] justify-center items-center gap-1.5 inline-flex">
          <div className="w-4 h-4 justify-center items-center flex">
            <div className="w-4 h-4 relative">
            </div>
          </div>
          <div className="text-[#adaaaa] text-base font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
        </div>
      </div>
    </div>
    <div className="self-stretch justify-start items-center gap-2 flex">
      <div className="w-32 self-stretch px-2.5 pt-5 bg-[#227b82] rounded-[18px] flex-col justify-start items-center gap-4 inline-flex">
        <div className="w-6 h-6 justify-center items-center inline-flex">
          <div className="w-6 h-6 relative">
            <div className="w-[18px] h-[17.98px] left-[3px] top-[3.01px] absolute">
            </div>
          </div>
        </div>
        <div className="text-white text-base font-normal font-['K2D'] leading-tight">Change branch</div>
      </div>
      <div className="w-[132px] self-stretch px-2.5 pt-5 bg-[#227b82]/10 rounded-[18px] flex-col justify-start items-center gap-4 inline-flex">
        <div className="w-6 h-6 justify-center items-center inline-flex">
          <div className="w-6 h-6 relative">
          </div>
        </div>
        <div className="text-[#227b82] text-base font-normal font-['K2D'] leading-tight">Branch location</div>
      </div>
    </div>
  </div>
</div> */}
    </div>
  );
};

export default Htest;

