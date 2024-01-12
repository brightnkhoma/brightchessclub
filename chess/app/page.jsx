"use client";
import React from 'react'
import {FaTrophy} from 'react-icons/fa'
import Link from 'next/link.js';


function page() {
  const activities = [
    {name : 'puzzle', desc : 'Improve your skills with puzzles',href: '/puzzle'},
    {name : 'Play against computer', desc : 'Challenge yourself against chess engine',href: '/engine'},
    {name : 'Archive', desc : 'Learn from international grandmasters',href: '/archive'},
    {name : 'Tournaments', desc : 'join and play tournaments',href: '/tournaments'},
  ]
  
  return (
    <div className='mx-auto flex flex-col sm:h-[91vh] h-full justify-center items-center my-10 sm:my-0'>
     <div>
      <h2 className='flex flex-col'>
        <span className='text-white text-4xl font-bold'>WELCOME TO</span>
        <h1 className='flex gap-2 w-max mx-auto'>
          <span className='text-orange-900 text-lg font-extrabold'>MUST</span>
          <span className='text-green-900 text-lg font-extrabold'>chess</span>
          <span className='text-blue-900 text-lg font-extrabold'>club</span>
        </h1>
        <div className='flex flex-col justify-center items-center text-white desc mt-3 text-lg font-semibold '>

        <p>where strategy meets passion,</p>
        <p>and every move tells a story</p>
        </div>
      </h2>

     </div>
     <div className='flex flex-col sm:flex-row rounded-sm'>
      {activities.map(activity =>(
        <Link key={activity.name} href={activity.href} className='flex flex-col cursor-pointer justify-between items-center border border-gray-500 border-opacity-20  hover:bg-opacity-30 w-[200px] hover:rounded-lg hover:border hover:bg-zinc-700 hover:border-white  mt-20 hover:mx-1 transition-all duration-500'>
          <span className='text-slate-200 p-3 font-semibold '>{activity.name}</span>
          {activity.name === 'Tournaments' && <FaTrophy className='text-white text-xl font-extrabold'/>}
          <span className='text-white text-center mb-2'>{activity.desc}</span>

        </Link>
      ))}
     </div>
      
    </div>
  )
}

export default page