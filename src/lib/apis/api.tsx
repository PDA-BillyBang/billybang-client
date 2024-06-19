import axios from 'axios';

export const BASE_URL = 'http://3.39.52.110:3000';

export const userInstance = axios.create({
  baseURL: BASE_URL + '/users',
  withCredentials: true,
});

export const myInstance = axios.create({
  baseURL: BASE_URL + '/',
});
