import axios from 'axios';

export const userInstance = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
});
