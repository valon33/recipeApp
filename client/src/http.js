import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL: "https://recipe-app-backend-4xd6.onrender.com",
});

API.interceptors.request.use((req) => {
    const token = JSON.parse(localStorage.getItem("token"));
    // const user = JSON.parse(localStorage.getItem("token"));
    // if (user && user.token) {
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
