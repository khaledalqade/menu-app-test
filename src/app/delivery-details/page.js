'use client';
import { useState, useEffect } from 'react';
import { ArrowCircleRight, ClipboardText } from 'iconsax-react';
import Image from 'next/image';
import Header from '@/components/Header';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MapAdderess from '@/components/Map';


// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://do-env.xyz/api/v1';



function Page() {
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false); // حالة لعرض الرسالة
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupError, setPopupError] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // حالة لعرض تفاصيل البيانات
  const [isExpanded, setIsExpanded] = useState(false);
  const handleBasketSummaryClick = () => {
    setIsExpanded(!isExpanded);
};



  useEffect(() => {
        if (typeof window !== 'undefined') {
          // استرجاع البيانات من localStorage عند تحميل الصفحة
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  setCart(storedCart);
    // console.log('cart', storedCart);
  }}, []);

  const handleConfirmOrder = () => {
    // هنا يمكنك تنفيذ أي شيء إضافي عند تأكيد الطلب
    setOrderConfirmed(true); // تغيير الحالة عند النقر على زر "Conform"
  };






  const addToCart = () => {

        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart');
        
        };
  
    const orderDetailsOptions = {
      total: cart.reduce((total, order) => total + order.order_details.reduce((sum, detail) => sum + detail.quantity_total, 0), 0),
      type: "delivery",
      address_id: null,
    restaurant_table_id: null,
    branch_id: null,
    user_id: localStorage.getItem('user_id'),
    // user_id: localStorage.getItem('userId') || null,
    // user_id: localStorage.getItem('token') || null,
    // token
      user_information: "{\"name\":\"John Doe\",\"phone\":\"1234567890\",\"address\":{\"city_id\":1,\"description\":\"Near the big park\",\"title\":\"Home\",\"latitude\":40.7128,\"longitude\":-74.0060,\"building_no\":\"123\",\"floor\":\"4\",\"department_no\":\"12A\",\"notes\":\"Ring the bell twice\"}}",
      order_details: cart.flatMap(order =>
        order.order_details.map(detail => ({
          account_product_detail_id: detail.account_product_detail_id,
          quantity: detail.quantity,
          quantity_total: detail.quantity_total,
          order_details_options: detail.order_details_options.map(option => ({
            option_extra_id: option.option_extra_id,
            quantity: option.quantity,
            quantity_total: option.quantity_total,
          }))
        }))
      )
    };
  
    const updatedCart = [orderDetailsOptions];
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));};
    // console.log("orderDetailsOptions", orderDetailsOptions);
    // console.log("Options", cart);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');};
    return orderDetailsOptions;
  };





  const sendOrder = async () => {
    const orderDetailsOptions = addToCart();

    try {
          const response = await fetch(`https://do-env.xyz/api/v1/order/store`, {
        method: 'POST',
     
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // إضافة التوكن إلى الهيدر
        },
        body: JSON.stringify(orderDetailsOptions),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      // console.log('Order submitted successfully:', result);
      setPopupMessage(result.message);
      setPopupError(false);
      setCart([]);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart');};
      setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2000);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setPopupMessage(error.message || 'An error occurred while submitting your order. Please try again.');
      setPopupError(true);
      // setCart([]);
      // localStorage.removeItem('cart');
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 3000);
    }
  };
  
  

     // حساب المجموع الكامل
     const calculateTotal = () => {
      return cart.reduce((total, item) => {
          const itemTotal = item.order_details.reduce((itemAcc, detail) => {
              const optionsTotal = detail.order_details_options.reduce((optionsAcc, option) => {
                  return optionsAcc + (option.unit_price * option.quantity);
              }, 0);
              return itemAcc + (parseFloat(detail.unit_price) * detail.quantity) + optionsTotal;
          }, 0);
          return total + itemTotal;
      }, 0);
  };

  const totalAmount = calculateTotal();







  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);




  return (
    <div className='flex flex-col items-center justify-center px-[7.5%]'>
      <Header />
      <div className="w-full min-h-screen flex mt-6 items-start justify-between">
        <div className="w-[66.01%] rounded-2xl flex flex-col p-3 bg-[#FAFAFA]">
          <div className="bg-white flex flex-col w-full h-full mb-3 pt-[6px] pb-5 px-5 rounded-2xl">
            <div className="w-full  flex items-center mb-1 justify-between">
              <div className="text-lg font-bold text-[#227B82]">
                Delivery details
              </div>
              <div className="w-[10.12rem] rounded-full h-[2.87rem] flex items-center justify-around bg-[#FAFAFA]">
                <span className="text-black text-sm">Takeaway</span>
                <span className="text-sm text-[#595959]">Dine-in</span>
              </div>
            </div>
            <div className="w-full h-[2px] mb-5 mt-1 bg-[#FAFAFA]"></div>
            
            <div className="w-full h-[57px] rounded-lg bg-[#FAFAFA] p-2 flex items-center justify-between mr-1">
            <div className="flex items-center justify-start">
            <input type="checkbox" className="accent-[#227B82] w-[18px] h-[18px] rounded m-[11px]" />
              <div className="flex flex-col justify-center items-center">
                <span className="text-[16px] font-semibold text-black">Without delivery</span>
                <p className="text-sm font-medium text-[#808080]">Without delivery</p>
              </div>
            </div>
              <div onClick={openPopup} className="w-[198px] h-[54px] py-[11px] px-[10px] cursor-pointer flex items-center  gap-[10px] rounded-[8px] bg-[#227B82]">
              <Image src="/add-square.svg" height={32} width={32} alt='add square' />
              <span className='text-[14px] font-semibold leading-[19.25px] text-white'>Add a new address</span>
            </div>
            
            {isPopupOpen && (
                <MapAdderess onClose={closePopup} />

      )}
            </div>
            <div className="w-full h-[2px] my-5 bg-[#FAFAFA]"></div>
            <div className="">
              <span className="text-[16px] font-semibold mb-3 text-black">Delivery details</span>
              <div className=""></div>
              <textarea className="w-full bg-[#FAFAFA] mt-1 min-h-[56px] py-4 px-[14px] focus:outline-none rounded-xl" placeholder="note"></textarea>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-[10px] w-full h-full pt-[6px] pb-5 px-5 rounded-2xl">
            <div className="w-full h-[30px] mt-2 flex items-center justify-start">
              <div className="text-lg font-semibold text-[#227B82]">
                Payment
              </div>
              <div className="w-full h-[2px] bg-[#FAFAFA]"></div>
            </div>
            <div className="w-full h-[66px] gap-[10px] rounded-lg bg-[#FAFAFA] p-[6px] flex items-center justify-start">
            <Image src='/mada.png' alt="close" width={63} height={54} className="rounded-lg" />

              <div className="flex flex-col justify-center items-start">
                <span className="text-[16px] font-semibold text-black">Delivery location</span>
                <p className="text-sm text-[#808080]">al</p>
              </div>
            </div>
          </div>

          <button className='bg-[#227B82] text-white text-lg font-semibold w-full h-[49px] rounded-xl mt-4' onClick={sendOrder}>
            Conform
          </button>

            <Link href="/order" className='mt-3'>
              <button className='bg-[#227B82] text-white text-lg font-semibold w-full h-[49px] rounded-xl mt-4' onClick={sendOrder}>
             show my order
          </button>
              
            </Link>

        </div>

        <div className="w-[32.04%] flex flex-col p-3 bg-[#FAFAFA] gap-4 rounded-2xl">
          <div className="rounded-2xl flex flex-col p-5 bg-white h-full w-full">
            <span className='w-full text-[18px] font-semibold pb-[33px] text-[#227B82]'>Receipt</span>
            <div className="w-full h-[2px] bg-[#FAFAFA]"></div>
            <div className='w-full flex flex-col gap-1'>
              <div className='w-full flex items-center justify-between mt-5'>
                <span className='text-base font-medium text-[#8D8D8D]'>Subtotal:</span>
                <span className='text-base font-semibold text-black'>20SAR</span>
              </div>
              <div className='w-full flex items-center justify-between mb-5'>
                <span className='text-base font-medium text-[#8D8D8D]'>Tax (10%):</span>
                <span className='text-base font-semibold text-black'>20SAR</span>
              </div>
              <div className="w-full h-[2px] bg-[#FAFAFA]"></div>
            </div>
            <div className='w-full flex items-center justify-between mt-5'>
              <span className='text-base font-medium text-[#8D8D8D]'>Total:</span>
              <span className='text-base font-semibold text-black'>{totalAmount.toFixed(2)} SAR</span>
            </div>
          </div>















          <motion.div
                className="bg-white w-full rounded-2xl px-[21px] py-[18px] flex flex-col items-start cursor-pointer transition-all duration-500"
                onClick={handleBasketSummaryClick}
            >
                <div className='flex justify-between w-full'>
                    <span className='text-[18px] font-semibold text-[#227B82]'>
                        Basket Summary
                        <sup className='text-[14px] font-normal text-black'> ({cart.length} Items)</sup>
                    </span>
                    <div className='bg-[#227B82] w-[26.67px] h-[26.67px] ml-[110px] self-end rounded-full'>
                        <ArrowCircleRight size={28} />
                    </div>
                </div>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            exit={{ scaleY: 0 }}
                            transition={{ duration: 0.5 }}
                            className='overflow-hidden mt-4'
                        >
                            {cart.map((item, index) => (
                                <div key={index} className='mb-4'>
                                    {item.order_details.map((detail, detailIndex) => (
                                        <div key={detailIndex} className='mb-4'>
                                            <div className='flex'>
                                                <Image src={detail.image} alt="Dish" width={77} height={56} className='rounded-lg' />
                                                <div className='flex flex-col items-start mt-2 ml-2 justify-center'>
                                                    <p className='font-semibold text-[16px] text-black'>{detail.name}</p>
                                                    <p className='text-[16px] font-medium text-[#848484]'>{detail.unit_price} SAR</p>
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                                {detail.order_details_options && detail.order_details_options.length > 0 ? (
                                                    detail.order_details_options.map((option, optionIndex) => (
                                                        <p key={optionIndex} className='text-sm font-normal mx-2 text-[#A1A1A1]'>
                                                            {option.option_extra_name} <span className='font-semibold mx-2'>{option.unit_price} SAR</span>
                                                            <span className='font-bold mr-2'>-</span>
                                                        </p>
                                                    ))
                                                ) : (
                                                    <p className='text-sm font-normal mx-2 text-[#A1A1A1]'></p>
                                                )}
                                                <p className='text-sm mt-2 text-[#A1A1A1] font-semibold'>
                                                    Total: <span className='font-semibold mr-2'>{detail.quantity_total} SAR</span>
                                                </p>
                                            </div>
              <div className="w-full h-[2px] mt-2 bg-[#FAFAFA]"></div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>


















          <div className='bg-white w-full rounded-2xl px-[20px] py-[12px] flex flex-col items-start'>
            <span className='text-[18px] font-bold'>Restaurant Liability in Food Delivery</span>
            <span className='text-[15px] font-normal text-[#858585]'>Food delivery requires restaurants to ensure prompt service, food quality and safety, and order accuracy. Delays, quality deterioration, or errors can lead to liability issues. Improving order management, training staff, and using tracking technologies help deliver excellent service and maintain customer satisfaction.</span>
          </div>

          {/* عرض الرسالة عندما يتم تأكيد الطلب */}
          {orderConfirmed && (
            <div className="  fixed bottom-10 left-10 bg-green-200 text-green-800 p-3 mt-3 rounded-md">
              Order placed successfully!
            </div>
          )}

        </div>
      </div>
      <AnimatePresence>
        {popupVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              backgroundColor: popupError ? 'red' : 'green',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              zIndex: 1000,
            }}
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Page;
