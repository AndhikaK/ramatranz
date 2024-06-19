import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { handleLogoutSession } from "@/features/auth/services/auth.service";
import { getAccessToken } from "@/features/auth/store/auth-store";

import {
  GetArticleDetailResponseSuccess,
  GetArticleQuery,
  GetArticleResponseSuccess,
  GetDoorToDoorApiResponseSuccess,
  GetDoorToDoorParams,
  GetPaymentMethodResponseSuccess,
  GetPaymentStatusResponseSuccess,
  GetTravelBranchResponseSuccess,
  OrderListResponseSuccess,
  PostLoginPayload,
  PostLoginResponseSuccess,
  PostProcessPaymentPayload,
  PostRegisterPayload,
  TravelPointToPointApiParams,
  TravelScheduleQuery,
  TravelScheduleResponseSuccess,
  TravePointToPointApiResponseSuccess,
} from "./internal.api.type";

const apiClient = axios.create({
  baseURL: "https://backend-superapps.newus.id",
});

const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const accessToken = getAccessToken();

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

const responseInterceptorError = (error: AxiosError) => {
  const accessToken = getAccessToken();
  console.error({
    type: "api error",
    url: error.config?.url,
    data: error.response?.data,
  });
  // force logout user if got status 401 Unauthorized
  if (error.status === 401 && accessToken) {
    handleLogoutSession();
  }

  return Promise.reject(error);
};

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use((response) => {
  console.log({
    type: "api success",
    url: response.config.url,
    data: response.data,
  });
  return response;
}, responseInterceptorError);

const apiClientMock = axios.create({
  baseURL: "https://f0f2764d-a0d1-45f1-bb3d-f72539758a03.mock.pstmn.io",
});
apiClientMock.interceptors.request.use(requestInterceptor);
apiClientMock.interceptors.response.use(
  (response) => response,
  responseInterceptorError
);

export const postLogin = async (payload: PostLoginPayload) => {
  const response = await apiClient<PostLoginResponseSuccess>({
    method: "POST",
    url: "/api/auth/login",
    data: payload,
  });

  return response.data;
};

export const postRegister = async (payload: PostRegisterPayload) => {
  const response = await apiClient({
    method: "POST",
    url: "/api/auth/register",
    data: payload,
  });

  return response.data;
};

export const getArticles = async (query?: GetArticleQuery) => {
  const response = await apiClient<GetArticleResponseSuccess>({
    method: "GET",
    url: `/api/artikel/artikel${query?.type ? "/" + query.type : ""}`,
  });

  return response.data;
};

export const getArticleById = async (id: string) => {
  const response = await apiClient<GetArticleDetailResponseSuccess>({
    method: "GET",
    url: "/api/artikel/artikel/" + id,
  });

  return response.data;
};

export const getTravelSchedule = async (params: TravelScheduleQuery) => {
  const response = await apiClientMock<TravelScheduleResponseSuccess>({
    method: "GET",
    url: "/api/jadwal/jadwal",
    params: {
      ...params,
      // transform Date, into yyyy-mm-dd
      date: new Date(params.date).toISOString().slice(0, 10),
    },
  });

  return response.data;
};

export const getTravelBranch = async () => {
  const response = await apiClientMock<GetTravelBranchResponseSuccess>({
    method: "GET",
    url: "/api/cabang/master_cabang",
  });

  return response.data;
};

export const getPointToPointApi = async (
  params: TravelPointToPointApiParams
) => {
  const response = await apiClientMock<TravePointToPointApiResponseSuccess>({
    method: "GET",
    url: "/api/point-to-point",
    params,
  });

  return response.data;
};

export const getPaymentMethod = async () => {
  const response = await apiClientMock<GetPaymentMethodResponseSuccess>({
    method: "GET",
    url: "/api/pembayaran/metode-pembayaran",
  });

  return response.data;
};

export const postProcessPayment = async (data: PostProcessPaymentPayload) => {
  const response = await apiClientMock({
    method: "POST",
    url: "/api/pembayaran/process",
    data,
  });

  return response.data;
};

export const getOrderList = async () => {
  const response = await apiClientMock<OrderListResponseSuccess>({
    method: "GET",
    url: "/api/pesanan",
  });

  return response.data;
};

export const getPaymentStatusDetail = async (id: string) => {
  const response = await apiClientMock<GetPaymentStatusResponseSuccess>({
    method: "GET",
    url: "/api/pesanan/" + id,
  });

  return response.data;
};

export const getDoorToDoorApi = async (params: GetDoorToDoorParams) => {
  const response = await apiClientMock<GetDoorToDoorApiResponseSuccess>({
    method: "GET",
    url: "/api/door-to-door",
    params,
  });

  return response.data;
};
