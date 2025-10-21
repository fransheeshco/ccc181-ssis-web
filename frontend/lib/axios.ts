// lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: '/api',  // This will make calls to /api/register, /api/login, etc.
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;