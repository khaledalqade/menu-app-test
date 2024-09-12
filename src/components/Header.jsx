'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Location } from 'iconsax-react';
import { ArrowDown2 } from 'iconsax-react';
import { SearchNormal } from 'iconsax-react';
import { ShoppingCart } from 'iconsax-react';
import { Notification } from 'iconsax-react';
import { Profile } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import CartPopup from './CartPopup'; // استيراد CartPopup
// import MapComponent from "./Moov";
import MapComponent from "./Moov";
function Header() {
  const [move, setMove] = useState(false);
  const [focused, setFocused] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // يمكن الوصول إلى localStorage فقط على جانب العميل
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
    }
  }, []);





  const toggleCartPopup = () => {
    setIsCartPopupOpen(!isCartPopupOpen);
  };

  const closeCartPopup = () => {
    setIsCartPopupOpen(false);
  };




  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);


  return (
    <>
      <header className="flex border-b-2 border-[#FAFAFA]  items-center justify-between h-[91px] w-full">
        <div className="flex items-center gap-5">
          <Link href="/" className='flex gap-2'>
            <Image src='/Logo.png' alt="logo" width={80} height={32} />
          </Link>
          <div className='bg-[#FAFAFA] flex items-center justify-start p-1 rounded-full relative'>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: move ? "100%" : "-0%" }}
              transition={{ type: "spring", stiffness: 20, damping: 25 }}
              className="w-[89px] h-[40px] rounded-full bg-white absolute "
            />
            <button onClick={() => setMove(true)} className="px-4 py-2 z-10 text-[1rem] rounded-full">delivery</button>
            <button onClick={() => setMove(false)} className="px-4 py-2 text-[1rem] z-10 rounded-full">delivery</button>
          </div>
        </div>



        {/* <div className="flex items-center justify-start rounded-full h-[50px] gap-1 pl-3 pr-1 bg-[#FAFAFA] flex-grow mx-4 sm:mx-6 lg:mx-8">
          <Location size="18" color="black" />
          <span onClick={openPopup} className='text-[1rem] cursor-pointer'>Location</span>
         
      {isPopupOpen && (
                <MapComponent onClose={closePopup} />

      )}
          <ArrowDown2 size="18" color="black" />
          <div className="relative flex items-center py-1 w-full h-full">
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: focused ? 472 : 48 }}
              transition={{ type: "spring", stiffness: 20, damping: 10 }}
              className={`w-9 h-9 flex items-center justify-center rounded-full absolute ${focused ? ' bg-blue-100' : ''}`}
            >
              <SearchNormal size="18" color="rgb(158, 158, 158)" />
            </motion.div>
            <input
              type="text"
              className="h-[46px] w-[100%] ml-10 pl-10 my-1 outline-none rounded-full"
              placeholder="Search"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </div>
        </div> */}

        <div className="flex items-center justify-center gap-3">
          <div
            className='flex items-center justify-center h-[50px] rounded-full gap-3 py-4 px-3 bg-[#227B82] cursor-pointer'
            onClick={toggleCartPopup}
          >
            <ShoppingCart size="18" color="white" />
            <span className='text-white text-[1rem]'>{cart.length}</span>
          </div>

          <div className='flex items-center justify-center h-[50px] rounded-full gap-5 py-3 px-4 bg-[#FAFAFA]'>
            <Link href="/account" >
            <Notification size="18" color="black" />
            </Link>
            <Link href="/log-in" className='flex gap-2'>
              <Profile size="18" color="black" />
            </Link>
          </div>
        </div>
      </header>

      {isCartPopupOpen && <CartPopup onClose={closeCartPopup} />}
    </>
  );
}

export default Header;
