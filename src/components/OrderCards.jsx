'use client';

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const items = [
  {
    id: 1,
    image: "/Frame.png",
    name: "Dumplings",
    price: "20SAR",
    extras: [
      "Add bread 5SAR",
      "Add egg 5SAR"
    ],
    total: "20SAR"
  },
  {
    id: 2,
    image: "/Frame.png",
    name: "Noodles",
    price: "25SAR",
    extras: [
      "Add chicken 10SAR",
      "Add vegetables 5SAR"
    ],
    total: "25SAR"
  },
  {
    id: 3,
    image: "/Frame.png",
    name: "Dumplings",
    price: "20SAR",
    extras: [
      "Add bread 5SAR","Add bread 5SAR","Add bread 5SAR",
      "Add egg 5SAR"
    ],
    total: "20SAR"
  },
  {
    id: 4,
    image: "/Frame.png",
    name: "Noodles",
    price: "25SAR",
    extras: [
      "Add chicken 10SAR",
      "Add vegetables 5SAR"
    ],
    total: "25SAR"
  },
  // أضف المزيد من العناصر حسب الحاجة
];

const CustomSlider = ({orderData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 330; // عرض العنصر الواحد
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    controls.start({ x: -currentIndex * itemWidth });
  }, [currentIndex, controls, itemWidth]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const direction = offset < 0 ? 1 : -1;
    const threshold = itemWidth / 4;

    if (Math.abs(offset) > threshold) {
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + direction;
        newIndex = Math.max(0, Math.min(newIndex, items.length - 1));
        return newIndex;
      });
    } else {
      controls.start({ x: -currentIndex * itemWidth });
    }
  };

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        className="flex cursor-grab"
        drag="x"
        dragConstraints={{
          left: -((items.length - 1) * itemWidth),
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        animate={controls}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {orderData.map((item) => (
          <motion.div
            key={item.id}
            className="flex-none w-[330px] bg-[#FAFAFA] p-2 flex flex-col items-start justify-start h-[206px] rounded-[12px] mx-2"
          >
            <div className="flex">
            <Image src={item.product_image} alt={item.product_name}  width={77} height={56} className="rounded-lg" />
              <div className="flex flex-col items-start mt-2 ml-2 justify-center">
                <p className="font-semibold text-[16px] text-black">{item.product_name}</p>
                <p className="text-[16px] font-medium text-[#848484]">{item.unit_price}SAR </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2">
            {item.order_details_options.map(option => (
                          <p key={option.option_extra_id} className='text-sm font-normal mx-2 text-[#A1A1A1]'>
                            {option.option_name} <span className='font-semibold mx-2'>{option.price}SAR</span>-
                          </p>
                        ))}
              <p className="text-sm mt-2 text-[#A1A1A1] font-semibold">Total: <span className="font-semibold mr-2">{item.unit_price}</span></p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CustomSlider;