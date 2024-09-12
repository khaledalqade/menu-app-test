'use client';

import { useState, useEffect } from 'react';
import { Profile, ClipboardText } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/Header";
import axios from 'axios';
import CustomSlider from '@/components/OrderCards';



// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://do-env.xyz/api/v1';



const UserSidebar = () => {
  const [orderData, setOrderData] = useState(null);
  // const orderId = localStorage.getItem('userId') || 1; // يمكنك تغيير معرف الطلب هنا

  useEffect(() => { 

    const fetchOrderData = async () => {
      try {
          // http://do-env.xyz/api/v1
  const token = localStorage.getItem('token'); 

        const response = await axios.get(`https://do-env.xyz/api/v1/order?id=${localStorage.getItem('userId')}`, {
          // const response = await axios.get(`http://do-env.xyz/api/v1/order?user_id=${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن إلى الهيدر
          },
       
        });
        if (response.data.success) {
          setOrderData(response.data.result.data);
          // console.log("api/v1/order", response.data);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center px-[7.5%]'>
      <Header />
      <div className='flex w-full items-start justify-center gap-6'>
        <div className="bg-[#FAFAFA] shadow-md rounded-lg p-2">
          <div className="flex bg-white items-center w-[272px] h-[60px] pt-[6px] gap-[10px] rounded-[12px] border-b">
            <div className="w-11 h-11 bg-gray-200 rounded-full flex items-center justify-center">
              <Profile size={24} color='#227B82' />
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
            <div className='w-[260px] h-[48px] p-[12px] px-[10px] hover:bg-gray-100 gap-[10px] rounded-[8px] bg-[#FAFAFA]'>
              <Link href="/order" className='flex gap-2'>
                <ClipboardText size={24} color='#595959' />
                <span className="text-sm text-[#595959] font-medium leading-[22px]">
                  My order
                </span>
              </Link>
            </div>
            <div className='w-[260px] h-[48px] p-[12px] px-[10px] hover:bg-gray-100 gap-[10px] rounded-[8px] bg-[#FAFAFA]'>
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
        </div>

        <div className="bg-[#FAFAFA] shadow-md col-span-3 w-[74%] h-full p-[12px] gap-[20px] rounded-[16px]">
          <div className="flex items-center justify-between mb-6 ">
            <div className="text-lg font-bold leading-[22px]">My order</div>
          </div>
          {orderData ? (
            <div className='w-full h-fit grid grid-cols-1 p-3 rounded-[12px] bg-white'>
              {orderData.map((order) => (
                <div key={order.id} className='w-full mb-4'>
                  <div className='w-full mb-2 flex h-[63px] items-center justify-between py-3 px-12 bg-[#FAFAFA] rounded-[12px]'>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='text-xs font-semibold leading-[15.64px] text-[#848484]'>Order Number</p>
                      <p className='text-base font-semibold leading-[19.25px] mt-1 text-black'>#{order.id}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='text-xs font-semibold leading-[15.64px] text-[#848484]'>Total Price</p>
                      <p className='text-base font-semibold leading-[19.25px] mt-1 text-black'>{order.total}SAR</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='text-xs font-semibold leading-[15.64px] text-[#848484]'>Order Date</p>
                      <p className='text-base font-semibold leading-[19.25px] mt-1 text-black'>{order.date}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='text-xs font-semibold leading-[15.64px] text-[#848484]'>Status</p>
                      <p className='text-base font-semibold leading-[19.25px] mt-1 text-black'>{order.status}</p>
                    </div>
                  </div>
                  <CustomSlider orderData={order.order_details} />
                 
                </div>
              ))}
              
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
