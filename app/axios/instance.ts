import axios from "axios";

export interface PaginatedArray<T> extends Array<T> {
  _pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      response.data.success === true &&
      response.data.data !== undefined
    ) {
      const envelope = response.data;
      const data = envelope.data;

      if (data && typeof data === "object" && envelope.pagination) {
        Object.defineProperty(data, "_pagination", {
          value: envelope.pagination,
          writable: true,
          enumerable: false,
          configurable: true,
        });
      }
      response.data = data;
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const currentPath = window.location.pathname;
      if (
        currentPath !== "/" &&
        currentPath !== "/login" &&
        currentPath !== "/register"
      ) {
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
