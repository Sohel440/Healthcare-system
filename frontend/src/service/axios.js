import axios from "axios";

const api = axios.create({
  baseURL: "https://healthcare-system-seven-nu.vercel.app/api/v1",
  withCredentials: true, // important for (cookie JWT)
});

export default api;
