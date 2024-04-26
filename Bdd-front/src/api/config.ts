import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
});

let refresh = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      try {
        const token = localStorage.getItem("token");
        const data = JSON.parse(token || "{}");
        originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        localStorage.removeItem("token");
        window.location.reload();
        console.log(error);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);
