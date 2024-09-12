'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://do-env.xyz/api/v1';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupError, setPopupError] = useState(false);
  const router = useRouter();
  // http://192.168.8.228:8000/api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (typeof window !== 'undefined') {
          // const response = await axios.post(`http://192.168.8.228:8000/api/v1/login`, {
        const response = await axios.post(`https://do-env.xyz/api/v1/login`, {
        email,
        password,
        rememberMe,
      });

      if (response.data.success) {
        // حذف التوكن وID المستخدمين السابقين من localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        
        // حفظ التوكن وID المستخدم الجديدين في localStorage
        localStorage.setItem('token', response.data.result.token);
        localStorage.setItem('userId', response.data.result.id);
        // console.log('User data :', response.data);
        // console.log('token', response.data.result.token);
        // console.log('userId', response.data.result.id);

        setPopupMessage('Login successful! Redirecting...');
        setPopupError(false);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
          router.push('/');
        }, 3000);
      } else {
        setPopupMessage(response.data.message || 'Login failed');
        setPopupError(true);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      }
    }} catch (error) {
      setPopupMessage('Error logging in: ' + (error.response?.data?.message || error.message));
      setPopupError(true);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-white w-full p-2">
      <div className="w-full flex items-start justify-between bg-white">
        <div className="flex flex-col">
          <Image src="/Logo.png" alt="Logo" height={33} width={82}  className="h-[33px] w-[82px] m-8" />
          <div className='flex items-center w-full h-full justify-center'>
            <div className='w-[368px] flex flex-col m-32'>
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-left"
              >
                <div className="text-left">
                  <h2 className="text-[32px] font-bold">Welcome back</h2>
                  <p className="text-[#C2C2C2] text-base font-medium mb-4">Please fill your detail to access your account.</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-2">
                  <div>
                    <input
                      type="email"
                      id="email"
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 h-[56px] py-2 mt-2 bg-[#FAFAFA] rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      id="password"
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 mt-2 h-[56px] bg-[#FAFAFA] rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="rememberMe" className="text-sm font-medium">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-[#4F80FF] font-medium">Forgot Password?</a>
                  </div>
                  <button type="submit" className="w-full mt-4 bg-[#227B82] text-white py-2 rounded-xl">Log in</button>
                </form>
                <p className="mt-4 text-base font-medium text-center"> Don&apos;t have an account? <Link href="sign-up" className="text-[#4F80FF]">Sign up</Link></p>

              </motion.div>
            </div>
          </div>
        </div>
        <div className="w-[782px] h-[782px] rounded-xl" style={{ backgroundImage: `url('/imgLogIn.png')` }}></div>
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
};

export default LoginPage;
