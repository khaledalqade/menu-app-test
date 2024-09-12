'use client';






import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // هنا يمكنك معالجة الملفات التي تم رفعها
    // console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
        isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag and drop your photo here, or click to upload</p>
      )}
    </div>
  );
};

export default ImageUpload;

