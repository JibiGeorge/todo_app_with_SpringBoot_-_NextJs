"use client"

import React, { useEffect, useState } from 'react'
import TaskBox from './TaskBox'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiGetTask, apiUpdateTask } from '@/app/api/task'
import { TaskTypes } from '@/types/task'

const UpdateTaskForm = () => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const search: string = searchParams.get('id') ?? '';

    const [formData, setFormData] = useState<TaskTypes>({
        id: 0,
        task_name: "",
        completed: false
    })


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiUpdateTask(search, formData).then((response) => {
                if (response.status === 200) {
                    router.push('/')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await apiGetTask(search);
                if (response.status === 200) {
                    setFormData(response.data.data);
                } else if (response.status === 404) {
                    // Handle not found case
                    console.log('Task not found');
                }
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        })();
    }, [search]);

    return (
        <TaskBox>
            <form onSubmit={handleFormSubmit} className='w-full h-auto'>
                <textarea className='border border-1 border-bg2 w-full min-h-[80px] rounded-lg outline-none py-1.5 px-1.5 shadow-md' value={formData?.task_name} onChange={(e) => setFormData({ task_name: e.target.value })} />
                <input type="submit" value="Submit" className='w-auto h-auto px-3 py-1 bg-bg1 rounded-2xl font-medium text-[16px] mt-2 text-white cursor-pointer' />
            </form>
        </TaskBox>
    )
}

export default UpdateTaskForm