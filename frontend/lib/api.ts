import axios from "axios";

const api = axios.create({
  baseURL: "https://your-render-url.onrender.com  ",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;