// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set the base URL for your API
  headers: {
    'Content-Type': 'application/json', // Set default headers
    // Add any other default headers here
  },
});

export default instance;
