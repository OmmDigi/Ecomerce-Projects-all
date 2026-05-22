import axios from "axios";

export const serverApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      typeof window != "undefined" && localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "",
  },
  withCredentials: true,
});