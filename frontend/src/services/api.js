import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

export const getGroups = () => api.get("/api/groups");
export const getGroupById = (id) => api.get(`/api/groups/${id}`);
export const createGroup = (group) => api.post("/api/groups", group);

export default api;
