'use client';












import React from 'react';

const BranchList = ({ branches, onBranchClick }) => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white p-4 shadow-lg rounded">
      <h2 className="text-lg font-bold mb-2">الفروع</h2>
      <ul>
        {branches.map((branch) => (
          <li
            key={branch.id}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => onBranchClick(branch.lat_lng)}
          >
            {branch.arabic_title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchList;




