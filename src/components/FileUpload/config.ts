import request from "@/request";
import { AxiosRequestConfig } from "axios";

export const fileUpload = (data: any, config: AxiosRequestConfig<any>):Promise<any> => {
    return request({
      method: 'post',
      url: `/book/upload`,
      data,
      ...config,
    })
  }