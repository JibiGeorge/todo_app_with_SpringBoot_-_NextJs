"use client"

import TaskBox from '@/components/TaskBox';
import { useContext, useEffect, useState } from 'react';
import { apiGetAllTasks } from './api/task';
import TaskList from '@/components/List';
import { AllTaskContext } from '@/context/TaskContext';

export default function Home() {

  const { setAllTask }: any = useContext(AllTaskContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefetch, setIsRefetch] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await apiGetAllTasks().then((response) => {
        if (response.status === 200) {
          setAllTask(response.data)
        }
        setIsLoading(false);
      })
    })()
  }, [isRefetch])

  return (
    <TaskBox>
      <TaskList isLoading={isLoading} setIsRefetch={setIsRefetch} />
    </TaskBox>
  )
}
