'use client';



import { CloseCircle } from 'iconsax-react';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Add, Minus } from 'iconsax-react'; // استيراد الأيقونات المستخدمة
import { Star } from 'iconsax-react';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://do-env.xyz/api/v1';

function Popup1({ productId, onClose, food }) {
    const [productDetails, setProductDetails] = useState(null);
    const [openOptions, setOpenOptions] = useState({});
    const [optionExtrasData, setOptionExtrasData] = useState([]);
    // http://192.168.8.170:8000
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`https://do-env.xyz/api/v1/product/show?id=${productId}`);
                // const response = await axios.get(`https://do-env.xyz/api/v1/product/show?id=${productId}`);
                setProductDetails(response.data.result);
            } catch (error) {
                console.error(`Error fetching product details for id ${productId}:`, error);
            }
        };

        if (productId) {
            fetchDetails();
        }
    }, [productId]);

    const toggleDropdown = (optionId) => {
        setOpenOptions((prevOpenOptions) => ({
            ...prevOpenOptions,
            [optionId]: !prevOpenOptions[optionId],
        }));
    };

    const handleAdd = (extra) => {
        setOptionExtrasData((prevData) => {
            const existingExtra = prevData.find((data) => data.id === extra.id);
            if (existingExtra) {
                return prevData.map((data) =>
                    data.id === extra.id
                        ? {
                            ...data,
                            counts: data.counts + 1,
                            totals: data.totals + parseFloat(extra.price),
                          }
                        : data
                );
            } else {
                return [
                    ...prevData,
                    {
                        id: extra.id,
                        price: parseFloat(extra.price),
                        counts: 1,
                        totals: parseFloat(extra.price),
                    },
                ];
            }
        });
    };

    const handleSubtract = (extra) => {
        setOptionExtrasData((prevData) => {
            const existingExtra = prevData.find((data) => data.id === extra.id);
            if (existingExtra && existingExtra.counts > 0) {
                return prevData.map((data) =>
                    data.id === extra.id
                        ? {
                            ...data,
                            counts: data.counts - 1,
                            totals: data.totals - parseFloat(extra.price),
                          }
                        : data
                );
            }
            return prevData;
        });
    };

    const getCounts = (extraId) => {
        const extra = optionExtrasData.find((data) => data.id === extraId);
        return extra ? extra.counts : 0;
    };

    const getTotals = (extraId) => {
        const extra = optionExtrasData.find((data) => data.id === extraId);
        return extra ? extra.totals : 0;
    };

    const addToCart = () => {
        if (typeof window !== 'undefined') { // تأكد من أن الكود يتم تنفيذه في المتصفح
            const orderDetailsOptions = {
                order_details: [
                    {
                        account_product_detail_id: productDetails?.productDetails[0]?.id,
                        image: productDetails?.image,
                        name: productDetails?.product?.name,
                        quantity: 1,
                        unit_price: productDetails?.productDetails[0]?.price,
                        quantity_total: parseFloat(productDetails?.productDetails[0]?.price) + optionExtrasData.reduce((total, item) => total + item.totals, 0),
                        unit_quantity_total: parseFloat(productDetails?.productDetails[0]?.price) + optionExtrasData.reduce((total, item) => total + item.totals, 0),
                        order_details_options: optionExtrasData.map(extra => {
                            const option = productDetails?.options.find(opt => opt.option_extras.some(optExtra => optExtra.id === extra.id));
                            const extraName = option?.option_extras.find(optExtra => optExtra.id === extra.id)?.name;
                            return {
                                option_extra_id: extra.id,
                                option_extra_name: extraName,
                                unit_price: extra.price,
                                quantity: extra.counts,
                                quantity_total: extra.totals
                            };
                        })
                    }
                ]
            };
    
            // إضافة orderDetailsOptions إلى السلة وحفظها في localStorage
            const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
            updatedCart.push(orderDetailsOptions);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            // إغلاق Popup1
            onClose();
        }
    };
    
    

    const [isHovered, setIsHovered] = useState(false);
    const [hoverPosition, setHoverPosition] = useState({ x: 0.5, y: 0.5 });

    const handleMouseEnter = (x, y) => {
        setIsHovered(true);
        setHoverPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const calculatePosition = (x, y) => {
        const xPos = x === 0 ? -0.25 : x === 1 ? 0.25 : 0;
        const yPos = y === 0 ? -0.25 : y === 1 ? 0.25 : 0;
        return { x: xPos, y: yPos };
    };

    const { x, y } = calculatePosition(hoverPosition.x, hoverPosition.y);

    const price = food.productDetails && food.productDetails.length > 0
    ? food.productDetails[0].price
    : 'غير متوفر';



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50"
        >
            
            
            
            <div className="bg-white rounded-lg shadow-lg m-12 w-[1081px] h-[80%] relative">
                
            <span onClick={onClose} className="absolute top-1 left-[-30px] text-black bg-white cursor-pointer rounded-full">
                        <CloseCircle size="20" color="black" />
                    </span>



                    <div className="px-4 grid grid-cols-2 space-x-4 ">
                        <div className=" pt-4 rounded-tl-[16px]">

                        <div
                    className="relative rounded-lg h-64 mb-4 overflow-hidden"
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${productDetails?.image})` }}
                        animate={{
                            scale: isHovered ? 1.5 : 1,
                            x: isHovered ? x * 100 + '%' : '0%',
                            y: isHovered ? y * 100 + '%' : '0%',
                            transition: { duration: 0.3 }
                        }}
                    />
                    <div
                        className="absolute top-0 left-0 w-1/2 h-1/2"
                        onMouseEnter={() => handleMouseEnter(1, 1)}
                    />
                    <div
                        className="absolute top-0 right-0 w-1/2 h-1/2"
                        onMouseEnter={() => handleMouseEnter(0, 1)}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-1/2 h-1/2"
                        onMouseEnter={() => handleMouseEnter(1, 0)}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-1/2 h-1/2"
                        onMouseEnter={() => handleMouseEnter(0, 0)}
                    />
                </div>
                        </div>

                        <div className='flex flex-col justify-between py-4 h-[531px]'>
                            <div className='flex flex-col overflow-y-auto scrollbar-hide'>

            
                                <h2 className="text-lg font-bold">{productDetails?.product?.name}  </h2>
                                <p className="text-gray-600 text-[14px] font-normal w-[85%] leading-[18px]">{productDetails?.description}</p>
                                <div className="my-2">
                                    <span className="text-[#1b2020] text-[18px] font-semibold">{price} SAR </span>
                                    <div className='flex gap-2'>
                                        <div className='flex justify-center items-center w-fit gap-1 px-2 py-1 mt-2 text-black rounded-md bg-[#F2F2F2]'>
                                            <Star size="15" color="black" /><span className='text-[13px]'>
                                                4.4<sup className='text-[11px]'> (200)</sup></span>
                                        </div>
                                        <div className='flex justify-center items-center w-fit px-2 py-1 mt-2 text-black rounded-md bg-[#F2F2F2]'>
                                            <span className='text-[13px]'>
                                                20%</span>
                                        </div>
                                    </div>
                                    <div className="w-1/1 mx-auto border-t border-[#DCDCDC] mb-[3px] mt-3"></div>


                                </div>






                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                {productDetails?.options.map((option) => (
                    <div key={option.id} className="mt-3 p-2 relative box-border border border-gray-300 rounded-lg">
                        <div onClick={() => toggleDropdown(option.id)} className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-black text-[16px] font-bold leading-[120.3%]">
                                    {option.name}
                                </span>
                                <span className="text-[14px] text-[#9D9D9D] mt-1 font-medium leading-[120.3%]">
                                    Choose one
                                </span>
                            </div>
                            <span className="bg-[#E6E6E6] text-black w-[27px] h-[27px] cursor-pointer rounded-full">
                                <div className="relative w-4 h-4">
                                    <motion.div
                                        className="absolute top-3 left-[5px] w-full h-0.5 bg-black"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: openOptions[option.id] ? 0 : 0 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <motion.div
                                        className="absolute top-[5px] left-3 w-0.5 h-full bg-black"
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: openOptions[option.id] ? 0 : 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </span>
                        </div>
                        <AnimatePresence>
                            {openOptions[option.id] && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {option.option_extras.map((extra) => (
                                        <div key={extra.id} className="mt-2">
                                            <div className="w-[80%] mx-auto border-t border-[#DCDCDC] h-full"></div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between py-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-black text-[16px] leading-[120.3%]">
                                                            {extra?.name}
                                                        </span>
                                                        <span className="text-sm text-[#9D9D9D] mt-1 font-medium leading-[120.3%]">
                                                            {extra?.price} SAR
                                                        </span>

                                                    </div>
                                                    <AnimatePresence>
                                                        {getCounts(extra.id) === 0 ? (
                                                            <motion.button
                                                                onClick={() => handleAdd(extra)}
                                                                initial={{ x: 100, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                exit={{ x: -100, opacity: 1 }}
                                                                transition={{ duration: 1 }}
                                                                className="flex items-center justify-center bg-[#E6E6E6] h-full p-1 rounded-full w-[65px]"
                                                            >
                                                                <Add size="18" color="black" />
                                                                <span className="text-base text-black leading-[120%]">
                                                                    Add
                                                                </span>
                                                            </motion.button>
                                                        ) : (
                                                            <motion.div
                                                                initial={{ x: 100, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                exit={{ x: -100, opacity: 1 }}
                                                                transition={{ duration: 1 }}
                                                                className="flex w-[92px] h-[32px] gap-[11px] items-center justify-center"
                                                            >
                                                                <button
                                                                    className="w-[32px] h-[32px] bg-[#DCDCDC] rounded-full border border-solid border-gray-300 p-[5px] gap-[10px]"
                                                                    onClick={() => handleSubtract(extra)}
                                                                >
                                                                    <Minus size="18" color="black" />
                                                                </button>
                                                                <span className="text-base text-black font-normal leading-[21.6px]">{getCounts(extra.id)}</span>
                                                                <button
                                                                    className="w-[32px] h-[32px] bg-[#DCDCDC] rounded-full border border-solid border-gray-300 p-[5px] gap-[10px]"
                                                                    onClick={() => handleAdd(extra)}
                                                                >
                                                                    <Add size="18" color="black" />
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}









                            </div>
                            <div className="flex items-center justify-between py-2 pr-2 pl-[15px] bg-white shadow rounded-xl">
                                <div className="flex flex-col items-start justify-center w-[100px]">
                                    <p className="text-[#9D9D9D] text-[12px] font-semibold leading-[120.3%] mb-[6px]">Total order value</p>
                                    <p className="text-black text-[16px] font-semibold leading-[120.3%]">{parseFloat(productDetails?.productDetails[0]?.price) + optionExtrasData.reduce((total, item) => total + item.totals, 0)}SAR</p>
                                </div>
                                <div className=' flex items-center gap-2'>
                                    <button    className='text-[#227b82] text-base font-semibold box-border border-2 border-[#227b82] rounded-md w-[152.5px] h-[47px]'>Order now </button>
                                    <button onClick={addToCart} className='rounded-md bg-[#227b82] text-white text-base font-semibold w-[152.5px] h-[47px]'>Add to Cart</button>

                                </div>
                            </div>





                        </div>
                    </div>
             
            </div>
        </motion.div>
    );
}

export default Popup1;
