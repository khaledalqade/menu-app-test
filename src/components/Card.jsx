'use client';

import { Add, Heart, Star } from 'iconsax-react';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Popup1 from './Popup1';
import axios from 'axios';
import Image from 'next/image';
// import { AiFillHeart } from 'react-icons/ai';
{/* <AiFillHeart className="w-[14px] h-[14px]" color="black" /> */}

function Card({ food }) {



  useEffect(() => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart');
    if (typeof window !== "undefined") {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // console.log(`Key: ${key}, Value: ${value}`);
      }
    }
  }}, []);



  const [isFavorite, setIsFavorite] = useState(food.is_favorite);

  

const toggleFavorite = async () => {
    try {
        // if (typeof window !== 'undefined') {
        //   const token = localStorage.getItem('token'); // استرجاع التوكن من localStorage
        // const userId = localStorage.getItem('userId') || null; // استرجاع user_id من localStorage
        setIsFavorite(!isFavorite);

        const response = await axios.post('https://do-env.xyz/api/v1/product/favorites/store', 
        {
            account_product_id: food.id,
            user_id: localStorage.getItem('userId'),
        }, 
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن إلى الهيدر
            },
        });

        // تحديث حالة المفضلة محليًا بعد نجاح الطلب
        // setIsFavorite(!isFavorite);

        // طباعة الرسالة القادمة من السيرفر
        // if (response.data && response.data.message) {
            // console.log('Server response:', response.data.message);
        // }
    } catch (error) {
        console.error('Error updating favorite status:', error);
    }
};

  // const toggleFavorite = async () => {
  //   try {
  //       // تحديث قيمة favoriteProduct في كائن المنتج المحلي
  //       // product.favoriteProduct = false;
  //       // http://192.168.8.228:8000/api
  //       // إضافة المنتج إلى المفضلة
  //       const token = localStorage.getItem('token'); 

  //       // await axios.post('http://192.168.8.228:8000/api/v1/product/favorites/store', {
  //         await axios.post('http://do-env.xyz/api/v1/product/favorites/store', {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Accept": "application/json",
  //             // "Authorization": `Bearer ${token}`, // إضافة التوكن إلى الهيدر
  //           },
          
  //         body: JSON.stringify({
  //           account_product_id: food.id,
  //         user_id: localStorage.getItem('userId') || null,
  //           //           user_id: '12',
  //                   }),
          
  //   // user_id: localStorage.getItem('userId') || null,
  //       });
  //        // تحديث قيمة favoriteProduct في كائن المنتج المحلي
  //       //  product.favoriteProduct = true;
  //       setIsFavorite(!isFavorite);
      
     
  //   } catch (error) {
  //     console.error('Error updating favorite status:', error);
  //   }
  // };

  // ||  || {food?.id}





  const [selectedFood, setSelectedFood] = useState(null);
  const price = food.productDetails && food.productDetails.length > 0
    ? food.productDetails[0].price
    : 'غير متوفر';

  return (
    <article className="w-full h-full p-2 md:p-4 md:mx-1 rounded-lg hover:bg-white hover:shadow-lg">
      <div
        className='w-full h-24 sm:h-24 md:h-40 rounded-lg bg-cover bg-no-repeat relative'
        style={{ backgroundImage: `url(${food.image})` }}
      >
        <span onClick={toggleFavorite} className='bg-white cursor-pointer absolute left-2 top-2 p-[6px] md:p-2 rounded-full'>
        {isFavorite ? (
              <Image src='/heart.svg' alt="close" width={18} height={18} />
        ) : (
        <Heart
      
              className="w-[14px] h-[14px] md:w-[18px] md:h-[18px]"
              color="black"
              
            />
      )}
        </span>
        <div className='hidden md:flex flex-col items-start justify-center gap-1 absolute left-2 bottom-4'>
          <span className='px-3 py-1 text-white rounded-lg backdrop-blur-sm bg-black bg-opacity-40 font-semibold leading-5 text-base'>
            label
          </span>
          <div className='text-base flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-sm bg-black bg-opacity-40 font-normal leading-5'>
            <Star className="w-[14px] h-[14px] md:w-[18px] md:h-[18px]" color="white" />
            <span>4.4<sup className='text-sm'> (232)</sup></span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-start justify-start">
        <span className="block text-[15px] md:text-lg font-semibold leading-5">{food?.product?.name}</span>
        <p className=" my-2 text-[12px] line-clamp-2 md:text-sm text-gray-600">
          {food?.description}
        </p>
        <div className='flex items-center justify-between my-2 w-full'>
          <span className='text-[#227B82] text-[16px] md:text-xl font-semibold leading-5'>{price}SAR</span>
          <div onClick={() => setSelectedFood(food)} className='flex items-center cursor-pointer justify-center bg-[#227B82] gap-[2px] h-full p-2 rounded-full w-[53px] md:w-16'>
            <Add className="w-[14px] h-[14px] md:w-[18px] md:h-[18px]" color="white" />
            <span className='text-[12px] md:text-base text-white leading-5'>Add</span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedFood && (
          <Popup1
            food={selectedFood}
            productId={selectedFood.id}
            onClose={() => setSelectedFood(null)}
          />
        )}
      </AnimatePresence>
    </article>
  );
}

export default Card;
