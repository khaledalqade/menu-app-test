'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Profile } from 'iconsax-react';
import { ClipboardText } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/Header";
import MapAdderess from '@/components/Map';
import MapAdderessupdet from '@/components/AddressUpdet';



const UserSidebar = () => {
  const [addresses, setAddresses] = useState([]);
  // http://do-env.xyz/api/v1
  useEffect(() => {
    const fetchData = async () => {
      try {
const response = await axios.get('https://do-env.xyz/api/v1/address', {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    // "user_id": userId, // إضافة user_id إلى الهيدر
    // "userId": userId, // إضافة user_id إلى الهيدر
    "Authorization": `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن إلى الهيدر
  },
});

        // console.log(response.data.result.data);
        console.log(response.data);
        setAddresses(response.data.result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);





  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);


  const [isPopupOpenaddres, setIsPopupOpenaddres] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // const openPopupaddres = () => setIsPopupOpenaddres(true);
  const openPopupaddres = (address) => {
    setSelectedAddress(address);
    setIsPopupOpenaddres(true);
  };
  const closePopupaddres = () => setIsPopupOpenaddres(false);



  //  addres

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
        </div>

        <div className="bg-[#FAFAFA] shadow-md col-span-3 w-[74%] h-fit p-[12px] gap-[20px] rounded-[16px]">
          <div className="flex items-center justify-between mb-6 ">
            <div className="text-lg font-bold leading-[22px]">My address</div>
            <div onClick={openPopup} className="w-[168px] h-[40px] p-[8px] cursor-pointer flex items-center  gap-[10px] rounded-[8px] bg-[#227B82]">
              <Image src="/add-square.svg" height={24} width={24} alt='add square' />
              <span className='text-sm font-medium leading-[22px] text-white'>Add a new address</span>
            </div>
          </div>



          {isPopupOpen && (
                <MapAdderess onClose={closePopup} />

      )}



          <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-3'>
            {addresses.map((address) => (
              <div key={address.id} className='w-full h-[154px] gap-[10px] flex flex-col p-3 rounded-[12px] bg-white'>
                <div className='flex items-center justify-between rounded-[12px]'>
                  <div className='flex items-center gap-2'>
                    <Image src="/loc.png" height={44} width={44} alt='log' />
                    <div className='flex flex-col items-start justify-center'>
                      <p className='text-[16px] font-semibold text-black'>{address.title}</p>
                      <p className='text-sm font-medium mt-1 text-[#595959]'>{address.city}</p>
                    </div>
                  </div>
                  <Image   onClick={() => openPopupaddres(address)} src="/add.png" height={44} width={44} alt='add' />

                  {isPopupOpenaddres && selectedAddress && (
    <MapAdderessupdet onClose={closePopupaddres} addres={selectedAddress} aaddres={address.id} />

)}



                </div>
                <p className='text-sm font-medium text-[#595959]'>{address.description}</p>
                <div className='flex flex-col items-start justify-center gap-1'>
                  <p className='text-sm font-medium text-[#595959]'>phone number</p>
                  <p className='text-[16px] font-semibold text-black'>{address.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
