import axios from "axios";

export const instance_api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000, /// ms
});
