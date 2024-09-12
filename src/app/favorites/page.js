'use client';

import React, { useState, useEffect } from 'react';
// app/UserSidebar.tsxvuesax/bulk/profilevuesax/bulk/clipboard-textvuesax/bulk/edit
import { Profile } from 'iconsax-react';
import { ClipboardText } from 'iconsax-react';
import Link from 'next/link';
import { Add } from 'iconsax-react';
import { Heart } from 'iconsax-react';
import { Star } from 'iconsax-react';
import Header from "@/components/Header";
import axios from 'axios';

import Card from '@/components/Card';


// http://192.168.8.228:8000/api/v1/product/



const fetchAllProducts = () => {

    // return axios.get(`http://192.168.8.228:8000/api/v1/product?user_id=12`)
  return axios.get(`https://do-env.xyz/api/v1/product/favorites?user_id=12`,{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`, 
    },
  })
  // return axios.get(`https://do-env.xyz/api/v1/product`)
    .then(response => response.data.result.data)
    .catch(error => {
      console.error('Error fetching products:', error);
      return [];
    });
};





const UserSidebar = () => {


  const [isFavorite, setIsFavorite] = useState();
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    fetchAllProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //   const token = localStorage.getItem('token'); 
  //   const response = await fetch('http://do-env.xyz/api/v1/product/favorites', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json',
  //           "Authorization": `Bearer ${token}`, 
  //         },
  //         body: JSON.stringify({
  //           user_id: '12',
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);



  // const toggleFavorite = async () => {
  //   try {
  //     setIsFavorite(!isFavorite);
  //       // تحديث قيمة favoriteProduct في كائن المنتج المحلي
  //       // product.favoriteProduct = false;
      
  //       // إضافة المنتج إلى المفضلة
  //       await axios.post('https://do-env.xyz/api/v1/product/favorites/store', {
  //         account_product_id: food.id,
  //         user_id: localStorage.getItem('userId') || null,
  //   // user_id: localStorage.getItem('userId') || null,
  //       });
  //        // تحديث قيمة favoriteProduct في كائن المنتج المحلي
  //       //  product.favoriteProduct = true;
      
     
  //   } catch (error) {
  //     console.error('Error updating favorite status:', error);
  //   }
  // };





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



    <div className="bg-[#FAFAFA] shadow-md col-span-3 w-[74%] h-full gap-[20px] rounded-[16px]">
      <div className="flex items-center justify-between p-5 ">
        <div className="text-lg font-bold leading-[22px]">Favorite products
         
        </div>

      </div>
      <div className="w-full h-full">
      {/* <div className="w-full h-full bg-orange-500">fghxdfgjsfgtj</div> */}
      <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4  mb-4">
        {products.map((product) => (
          <Card key={product.id} food={product} />
        ))}
      </div>
    </div>
     <div className='grid grid-cols-3 p-3 h-full rounded-[12px] bg-[#FAFAFA]'>
    
{/*     
     <article className="w-[17.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>


        <article className="w-[17.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>



        <article className="w-[17.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>






    
        <article className="w-[18.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>



    
        <article className="w-[18.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>



    
        <article className="w-[18.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>



    
        <article className="w-[18.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>



    
        <article className="w-[18.62rem] h-[17.57rem] my-1 bg-white p-[0.50rem] mx-[0.12rem] rounded-[0.75rem]">
          <div className='w-[17.62rem] h-[9.87rem] rounded-[0.75rem] bg-[url(/Frame.png)] bg-cover bg-no-repeat relative'>
            <span className='bg-white absolute left-[0.37rem] top-[0.37rem] p-[0.37rem] rounded-full'><Heart size="18" color="black" /></span>
            <div className='flex flex-col items-start justify-center gap-1 absolute left-[0.37rem] top-[5.87rem]'>
              <span className='px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-semibold leading-[120.3%] text-[1rem]'>label</span>
              <div className='text-[1rem] flex gap-1 px-3 py-1 text-white rounded-lg backdrop-blur-[2px] bg-black bg-opacity-40 font-normal leading-[120.3%]'>
                <Star size="18" color="white" /><span className=''>
                  4.4<sup className='text-[0.75rem]'> (232)</sup></span>
              </div>
            </div>
          </div>
          <div className="mt-[0.50rem] flex flex-col items-start justify-start">
            <span className="block text-lg font-semibold leading-[120.3%]">Dumplings</span>
            <span className=" block my-[0.25rem] text-[0.93rem] font-normal leading-[18px] text-gray-600">
              steamed or boiled dough pockets often filled with meat or vegetables
            </span>
            <div className='flex items-center justify-between  my-[0.25rem] w-full'>
              <span className='text-[#227B82] text-[1.25rem] font-semibold leading-[120.3%]'>20SAR</span>
              <div className=' flex items-center justify-center bg-[#227B82] h-full p-1 rounded-full w-[65px]'>
                <Add size="18" color="white" />
                <span className='text-base text-white leading-[120%]"'>Add</span>
              </div>
            </div>
          </div>
        </article>
 */}











     </div>
    </div>
      </div>
      </div>
    
  );
};

export default UserSidebar;
