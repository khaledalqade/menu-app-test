'use client';





import { Profile } from 'iconsax-react';
import { ClipboardText } from 'iconsax-react';
import { Edit } from 'iconsax-react';

import Link from 'next/link';
import Header from "@/components/Header";
import InputComponent from '@/components/InputCom';
const UserSidebar = () => {
  return (
    <div className='flex flex-col items-center justify-center px-[7.5%]'>
    <Header />
        <div className='flex w-full items-start justify-center gap-6'>
        <div className="bg-[#FAFAFA] shadow-md rounded-lg p-2">
      <div className="flex bg-white items-center w-[272px] h-[60px] pt-[6px] gap-[10px] rounded-[12px] border-b">
        <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center">
          <Profile size={24} color='#227B82'/>
        </div>
        <div className="ml-4">
          <p className="text-gray-900 font-semibold">Mohammed Al-Bishery</p>
        </div>
      </div>









      <div className="w-[272px] h-[228px] flex flex-col items-center justify-center pt-[6px] mt-3 gap-[6px] rounded-[12px] border-b bg-white">
          <div className='w-[260px] h-[48px] p-[12px] px-[10px] gap-[10px] rounded-[8px] hover:bg-[#227B8233] bg-[#227B8233]'>
            <Link href="account" className='flex gap-2'>
              <Profile size={24} color='#227B82' />
              <span className="text-sm text-[#227B82] font-medium leading-[22px]">
                My account
              </span>
            </Link>
          </div>
          <div className='w-[260px] h-[48px] p-[12px] px-[10px]  hover:bg-gray-100 gap-[10px] rounded-[8px] bg-[#FAFAFA]'>
            <Link href="/order" className='flex gap-2'>
              <ClipboardText size={24} color='#595959' />
              <span className="text-sm text-[#595959] font-medium leading-[22px]">
                My order
              </span>
            </Link>
          </div>
          <div className='w-[260px] h-[48px] p-[12px] px-[10px] gap-[10px]  hover:bg-gray-100 rounded-[8px] bg-[#FAFAFA]'>
            <Link href="/address" className='flex gap-2'>
              <ClipboardText size={24} color='#595959' />
              <span className="text-sm text-[#595959] font-medium leading-[22px]">
                My address
              </span>
            </Link>
          </div>
          <div className='w-[260px] h-[48px] p-[12px] px-[10px] hover:bg-gray-100 gap-[10px] rounded-[8px] bg-[#FAFAFA]'>
            <Link href="/favorites" className='flex gap-2'>
              <ClipboardText size={24} color='#595959' />
              <span className="text-sm text-[#595959] font-medium leading-[22px]">
                Favorite products
              </span>
            </Link>
          </div>
        </div>

        <div className="w-[910px] h-[404px] pt-5 flex-col justify-start items-start gap-2.5 inline-flex">
  <div className="self-stretch h-96 p-3 bg-[#f9f9f9] rounded-2xl flex-col justify-start items-start gap-5 flex">
    <div className="self-stretch justify-end items-start gap-2.5 inline-flex">
      <div className="grow shrink basis-0 text-black text-xl font-bold font-['K2D'] leading-snug">My account</div>
      <div className="p-2 bg-[#227b82] rounded-lg justify-end items-center gap-2.5 flex">
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative">
          </div>
        </div>
        <div className="w-[26px] h-[19px] text-white text-sm font-medium font-['K2D'] leading-snug">Edit</div>
      </div>
    </div>
    <div className="self-stretch p-3 bg-white rounded-xl justify-start items-start gap-3 inline-flex">
      <div className="w-[201px] self-stretch p-3 bg-white rounded border border-[#d0d5dd] flex-col justify-center items-center gap-2 inline-flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-center items-center gap-2.5 flex">
          <div className="w-6 h-6 px-0.5 pt-[2.98px] pb-[3px] justify-center items-center inline-flex">
            <div className="w-5 h-[18.02px] relative">
            </div>
          </div>
          <div className="self-stretch text-center text-[#191d23] text-sm font-medium font-['Lato']">Drag and drop your photo here, or click to upload</div>
        </div>
      </div>
      <div className="grow shrink basis-0 h-[276px] flex-col justify-start items-start gap-3 inline-flex">
        <div className="self-stretch grow shrink basis-0 px-3.5 py-4 bg-[#f9f9f9] rounded-xl justify-start items-center gap-2.5 inline-flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="flex-col justify-center items-start gap-2.5 inline-flex">
              <div className="text-[#227b82] text-[13px] font-semibold font-['K2D'] leading-none">Name</div>
              <div className="text-black text-base font-semibold font-['K2D'] leading-tight">Mohammed Al-bishery</div>
            </div>
          </div>
        </div>
        <div className="self-stretch grow shrink basis-0 px-3.5 py-4 bg-[#f9f9f9] rounded-xl justify-start items-center gap-2.5 inline-flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="flex-col justify-center items-start gap-2.5 inline-flex">
              <div className="text-[#227b82] text-[13px] font-semibold font-['K2D'] leading-none">Phone number</div>
              <div className="text-black text-base font-semibold font-['K2D'] leading-tight">+967-770819441</div>
            </div>
          </div>
        </div>
        <div className="self-stretch grow shrink basis-0 px-3.5 py-4 bg-[#f9f9f9] rounded-xl justify-start items-center gap-2.5 inline-flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="flex-col justify-center items-start gap-2.5 inline-flex">
              <div className="text-[#227b82] text-[13px] font-semibold font-['K2D'] leading-none">Address</div>
              <div className="text-black text-base font-semibold font-['K2D'] leading-tight">Riyadh</div>
            </div>
          </div>
        </div>
        <div className="self-stretch grow shrink basis-0 px-3.5 py-4 bg-[#f9f9f9] rounded-xl justify-start items-center gap-2.5 inline-flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="flex-col justify-center items-start gap-2.5 inline-flex">
              <div className="text-[#227b82] text-[13px] font-semibold font-['K2D'] leading-none">City name</div>
              <div className="text-black text-base font-semibold font-['K2D'] leading-tight">Riyadh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




    </div>



    <div className="bg-[#FAFAFA] shadow-md col-span-3 w-[74%] h-[240px] p-[12px] gap-[20px] rounded-[16px]">
      <div className="flex items-center justify-between mb-6 ">
        <div className="text-lg font-bold leading-[22px]">My account
         
        </div>
        <div className="w-[76px] h-[40px] pt-[8px] cursor-pointer flex gap-2 rounded-[8px] bg-[#227B82]">
        <Edit size={24} color='white' className='ml-1'/>
         <span className='text-sm font-medium leading-[22px] text-white'>Edit</span>
        </div>
      </div>



     <div className='w-full h-fit fiex  p-3 rounded-[12px] bg-white'>
      {/* <div className='w-[587px] h-[60px] p-3 bg-[#FAFAFA] rounded-[12px]'>
        <p className='text-xs font-semibold leading-[15.64px] text-[#848484]'>Name</p>
        <p className='text-base font-semibold leading-[19.25px] mt-1 text-black'>Mohammed Al-bishery</p>
      </div>
      <div className='w-[587px] h-[60px] mt-3 p-3 bg-[#FAFAFA] rounded-[12px]'>
        <p className='text-xs font-semibold leading-[15.64px] text-[#848484]'>Phone number</p>
        <p className='text-base font-semibold leading-[19.25px] mt-1 text-black'>+967-770819441</p>
      </div> */}
      <InputComponent />
     </div>


     
    </div>
      </div>
      </div>
  );
};

export default UserSidebar;
