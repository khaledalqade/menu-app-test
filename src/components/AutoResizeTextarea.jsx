'use client';












// components/AutoResizeTextarea.jsx
import { useRef, useEffect } from 'react';

const AutoResizeTextarea = ({ id, placeholder, label, value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const autoResize = (element) => {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('input', () => autoResize(textarea));
      // Initial resize
      autoResize(textarea);
    }

    // Clean up event listener on unmount
    return () => {
      if (textarea) {
        textarea.removeEventListener('input', () => autoResize(textarea));
      }
    };
  }, []);

  return (
    <div className="relative mt-4">
      <textarea
        id={id}
        placeholder=" "
        rows="1"
        className="peer block w-full py-2 px-3 rounded-md shadow-sm bg-[#FAFAFA] hover:bg-[#F0F0F0] border-0 focus:outline-none focus:ring-0 resize-none overflow-hidden"
        ref={textareaRef}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute top-2 left-3 text-black font-medium text-[16px] leading-[19.25px] transition-transform duration-100 transform -translate-y-5  scale-90 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-blue-500"
      >
        {label}
      </label>
    </div>
  );
};

export default AutoResizeTextarea;
