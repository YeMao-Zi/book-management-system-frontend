import request from "@/request";

export function register(data: { username: string; password: string }) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}
