import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const axiosWithAuth = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosWithAuth;
