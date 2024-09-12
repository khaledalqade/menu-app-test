'use client';


import React, { useState } from 'react';

const CategoryButtons = ({ categories, onSelectCategory, onResetFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleButtonClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="flex gap-[8px] md:gap-[6px] mb-4 mt-2">
      <button
        className={`rounded-[0.75rem] flex items-center justify-center h-[32px] md:h-[38px] text-[12px] md:text-[0.87rem] font-normal p-[12px] ${selectedCategory === null ? 'bg-[#227B82] text-white' : 'bg-[#FAFAFA] text-black'}`}
        onClick={() => {
          setSelectedCategory(null);
          onResetFilter();
        }}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`rounded-[0.75rem] flex items-center justify-center h-[32px] md:h-[38px] text-[12px] md:text-[0.87rem] font-normal p-[12px] ${selectedCategory === category.id ? 'bg-[#227B82] text-white' : 'bg-[#FAFAFA] text-black'}`}
          onClick={() => handleButtonClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
