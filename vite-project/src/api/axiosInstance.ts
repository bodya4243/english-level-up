import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response, // Успішна відповідь
    (error) => {
        // Обробка помилок
        if (error.response?.status === 401) {
            console.error('Unauthorized! Redirecting to login...');
            // Наприклад, перенаправлення на сторінку логіну
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;