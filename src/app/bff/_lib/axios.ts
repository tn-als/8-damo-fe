import axios from "axios";
import { getAccessToken } from "@/src/lib/cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const bffAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

bffAxios.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
