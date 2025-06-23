import { API_BASE_URL } from "@/utils/environment";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 seconds timeout
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ⚠️ Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API Error]", error.response || error.message);
    return Promise.reject(error);
  }
);
