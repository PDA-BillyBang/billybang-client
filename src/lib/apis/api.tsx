import axios from 'axios';

export const BASE_URL = 'http://13.125.34.161:3000';

export const userInstance = axios.create({
  baseURL: BASE_URL + '/users',
  withCredentials: true,
});
