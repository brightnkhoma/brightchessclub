import React from 'react'
import {FaUsers,FaChessQueen } from 'react-icons/fa'
import {HiChat } from 'react-icons/hi'
import Link from 'next/link'

function Header() {
  return (
    <>    
    <div className=' h-max  sm:flex py-3 justify-between hidden'>
      <Link href={'/'} className=''>
        <span className='text-orange-700 text-xl font-extrabold'>MUST</span>
        <span className='text-green-700 font-extrabold   '>Chess</span>
        <span className='text-blue-700 text-xl font-extrabold'>Club</span>
      </Link>
      <div className='flex gap-5 px-3 font-bold '>
        <div className='text-green-700 '>Online game</div>       
        <div className='text-slate-300'>discussion</div>
        <div className='text-slate-300'>sign in</div>
      </div>
    </div>

    <div className='flex justify-between py-3 sm:hidden px-3 w-screen'>
      <div>
      <span className='text-orange-700 text-xl font-extrabold'>MUST</span>
        <span className='text-green-700 font-extrabold   '>Chess</span>
        <span className='text-blue-700 text-xl font-extrabold'>Club</span>
      </div>
      <div className='flex text-white gap-4 px-3 items-center'>
        <div className='text-white justify-center'>          
        <FaChessQueen className='text-lg text-green-100' />
        </div>

        <div className='flex hover:underline cursor-pointer justify-center items-center'>
          {/* <FaUsers /> */}
        <HiChat className='text-lg'/>
        </div>
      <div>
      <span className='font-bold'>Sign in</span>
      </div>
      </div>

    </div>
    </>
  )
}

export  {Header}