import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TaskTypes } from '@/types/task';
import { apiDeleteTask, apiToogleTask } from '@/app/api/task';
import { AllTaskContext } from '@/context/TaskContext';
import { useRouter } from 'next/navigation';

interface Props {
    isLoading: boolean;
    setIsRefetch: any;
}

const TaskList = ({ isLoading, setIsRefetch }: Props) => {

    const router = useRouter();

    const { allTask, setAllTask }: any = useContext(AllTaskContext);

    const handleDelete = async (id: any) => {
        try {
            await apiDeleteTask(id).then(async (response: any) => {
                if (response.status === 200) {
                    alert("Successfully Deleted")
                    const newTaskList = await allTask.filter((task: TaskTypes) => task.id !== id);
                    setAllTask(newTaskList)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleComplete = async (id: any) => {
        try {
            await apiToogleTask(id).then((response: any) => {
                console.log(response)
                if (response.status === 200) {
                    alert(response.data.status)
                    setIsRefetch(true)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {isLoading && <h1>Loading ...</h1>}
            {!isLoading &&
                <ul className='w-full h-full flex flex-col gap-2 overflow-scroll'>
                    {allTask.map((task: TaskTypes, key: number) => {
                        return (
                            <li className={`w-full flex gap-3 items-center justify-between font-medium border-b-2 border-b-slate-300 pb-2`} key={key}>
                                <input type="checkbox" name="" id="" className='cursor-pointer' checked={task.completed} onChange={() => handleComplete(task?.id)} />
                                <span className={`break-all w-full ${task.completed && 'line-through'} `} style={{ color: '#727580' }}>{task.task_name}</span>
                                <div className='w-auto h-auto flex flex-row gap-2'>
                                    <CiEdit style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }} onClick={() => router.push(`/update?id=${task.id}`)} />
                                    <MdDelete style={{ color: '#000', fontSize: '20px', cursor: 'pointer' }} onClick={() => handleDelete(task?.id)} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            }
        </>
    )
}

export default TaskList