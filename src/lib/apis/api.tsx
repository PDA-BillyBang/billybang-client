import axios from 'axios';

export const BASE_URL = 'http://www.billybang.me:3000'; // 로컬에서 CORS를 해결하려면 /api, 빌드용은 BASEURL + /api 로 해야한다 

export const userInstance = axios.create({
  baseURL: BASE_URL + '/api/users',
  withCredentials: true,
});

export const myInstance = axios.create({
  baseURL: BASE_URL + '/',
});

export const loanInstance = axios.create({
  baseURL: BASE_URL + '/api/loans',
  withCredentials: true,
});

export const statisticsInstance = axios.create({
  baseURL: BASE_URL + '/api/districts',
  withCredentials: true,
});

export const baseInstance = axios.create({
  baseURL: BASE_URL + '/api',
  withCredentials: true,
});

export const propertyInstance = axios.create({
  baseURL: BASE_URL + '/api/properties',
  withCredentials: true,
});
