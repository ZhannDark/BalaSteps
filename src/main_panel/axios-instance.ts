import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://project-back-81mh.onrender.com',
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.url?.includes('/auth/login/')) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
