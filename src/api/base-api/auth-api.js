import axios from "axios";

let debounceTimer;

// Debounce function
export const debounce = (func, delay) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => func(), delay);
};

export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_OAUTH_URL,
  timeout: 5000,
});

// Add a request interceptor
authInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
