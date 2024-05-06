import axios from "axios";


const api = axios.create(
    {
        baseURL: "http://localhost:8952",
    }
);

export default api;