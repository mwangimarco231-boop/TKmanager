import axios from 'axios';
import Register from '../components/Register';

// services/api.jsx

console.log("Current API Base URL:", getApiBaseUrl());

const getApiBaseUrl = () => {
    if (import.meta.env.PROD) {
        // Use environment variable or fallback to your Render backend URL
        return import.meta.env.VITE_API_URL || 'https://tkmanager-1.onrender.com';
    }
    return 'http://127.0.0.1:8000';
};


const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const taskAPI = {
    getTasks: () => api.get('/tasks/'),
    createTask: (taskData) => api.post('/tasks/', taskData),
    updateTask: (taskId, taskData) => api.put(`/tasks/${taskId}/`, taskData),
    deleteTask: (taskId) => api.delete(`/tasks/${taskId}/`),
    login: (credentials) => axios.post(`${getApiBaseUrl()}/token/`, credentials),
    register: (userData) => api.post('/register/', userData), // Make sure no extra lines are here!
};


export default api;

