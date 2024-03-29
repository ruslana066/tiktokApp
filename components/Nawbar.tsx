import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import  { IoMdAdd } from 'react-icons/io';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '@/utils'
import userAuthStore from '@/store/authStore';
import { IUser } from '@/types';

const Navbar = () => {

  const [user, setUser] = useState<IUser | null>()  
  const {userProfile, addUser, removeUser} = userAuthStore()  
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  useEffect(() => {
    setUser(userProfile)  
  }, [userProfile])

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
    console.log(searchValue)
  };



  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
        <Link href="/">
            <div className='w-[100px] md:w-[130px] md:h-[30px] h-[40px]'>
                <Image 
                  
                    src={Logo}
                    alt='logo'
                    className='cursor-pointer  '
                />
            </div>
        </Link>
        <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
        <div>
        {
            user ? (
              <div className='flex gap-5 md:gap-10 items-center'>
                <Link href='/upload' >
                  <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center h-full rounded-md' >
                    <IoMdAdd className='text-xl' /> &nbsp;
                    <span className='hidden md:block  gap-2' >Upload</span>
                  </button>
                </Link>
                {user?.image && (
                  <Link href={`/profile/${user._id}`} className='flex gap-4 items-center aligh-center' >
                    <div>
                      <Image 
                        src={user?.image}
                        alt='user'
                        width={40}
                        height={40}
                        className='rounded-full'
                      />
                    </div>
                    <div>{user.userName}</div>
                  </Link>
                )}
                
                <button
                  type='button'
                  className='border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                  onClick={() => {googleLogout(); removeUser();}}
                >
                  <AiOutlineLogout/>
                </button>
              </div>
            ) : (
              <GoogleLogin 
                  onSuccess={(response) => createOrGetUser(response, addUser)}
                  onError={() => console.log('error')}
              />
            )
          }
        </div>
    </div>
  )
}

export default Navbar