// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';

// const StyledDropdown = ({addres,
//   apiUrl,
//   staticOptions,
//   optionKey,
//   displayKey,
//   onOptionChange,
//   defaultOptionText = 'Select an option' // قيمة افتراضية للنص
// }) => {
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [selectedOptionId, setSelectedOptionId] = useState('');
//   const [isRotated, setIsRotated] = useState(false);

//   useEffect(() => {
//     if (apiUrl) {
//       const fetchOptions = async () => {
//         try {
//           const response = await axios.get(apiUrl);
//           if (response.data.success) {
//             setOptions(response.data.result.data);
//           }
//         } catch (error) {
//           console.error('Error fetching options:', error);
//         }
//       };

//       fetchOptions();
//     } else if (staticOptions) {
//       setOptions(staticOptions);
//     }
//   }, [apiUrl, staticOptions]);

//   // useEffect للبحث عن الخيار بناءً على القيمة الافتراضية
//   useEffect(() => {
//     if (addres.city && options.length > 0) {
//       const foundOption = options.find(option => option[optionKey] === addres.city);
//       if (foundOption) {
//         setSelectedOption(foundOption[optionKey]);
//         setSelectedOptionId(foundOption.id);
//         if (onOptionChange) {
//           onOptionChange(foundOption[optionKey], foundOption.id);
//         }
//       }
//     }
//   }, [addres.city, options, optionKey, onOptionChange]);

//   const handleOptionChange = (e) => {
//     const selected = options.find(option => option[optionKey] === e.target.value);
//     setSelectedOption(e.target.value);
//     setSelectedOptionId(selected ? selected.id : '');
//     if (onOptionChange) {
//       onOptionChange(e.target.value, selected ? selected.id : '');
//     }
//   };

//   const handleFocus = () => {
//     setIsRotated(true);
//   };

//   const handleBlur = () => {
//     setIsRotated(false);
//   };

//   return (
//     <div className="relative w-full max-w-xs mx-auto mt-5">
//       <div className="relative">
//         <select
//           value={selectedOption}
//           onChange={handleOptionChange}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           className="appearance-none block font-medium text-[16px] leading-[19.25px] w-full bg-[#FAFAFA] hover:bg-[#F0F0F0] rounded-lg py-2 px-3 focus:outline-none "
//         >
//           <option value="">{defaultOptionText}</option> {/* النص الافتراضي */}
//           {options.map((option) => (
//             <option key={option.id} value={option[optionKey]}>
//               {option[displayKey]}
//             </option>
//           ))}
//         </select>
//         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//           <Image
//             src="/raight.svg"
//             alt="arrow"
//             width={28}
//             height={28}
//             className={`transition-transform duration-300 ${isRotated ? 'rotate-90' : 'rotate-0'}`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StyledDropdown;





'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const StyledDropdown = ({
  apiUrl,
  staticOptions,
  optionKey,
  displayKey,
  onOptionChange,
  defaultOptionText = 'Select an option' // قيمة افتراضية للنص
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    if (apiUrl) {
      const fetchOptions = async () => {
        try {
          const response = await axios.get(apiUrl);
          if (response.data.success) {
            setOptions(response.data.result.data);
          }
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      };

      fetchOptions();
    } else if (staticOptions) {
      setOptions(staticOptions);
    }
  }, [apiUrl, staticOptions]);

  const handleOptionChange = (e) => {
    const selected = options.find(option => option[optionKey] === e.target.value);
    setSelectedOption(e.target.value);
    setSelectedOptionId(selected ? selected.id : '');
    if (onOptionChange) {
      onOptionChange(e.target.value, selected ? selected.id : '');
    }
  };

  const handleFocus = () => {
    setIsRotated(true);
  };

  const handleBlur = () => {
    setIsRotated(false);
  };

  return (
    <div className="relative w-full max-w-xs mx-auto mt-5">
      <div className="relative">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="appearance-none block font-medium text-[16px] leading-[19.25px] w-full bg-[#FAFAFA] hover:bg-[#F0F0F0] rounded-lg py-2 px-3 focus:outline-none "
        >
          <option value="">{defaultOptionText}</option> {/* النص الافتراضي */}
          {options.map((option) => (
            <option key={option.id} value={option[optionKey]}>
              {option[displayKey]}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <Image
            src="/raight.svg"
            alt="arrow"
            width={28}
            height={28}
            className={`transition-transform duration-300 ${isRotated ? 'rotate-90' : 'rotate-0'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default StyledDropdown;
