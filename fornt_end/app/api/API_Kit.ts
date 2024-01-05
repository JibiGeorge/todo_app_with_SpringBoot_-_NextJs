import axios from "axios";

let APIKit = axios.create({
    baseURL: "http://localhost:8080/task",
    timeout: 1000000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default APIKit;