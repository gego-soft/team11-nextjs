"use client";

import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
// ✅ Add response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear authentication cookies
      Cookies.remove("userToken");
  window.location.href = "/";

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/"; // or your login route
      }
    }
    return Promise.reject(error);
  }
);
export default api;
