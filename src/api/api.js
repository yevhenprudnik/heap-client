import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:9000/',
  headers: {
    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const response = await axios.get(
      'http://localhost:9000/auth/refresh',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'accessToken'
          )} ${localStorage.getItem('refreshToken')}`,
        },
      },
      { withCredentials: true }
    );
    console.log('Using interceptor', response.data);

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    originalRequest.headers.Authorization = `Bearer ${response.data.accessToken} ${response.data.refreshToken}`;

    return api.request(originalRequest);
  }
);
