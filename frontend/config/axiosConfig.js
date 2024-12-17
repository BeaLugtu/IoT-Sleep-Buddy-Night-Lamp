import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the token to every request using an interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // Retrieve token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
