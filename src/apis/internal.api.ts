import axios from "axios";

import { PostLoginPayload, PostRegisterPayload } from "./internal.api.type";

const apiClient = axios.create({
  baseURL: "https://backend-superapps.newus.id",
});

export const postLogin = async (payload: PostLoginPayload) => {
  const response = await apiClient({
    method: "POST",
    url: "/api/auth/login",
    data: payload,
  });

  return response;
};

export const postRegister = async (payload: PostRegisterPayload) => {
  const response = await apiClient({
    method: "POST",
    url: "/api/auth/register",
    data: payload,
  });

  return response;
};
