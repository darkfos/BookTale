import axios from "axios";


const api = axios.create(
    {
        baseURL: "http://localhost:8882",
    }
);

export default api;