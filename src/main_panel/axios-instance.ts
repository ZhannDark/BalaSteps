import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://project-back-81mh.onrender.com',
});

const PUBLIC_GET_ENDPOINTS = [
  '/info-hub/news/',
  '/info-hub/specialists/',
  '/info-hub/therapy-centers/',
];

const PUBLIC_ENDPOINTS = [
  '/auth/login/',
  '/auth/register/',
  '/auth/verify-otp/',
  '/auth/verify-new-email/',
  '/auth/reset-password/',
  '/auth/reset-password/confirm/',
  '/auth/logout/',
];

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  // 👉 получаем абсолютный путь (после host)
  const url = new URL(config.url || '', config.baseURL).pathname;

  const isPublicGet =
    config.method === 'get' &&
    PUBLIC_GET_ENDPOINTS.some((route) => url.startsWith(route));

  const isPublicRequest = PUBLIC_ENDPOINTS.some((route) =>
    url.startsWith(route)
  );

  if (token && !isPublicGet && !isPublicRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default axiosInstance;
