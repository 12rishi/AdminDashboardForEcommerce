import axios from 'axios';

const APIAuthenticated: any = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `${localStorage.getItem('token')}`,
  },
});

const API: any = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export { APIAuthenticated, API };
