import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { Message } from "@arco-design/web-react";

const netWorkCodeMaps: Record<number, string> = {
  404: "404 Not Found",
  405: "Method Not Allowed",
  504: "网关错误",
  500: "服务器错误",
} as const;

const axiosInterface = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
});

// 请求拦截
axiosInterface.interceptors.request.use((config) => {
  // ...
  return config;
});

// 响应拦截
axiosInterface.interceptors.response.use(
  async (response: AxiosResponse<API.BaseResponseType<any>>) => {
    console.log(response, "response");
    const { code, message } = response.data;
    if (code >= 300 || code < 200) {
      Message.error(message || "服务器错误");
      return Promise.reject(response);
    }
    return response;
  },
  ({ response }) => {
    console.log(response, "responseErr");
    const message =
      response?.data?.message ||
      netWorkCodeMaps[response.status] ||
      "服务器错误";
    // 请求失败，也弹出状态码
    Message.error(message);
    return Promise.reject(message);
  }
);

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const result = await axiosInterface(config);
    console.log(result, "result");
    return result?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
