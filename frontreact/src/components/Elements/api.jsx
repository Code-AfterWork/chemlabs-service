import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/'; // Replace this with your API base URL
// const accessToken = localStorage.getItem('accessToken');
// const refreshToken = localStorage.getItem('refreshToken');

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const saveAccessToken = (access_token) => {
    localStorage.setItem('accessToken', access_token);
};

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const access_token = getAccessToken();
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const access_token = getAccessToken();
    const refresh_token = getRefreshToken();

    // Handle cases where the access token is expired (status code 401)
    if (error.response.status === 401 && access_token && refresh_token) {
      try {
        const refreshResponse = await api.post('/api/token/refresh/', {
          refresh: refresh_token,
        });

        if (refreshResponse.status === 200) {
          const new_access_token = refreshResponse.data.access;
          saveAccessToken(new_access_token);

          // Retry the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${new_access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token error cases (e.g., refresh token expired, invalid refresh token)
        console.error('Error refreshing token:', refreshError);
        throw new Error('Error refreshing token');
      }
    }

    return Promise.reject(error);
  }
);