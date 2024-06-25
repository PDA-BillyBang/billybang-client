import axios from 'axios';

export const BASE_URL = 'http://www.billybang.me:3000'; // 로컬에서 CORS를 해결하려면 /api, 빌드용은 BASEURL + /api 로 해야한다 

export const userInstance = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
});

export const myInstance = axios.create({
  baseURL: '/',
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

export const propertyInstance = axios.create({
  baseURL: '/api/properties',
  withCredentials: true,
});
