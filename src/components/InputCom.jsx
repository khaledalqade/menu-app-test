'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const StyledDropdown = ({
  apiUrl,
  staticOptions,
  optionKey = 'id',
  displayKey,
  onOptionChange,
  defaultOptionText = 'Select an option',
  isEditable,
  selectedOption,
  setSelectedOption,
}) => {
  const [options, setOptions] = useState([]);
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
    const selectedId = e.target.value;
    setSelectedOption(selectedId);
    if (onOptionChange) {
      onOptionChange(selectedId);
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
          className={`appearance-none block font-medium text-[16px] leading-[19.25px] w-full bg-[#FAFAFA] hover:bg-[#F0F0F0] rounded-lg py-2 px-3 focus:outline-none ${
            !isEditable ? 'cursor-not-allowed bg-gray-200' : ''
          }`}
          disabled={!isEditable}
        >
          <option value="">{defaultOptionText}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
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

const InputComponent = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // لتخزين ملف الصورة

  useEffect(() => {
    // const token = localStorage.getItem('token');

    axios
      .get('https://do-env.xyz/api/v1/profile', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        const { result } = response.data;
        setInputValues({
          name: result.name || '',
          email: result.email || '',
          phone: result.phone || '',
          address: result.address || '',
        });
        setUploadedImage(result.image || null);
      })
      .catch((error) => {
        console.error('هناك خطأ:', error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = async () => {
    setIsEditable(false);

    // const token = localStorage.getItem('token');

    // استخدام FormData لإرسال البيانات مع الصورة كملف
    const formData = new FormData();
    formData.append('name', inputValues.name);
    formData.append('email', inputValues.email);
    formData.append('city_id', selectedOption);
    formData.append('phone', inputValues.phone);
    formData.append('address', inputValues.address);
    if (imageFile) {
      formData.append('image', imageFile); // رفع ملف الصورة إذا كان موجودًا
    }

    try {
      const response = await axios.post('https://do-env.xyz/api/v1/update-Profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // تعيين نوع المحتوى إلى multipart/form-data
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        // console.log('تم حفظ البيانات بنجاح:', response.data);
      } else {
        console.error('خطأ في حفظ البيانات:', response.data.message);
      }
    } catch (error) {
      console.error('حدث خطأ أثناء الحفظ:', error);
    }

    if (tempImage) {
      setUploadedImage(tempImage);
      setTempImage(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOptionChange2 = (newOption, id) => {
    // console.log(`Selected option: ${newOption} with id: ${id}`);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImageFile(file); // تخزين ملف الصورة
      const reader = new FileReader();
      reader.onload = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !isEditable,
  });

  return (
    <div className="mt-10">
      {['name', 'email', 'phone', 'address'].map((field) => (
        <div key={field} className="relative mb-8">
          <label
            className={`absolute left-0 top-0 text-teal-600 transition-all duration-300 ${
              inputValues[field] ? 'text-xs -translate-y-4' : 'text-lg'
            }`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            name={field}
            className="border-b-2 border-gray-300 focus:outline-none p-1 mt-4 w-full"
            value={inputValues[field]}
            onChange={handleInputChange}
            readOnly={!isEditable}
          />
        </div>
      ))}

      {isEditable ? (
        <div className="mb-8">
          {tempImage || uploadedImage ? (
            <div className="relative">
              <Image
                src={tempImage || uploadedImage}
                alt="Uploaded"
                width={200} height={200} 
                className="w-full h-auto rounded-lg mb-4"
              />
              <div
                {...getRootProps()}
                className={`absolute inset-0 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                  isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
                }`}
              >
                <input {...getInputProps()} />
                <p>Drag and drop your photo here, or click to upload</p>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-8 ${
                isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
              }`}
            >
              <input {...getInputProps()} />
              <p>Drag and drop your photo here, or click to upload</p>
            </div>
          )}
        </div>
      ) : (
        uploadedImage && (
          <Image src={uploadedImage} alt="Uploaded" width={200} height={200} className="w-full h-auto rounded-lg mb-8" />
        )
      )}
      <StyledDropdown
        apiUrl="https://do-env.xyz/api/v1/city"
        optionKey="name"
        displayKey="name"
        onOptionChange={handleOptionChange2}
        defaultOptionText="Select a City"
        isEditable={isEditable}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <button
        onClick={isEditable ? handleSaveClick : handleEditClick}
        className={`mt-4 px-6 py-2 rounded-full ${
          isEditable ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        {isEditable ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default InputComponent;








// import axios from 'axios';
// import { useEffect } from 'react';

// import { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';


// const InputComponent = () => {
//   const [isEditable, setIsEditable] = useState(false); // للتحكم في حاله ال inputs جميعها
//   const [inputValues, setInputValues] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   }); // قيم المدخلات
//   const [uploadedImage, setUploadedImage] = useState(null); // لتخزين الصورة المحملة

//   useEffect(() => {
//     // استعلام GET لجلب البيانات
//     const token = localStorage.getItem("token");

//     axios
//       .get('http://do-env.xyz/api/v1/profile', {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         const { result } = response.data;
//         // تعيين القيم الافتراضية للمدخلات والصورة
//         setInputValues({
//           name: result.name || '',
//           email: result.email || '',
//           phone: result.phone || '',
//           address: result.address || '', // تأكد من أن `address` موجود في الاستجابة
//         });
//         setUploadedImage(result.image || null);
//       })
//       .catch((error) => {
//         console.error('هناك خطأ:', error);
//       });
//   }, []);

//   const handleEditClick = () => {
//     setIsEditable(true);
//   };

//   const handleSaveClick = () => {
//     setIsEditable(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputValues({ ...inputValues, [name]: value });
//   };

//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage(reader.result); // تخزين الصورة بعد تحميلها
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
//     onDrop,
//     disabled: !isEditable, // تعطيل مربع التحميل عند عدم التعديل
//   });

//   return (
//     <div className="mt-10">
//       {/* مكون المدخل */}
//       {['name', 'email', 'phone', 'address'].map((field) => (
//         <div key={field} className="relative mb-8">
//           {/* label لعرض النص الافتراضي عند عدم وجود قيمه */}
//           <label
//             className={`absolute left-0 top-0 text-teal-600 transition-all duration-300 ${
//               inputValues[field] ? 'text-xs -translate-y-4' : 'text-lg'
//             }`}
//           >
//             {field.charAt(0).toUpperCase() + field.slice(1)}
//           </label>
//           {/* input */}
//           <input
//             type="text"
//             name={field}
//             className="border-b-2 border-gray-300 focus:outline-none p-1 mt-4 w-full"
//             value={inputValues[field]}
//             onChange={handleInputChange}
//             readOnly={!isEditable} // التحكم في حاله الكتابه داخل ال input
//           />
//         </div>
//       ))}

//       {/* عرض الصورة المحملة أو مربع إضافة الصورة */}
//       {uploadedImage ? (
//         <img src={uploadedImage} alt="Uploaded" className="w-full h-auto rounded-lg mb-8" />
//       ) : (
//         <div
//           {...getRootProps()}
//           className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-8 ${
//             isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
//           } ${isEditable ? '' : 'opacity-50 cursor-not-allowed'}`}
//         >
//           <input {...getInputProps()} disabled={!isEditable} /> {/* تمكين المدخل عند التعديل */}
//           <p>{isEditable ? 'Drag and drop your photo here, or click to upload' : 'No image uploaded. Click Edit to add an image.'}</p>
//         </div>
//       )}

//       {/* زر لفتح وضع التعديل */}
//       <button
//         onClick={handleEditClick}
//         className="px-4 py-1 bg-blue-500 text-white rounded mt-4 mr-2"
//       >
//         Edit
//       </button>
//       {/* زر لحفظ القيمه واغلاق وضع التعديل */}
//       <button
//         onClick={handleSaveClick}
//         className="px-4 py-1 bg-green-500 text-white rounded mt-4"
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default InputComponent;









// const InputComponent = () => {
//   const [isEditable, setIsEditable] = useState(false); // للتحكم في حاله ال inputs جميعها
//   const [inputValues, setInputValues] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   }); // قيم المداخل


//   useEffect(() => {
//       const token = localStorage.getItem("token");
//       // استعلام GET لجلب البيانات
//     axios
//       .get('http://do-env.xyz/api/v1/profile', {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           Authorization: `Bearer ${token}`, // إضافة التوكن إلى الهيدر
//         },
//       })
//       .then((response) => {
//         console.log("profile",response.data); // طباعة الرد في الـ console
//       })
//       .catch((error) => {
//         console.error('هناك خطأ:', error);
//       });
//   }, []); // استخدام useEffect لتنفيذ الاستعلام عند تحميل المكون لأول مرة

//   const [uploadedImage, setUploadedImage] = useState(null); // لتخزين الصورة المحملة

//   // لتفعيل وضع التعديل
//   const handleEditClick = () => {
//     setIsEditable(true);
//   };

//   // لحفظ القيم وإغلاق وضع التعديل
//   const handleSaveClick = () => {
//     setIsEditable(false);
//   };

//   // لتحديث قيم المدخلات
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputValues({ ...inputValues, [name]: value });
//   };

//   // معالجة تحميل الصور
//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage(reader.result); // تخزين الصورة بعد تحميلها
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
//     onDrop,
//     disabled: !isEditable, // تعطيل مربع التحميل عند عدم التعديل
//   });

//   return (
//     <div className="mt-10">
//       {/* مكون المدخل */}
//       {['name', 'email', 'phone', 'address'].map((field) => (
//         <div key={field} className="relative mb-8">
//           {/* label لعرض النص الافتراضي عند عدم وجود قيمه */}
//           <label
//             className={`absolute left-0 top-0 text-teal-600 transition-all duration-300 ${
//               inputValues[field] ? 'text-xs -translate-y-4' : 'text-lg'
//             }`}
//           >
//             {field.charAt(0).toUpperCase() + field.slice(1)}
//           </label>
//           {/* input */}
//           <input
//             type="text"
//             name={field}
//             className="border-b-2 border-gray-300 focus:outline-none p-1 mt-4 w-full"
//             value={inputValues[field]}
//             onChange={handleInputChange}
//             readOnly={!isEditable} // التحكم في حاله الكتابه داخل ال input
//           />
//         </div>
//       ))}

//       {/* عرض الصورة المحملة أو مربع إضافة الصورة */}
//       {uploadedImage ? (
//         <img src={uploadedImage} alt="Uploaded" className="w-full h-auto rounded-lg mb-8" />
//       ) : (
//         <div
//           {...getRootProps()}
//           className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer mb-8 ${
//             isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
//           } ${isEditable ? '' : 'opacity-50 cursor-not-allowed'}`} 
//         >
//           <input {...getInputProps()} disabled={!isEditable} /> {/* تمكين المدخل عند التعديل */}
//           <p>{isEditable ? 'Drag and drop your photo here, or click to upload' : 'No image uploaded. Click Edit to add an image.'}</p>
//         </div>
//       )}

//       {/* زر لفتح وضع التعديل */}
//       <button
//         onClick={handleEditClick}
//         className="px-4 py-1 bg-blue-500 text-white rounded mt-4 mr-2"
//       >
//         Edit
//       </button>
//       {/* زر لحفظ القيمه واغلاق وضع التعديل */}
//       <button
//         onClick={handleSaveClick}
//         className="px-4 py-1 bg-green-500 text-white rounded mt-4"
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default InputComponent;




// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';
// import Image from 'next/image';

// // مكون StyledDropdown المعدل للتحكم بواسطة زر الحفظ والتعديل
// const StyledDropdown = ({
//   apiUrl,
//   staticOptions,
//   optionKey,
//   displayKey,
//   onOptionChange,
//   defaultOptionText = 'Select an option', // قيمة افتراضية للنص
//   isEditable, // للتحكم في امكانية التعديل
//   selectedOption, // القيمة المحددة
//   setSelectedOption, // تعيين القيمة المحددة
// }) => {
//   const [options, setOptions] = useState([]);
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

//   const handleOptionChange = (e) => {
//     const selected = options.find(option => option[optionKey] === e.target.value);
//     setSelectedOption(e.target.value);
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
//           className={`appearance-none block font-medium text-[16px] leading-[19.25px] w-full bg-[#FAFAFA] hover:bg-[#F0F0F0] rounded-lg py-2 px-3 focus:outline-none ${
//             !isEditable ? 'cursor-not-allowed bg-gray-200' : '' // تعطيل الـ Dropdown في حال عدم التعديل
//           }`}
//           disabled={!isEditable} // تعطيل الحقل إذا لم يكن قابلًا للتعديل
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

// const InputComponent = () => {
//   const [isEditable, setIsEditable] = useState(false); // للتحكم في حاله ال inputs جميعها
//   const [inputValues, setInputValues] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   }); // قيم المدخلات
//   const [selectedOption, setSelectedOption] = useState(''); // للتحكم في قيمة الـ Dropdown المحددة
//   const [uploadedImage, setUploadedImage] = useState(null); // لتخزين الصورة المحملة
//   const [tempImage, setTempImage] = useState(null); // لتخزين الصورة المؤقتة قبل الحفظ

//   useEffect(() => {
//     axios
//       .get('https://.xyz/api/v1/profile', {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       })
//       .then((response) => {
//         const { result } = response.data;
//         // تعيين القيم الافتراضية للمدخلات والصورة
//         setInputValues({
//           name: result.name || '',
//           email: result.email || '',
//           phone: result.phone || '',
//           address: result.address || '', // تأكد من أن `address` موجود في الاستجابة
//         });
//         setUploadedImage(result.image || null);
//       })
//       .catch((error) => {
//         console.error('هناك خطأ:', error);
//       });
//   }, []);

//   const handleEditClick = () => {
//     setIsEditable(true);
//   };

//   const handleSaveClick = async () => {
//     setIsEditable(false);
//     if (tempImage) {
//       setUploadedImage(tempImage); // تحديث الصورة المحملة بالصورة الجديدة المؤقتة
//       setTempImage(null); // مسح الصورة المؤقتة
//     }


  
//     const formData = new FormData();
//     formData.append('name', inputValues.name);
//     formData.append('email', inputValues.email);
//     formData.append('phone', inputValues.phone);
//     // formData.append('profile[alt_phone]', inputValues.phone);
//     formData.append('address', inputValues.address);
//     if (selectedOption) {
//       formData.append('profile.city_id', Number(selectedOption)); // city_id
//     }
//     if (uploadedImage) {
//       formData.append('image', uploadedImage); // إضافة الصورة
//     }
// console.log(formData);
//     try {
//       const response = await axios.post('https://do-env.xyz/api/v1/update-Profile', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Accept': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       console.log('Response:', response.data);
//       if (response.data.success) {
//         console.log('Profile updated successfully!');
//       } else {
//         console.error('Failed to update profile:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputValues({ ...inputValues, [name]: value });
//   };

//   const handleOptionChange2 = (newOption, id) => {
//     console.log(`Selected option: ${newOption} with id: ${id}`);
//   };

//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setTempImage({
//           preview: reader.result,
//           file: file
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     disabled: !isEditable, // تعطيل مربع التحميل عند عدم التعديل
//   });

//   return (
//     <div className="mt-10">
//       {/* مكون المدخل */}
//       {['name', 'email', 'phone', 'address'].map((field) => (
//         <div key={field} className="relative mb-8">
//           {/* label لعرض النص الافتراضي عند عدم وجود قيمه */}
//           <label
//             className={`absolute left-0 top-0 text-teal-600 transition-all duration-300 ${
//               inputValues[field] ? 'text-xs -translate-y-4' : 'text-lg'
//             }`}
//           >
//             {field.charAt(0).toUpperCase() + field.slice(1)}
//           </label>
//           {/* input */}
//           <input
//             type="text"
//             name={field}
//             className="border-b-2 border-gray-300 focus:outline-none p-1 mt-4 w-full"
//             value={inputValues[field]}
//             onChange={handleInputChange}
//             readOnly={!isEditable} // التحكم في حاله الكتابه داخل ال input
//           />
//         </div>
//       ))}

//       {/* عرض الصورة المحملة أو مربع إضافة الصورة */}
//       {isEditable ? (
//   <div className="mb-8">
//     {tempImage ? (
//       <div className="relative">
//         <Image
//           src={tempImage.preview}
//           alt="Temporary Preview"
//           width={full}
//           height={full}
//           className="w-full h-auto rounded-lg mb-4"
//         />
//         <div
//           {...getRootProps()}
//           className={`absolute inset-0 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
//             isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
//           }`}
//         >
//           <input {...getInputProps()} />
//           <p>Drag & drop a new image, or click to select one</p>
//         </div>
//       </div>
//     ) : uploadedImage ? (
//       <Image src={uploadedImage} alt="Uploaded"   width={100}
//       height={100} className="w-full h-auto rounded-lg mb-8" />
//     ) : (
//       <div
//         {...getRootProps()}
//         className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
//           isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
//         }`}
//       >
//         <input {...getInputProps()} />
//         <p>Drag & drop an image, or click to select one</p>
//       </div>
//     )}
//   </div>
// ) : uploadedImage ? (
//   <Image src={uploadedImage}   width={100}
//   height={100} alt="Uploaded" className="w-full h-auto rounded-lg mb-8" />
// ) : null}


//       {/* مكون الـ Dropdown */}
//       <StyledDropdown
//         apiUrl="https://do-env.xyz/api/v1/city"
//         optionKey="name"
//         displayKey="name"
//         onOptionChange={handleOptionChange2}
//         defaultOptionText="Another City" // تغيير النص الافتراضي هنا
//         isEditable={isEditable} // تحكم في امكانية التعديل
//         selectedOption={selectedOption} // القيمة المحددة
//         setSelectedOption={setSelectedOption} // تعيين القيمة المحددة
//       />

//       {/* أزرار التعديل والحفظ */}
//       <div className="flex space-x-4">
//         <button
//           className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4"
//           onClick={handleEditClick}
//           disabled={isEditable} // منع التعديل عندما يكون بالفعل في وضع التعديل
//         >
//           تعديل
//         </button>
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
//           onClick={handleSaveClick}
//           disabled={!isEditable} // منع الحفظ عندما لا يكون في وضع التعديل
//         >
//           حفظ
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InputComponent;
