import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.110:3005",
});

export const createSession = async (name, password) => {
  return api.post("/auth", { username: name, password: password });
};

export const getUsers = async () => {
  return api.get("/users");
};
