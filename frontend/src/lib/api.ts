import axios from "axios";

export const api = axios.create({
    baseURL: "/api",
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
});

// Read token from localStorage (simple start)
api.interceptors.request.use((config) => {
    const raw = localStorage.getItem("auth");
    if (raw) {
        const { token } = JSON.parse(raw);
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
