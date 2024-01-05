import { createContext } from "react";

interface TaskContextProps {
    allTask: any[];
    setAllTask: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AllTaskContext = createContext<TaskContextProps | undefined>(undefined);