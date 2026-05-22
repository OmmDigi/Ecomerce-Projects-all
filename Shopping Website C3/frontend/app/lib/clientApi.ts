import axios from "axios";

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      typeof window != "undefined" && localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "",
  },
  withCredentials: true,
});

export const fetcher = (url: string) =>
  clientApi.get(url).then((res) => res.data);

export const getFetcher = async (url: string) => {
  const response = await clientApi.get(url);
  return response.data;
};

// POST
export const postFetcher = async <T>(url: string, data: T) => {
  const response = await clientApi.post(url, data);
  return response.data;
};

// PUT
export const putFetcher = async <T>(url: string, data: T) => {
  const response = await clientApi.put(url, data);
  return response.data;
};

// DELETE
export const deleteFetcher = async (url: string) => {
  const response = await clientApi.delete(url);
  return response.data;
};
