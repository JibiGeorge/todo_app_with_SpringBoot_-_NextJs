import { TaskTypes } from "@/types/task";
import APIKit from "./API_Kit";

export const apiCreateTask = async (request: TaskTypes) => {
    return await APIKit.post('/add', request);
}

export const apiGetAllTasks = async () => {
    return await APIKit.get('/getAllTasks');
}

export const apiGetTask = async (id: string) => {
    return await APIKit.get(`/getTask/${id}`);
}

export const apiDeleteTask = async (id: string) => {
    return await APIKit.delete(`/deleteTask/${id}`);
}

export const apiUpdateTask = async (id: string, request: TaskTypes) => {
    return await APIKit.put(`/updateTask/${id}`,request);
}

export const apiToogleTask = async (id: string) => {
    return await APIKit.put(`/toggleTask/${id}`);
}