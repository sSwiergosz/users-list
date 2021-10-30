import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { User } from "src/types/user.types";

const config: AxiosRequestConfig = {
  baseURL: "http://jsonplaceholder.typicode.com/",
};

const instance: AxiosInstance = axios.create(config);

export const api = {
  getUsers: () => instance.get<Array<User>>("users"),
};
