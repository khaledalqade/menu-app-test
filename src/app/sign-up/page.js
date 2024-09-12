'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'; // استخدام `next/navigation` بدلاً من `next/router`
import Link from 'next/link';
import Image from 'next/image';


const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupError, setPopupError] = useState(false);
  const router = useRouter(); // استخدام `useRouter` من `next/navigation`
  // http://192.168.8.228:8000/api

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const payload = {
        name: username,
        email,
        phone,
        password,
        password_confirmation: repeatPassword,
      };
      console.log('Sending payload:', payload);
      // const response = await axios.post(`http://192.168.8.228:8000/api/v1/sign_in`, payload);
      const response = await axios.post(`https://do-env.xyz/api/v1/sign_in`, payload);
      if (response.data.success) {
        setPopupMessage('Sign up successful! Redirecting...');
        setPopupError(false);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
          router.push('/');
        }, 3000);
      } else {
        setError('Sign up failed. Please check your details.');
        setPopupMessage('Sign up failed. Please check your details.');
        setPopupError(true);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 2000);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setPopupMessage('An error occurred. Please try again.');
      setPopupError(true);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-white w-full p-2">
      <div className="w-full flex items-start justify-between bg-white">
        <div className="flex flex-col">
          <Image src="/Logo.png" width={82} height={33} alt="Logo" className="h-[33px] w-[82px] m-8" />
          <div className='flex items-center w-full h-full justify-center'>
            <div className='w-[368px] flex flex-col mx-32 my-16'>
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-left"
              >
                <div className="text-left">
                  <h2 className="text-[32px] font-bold">Sign up</h2>
                  <p className="text-[#C2C2C2] text-base font-medium mb-4">Please fill in the details to create your account.</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-2">
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <div>
                    <input
                      type="text"
                      id="username"
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 h-[56px] py-2 mt-2 bg-[#FAFAFA] rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mt-2">
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
                      type="tel"
                      id="phone"
                      placeholder='Phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      className="w-full px-4 h-[56px] py-2 mt-2 bg-[#FAFAFA] rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      id="repeatPassword"
                      placeholder='Repeat Password'
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      className="w-full px-4 h-[56px] py-2 mt-2 bg-[#FAFAFA] rounded-xl focus:outline-none"
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
                  <button type="submit" className="w-full mt-4 bg-[#227B82] text-white py-2 rounded-xl">Sign up</button>
                </form>
                <p className="mt-4 text-base font-medium text-center">Already have an account? <Link href="log-in" className="text-[#4F80FF]">Log in</Link></p>
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

export default SignUpPage;
