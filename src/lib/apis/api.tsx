import axios from 'axios';

export const BASE_URL = 'http://3.39.52.110:3000';

export const userInstance = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
});
<<<<<<< feat/login
=======

export const myInstance = axios.create({
  baseURL: BASE_URL + '/',
});

export const loanInstance = axios.create({
  baseURL: '/api/loans',
  withCredentials: true,
});

export const statisticsInstance = axios.create({
  baseURL: '/api/districts',
  withCredentials: true,
});

export const baseInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});
>>>>>>> develop
