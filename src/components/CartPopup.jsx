'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Add, Image, Minus } from 'iconsax-react'; // استيراد الأيقونات المستخدمة
import Link from 'next/link';

function CartPopup({ onClose }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // استرجاع البيانات من localStorage عند تحميل الصفحة
        if (typeof window !== 'undefined') {
          const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    // console.log('cart', storedCart);
  }}, []);

  const removeFromCart = (index) => {
        if (typeof window !== 'undefined') {
          // إزالة عنصر من السلة
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }};
  
  
  
  const handleAdd = (index) => {
    if (typeof window !== 'undefined') {

    const updatedCart = [...cart];
    const item = updatedCart[index].order_details[0];
    item.quantity += 1; // زيادة الكمية بمقدار واحد
    item.unit_price = parseFloat(item.unit_price); // تحويل السعر الأصلي إلى رقم
    item.quantity_total = parseFloat(item.quantity_total) + item.unit_quantity_total; // إضافة السعر الأصلي إلى الكمية الإجمالية
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // تحديث localStorage بالسلة الجديدة
  }};
  
  const handleSubtract = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index].order_details[0];
    
    if (item.quantity > 0) {
      item.quantity -= 1;
      item.quantity_total = Math.max(item.quantity_total - item.unit_quantity_total, 0); // تنقيص السعر الأصلي من الكمية الإجمالية بحيث لا تقل عن صفر
      
      if (item.quantity === 0) {
        removeFromCart(index); // حذف المنتج إذا أصبحت الكمية صفر
      } else {
        setCart(updatedCart);
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(updatedCart));}
      }
    }
  };



  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false); // تحديث الحالة لإخفاء الـ CartPopup
    onClose(); // استدعاء دالة الإغلاق
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-y-0 right-0 flex items-center justify-center bg-opacity-75 z-50"
    >
s      <div className="bg-white rounded-lg shadow-lg mx-4 mt-2 w-[481px] h-[90vh] overflow-y-auto no-scrollbar relative">
        <div clasName="flex flex-col gap-2 justify-between items-start px-4 py-2 h-28 rounded-t-lg">
          <button onClick={closePopup} className="bg-gray-200 p-3 m-2 rounded-full  hover:p-[14px]">
            <Image width={16} hanging={16} alt="Vector" src='/Vector.svg' className='w-4 h-4' />
          </button>
          <h2 className="text-lg font-bold m-2">Cart</h2>
        </div>
        <div className="p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((order, index) => (
              <div key={index} className="border-b border-gray-300 flex flex-col gap-2 py-2">
                <div className="flex items-center gap-2">
                  <Image src={order.order_details[0].image} alt="product" className="w-[77px] h-[56px] rounded-md" />
                  <div className="flex flex-col">
                    <p className="text-base font-semibold leading-[19.25px]">{order.order_details[0].name}</p>
                    <p className="text-base opacity-50 font-medium leading-[19.25px] mt-1">{order.order_details[0].quantity_total} SAR</p>
                  </div>
                  <div className="flex items-center ml-auto gap-2">
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center" onClick={() => handleSubtract(index)}>
                      <Minus size="18" color="black" />
                    </button>
                    <span className="text-lg">{order.order_details[0].quantity}</span>
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center" onClick={() => handleAdd(index)}>
                      <Add size="18" color="black" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex gap-3">
                  {order.order_details[0].order_details_options.map((option, idx) => (
                    
                    <span key={idx} className="flex flex-col gap-1 p-[6px] rounded-md  w-fit bg-[#F5F3F3]">
                    <span className='text-sm leading-[16.84px] whitespace-nowrap text-[#A1A1A1]'>{option.option_extra_name}</span>
                    <span className='text-sm font-semibold leading-[16.84px] text-[#A1A1A1]'>{option.unit_price} SAR</span>
                  </span>
                  ))}
                </div>
                {/* <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700 mt-2">
                  Remove
                </button> */}

              </div>

            ))
          )}
         <Link href="delivery-details">
         <button onClick={closePopup}   className='rounded-md mt-2 hover:bg-[#227b82] hover:text-white text-base text-[#227b82]  font-semibold box-border border-2 border-[#227b82]  w-full h-[47px]'>Chuck out</button>
         
         </Link>
     
         
        </div>
        
      </div>
      
    </motion.div>
  );
}

export default CartPopup;
