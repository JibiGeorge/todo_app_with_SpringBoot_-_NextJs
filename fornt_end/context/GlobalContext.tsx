"use client"

import React, { useState } from 'react'
import { AllTaskContext } from './TaskContext'

const GlobalContext = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [allTask, setAllTask] = useState<any[]>([]);
    return (
        <AllTaskContext.Provider value={{ allTask, setAllTask }}>
            {children}
        </AllTaskContext.Provider>
    )
}

export default GlobalContext