// lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:8000/api",
  withCredentials: true, // ✅ automatically send cookies
});

export default axiosInstance;
