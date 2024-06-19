import axios from 'axios';

export const BASE_URL = 'http://3.39.52.110:3000';

export const userInstance = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
});
