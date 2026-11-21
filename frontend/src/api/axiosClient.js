import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  timeout: 15000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {

    // JWT token integration will be added
    // when we implement authentication.

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {

    if (error.response) {

      console.error(
        "API Error:",
        error.response.status,
        error.response.data
      );

    } else if (error.request) {

      console.error(
        "No response received from backend."
      );

    } else {

      console.error(
        "Request configuration error:",
        error.message
      );

    }

    return Promise.reject(error);
  }
);

export default axiosClient;