"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

const Header = () => {

  const router = useRouter()

  const handleNewTask = () => {
    router.push('/add')
  }

  return (
    <div className='w-full h-[60px] sticky top-0'>
      <div className='w-full h-full bg-bg1 flex flex-row'>
        <div className='w-full flex justify-center items-center'>
          <h2 className='font-bold text-2xl text-white'>Todo List</h2>
        </div>
        <div className='w-auto flex items-center mr-3'>
          <button className='bg-gray-600 p-3 flex flex-row justify-center items-center rounded-full shadow-lg shadow-shadow1 gap-2' onClick={handleNewTask}>
            <FaPlus style={{ color: '#FFFFFF' }} />
            <span className='text-white font-medium text-[12px] whitespace-nowrap'>New Task</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header