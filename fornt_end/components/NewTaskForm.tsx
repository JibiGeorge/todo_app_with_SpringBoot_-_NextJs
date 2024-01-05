"use client"

import { apiCreateTask } from '@/app/api/task'
import React, { useState } from 'react'
import TaskBox from './TaskBox'
import { useRouter } from 'next/navigation'

const NewTaskForm = () => {

    const router = useRouter();

    const [formData, setFormData] = useState<any>({
        task_name: ""
    })

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiCreateTask(formData).then((response) => {
                if (response.status === 201) {
                    alert("Task Added")
                    router.push('/');
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskBox>
            <form onSubmit={handleFormSubmit} className='w-full h-auto'>
                <textarea className='border border-1 border-bg2 w-full min-h-[80px] rounded-lg outline-none py-1.5 px-1.5 shadow-md' onChange={(e) => setFormData({ task_name: e.target.value })} />
                <input type="submit" value="Submit" className='w-auto h-auto px-3 py-1 bg-bg1 rounded-2xl font-medium text-[16px] mt-2 text-white cursor-pointer' />
            </form>
        </TaskBox>
    )
}

export default NewTaskForm