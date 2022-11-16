import axios from "axios";

export const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
