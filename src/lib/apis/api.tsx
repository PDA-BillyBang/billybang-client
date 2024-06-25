import axios from 'axios';

export const BASE_URL = 'http://www.billybang.me:3000';

export const userInstance = axios.create({
  baseURL: BASE_URL + '/api/users',
  withCredentials: true,
});

export const myInstance = axios.create({
  baseURL: '/',
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
