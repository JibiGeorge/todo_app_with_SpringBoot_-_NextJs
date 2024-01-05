"use client"

import React from 'react'

interface Props {
    children: React.ReactNode
}

const TaskBox = ({ children }: Props) => {

    return (
        <div className='w-full h-full overflow-hidden'>
            <div className='w-full relative flex flex-col items-center h-full pb-5'>
                <div className={`min-w-[600px] w-[600px] bg-[#e6e6e665] h-auto px-10 py-6 relative flex flex-col items-center overflow-hidden rounded-xl shadow-lg`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TaskBox