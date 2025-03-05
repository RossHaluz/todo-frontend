// utils/api.ts
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

// Додаємо токен до заголовків для кожного запиту
api.interceptors.request.use((config) => {
  const token = Cookies.get("__token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
