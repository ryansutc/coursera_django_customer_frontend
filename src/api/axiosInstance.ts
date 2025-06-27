/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/utils/environment";
import { getToken, setToken } from "@/utils/tokenStore";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const TOKEN_REFRESH_URI = "/api/token/refresh/";
async function refreshToken() {
  try {
    const response = await axios.post(`${API_BASE_URL}${TOKEN_REFRESH_URI}`, {
      refresh: refreshToken,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setToken(response.data?.access);
  } catch (e) {
    console.warn("[API warn] Failed to refresh token:", e);
    return null;
  }
}

let isRefreshing = false;

type FailedQueueItem = {
  resolve: (token: string | null) => void;
  reject: (err: any) => void;
};

type AxiosRequestConfigWithRetry = AxiosRequestConfig & {
  _retry?: boolean;
  url: string;
};
/**
 * A queue to hold requests that are waiting for a token refresh.
 * This is necessary to avoid multiple requests being sent while the token is being refreshed.
 */
let failedQueue: FailedQueueItem[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 seconds timeout
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ⚠️ Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.endsWith(TOKEN_REFRESH_URI)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(async (token) => {
            if (!originalRequest.headers) {
              originalRequest.headers = {};
            }
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return await axiosInstance(originalRequest);
          })
          .catch((err) => {
            throw err;
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const newToken = await refreshToken();
      isRefreshing = false;
      processQueue(null, newToken);
      if (newToken) {
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers["Authorization"] = "Bearer " + String(newToken);
        return axiosInstance(originalRequest);
      } else {
        processQueue(error, null);
        localStorage.clear();
        // Optionally, redirect to login
        return Promise.reject(error);
      }
    }
    console.error("[API Error]", error.response || error.message);
    return Promise.reject(error);
  }
);
