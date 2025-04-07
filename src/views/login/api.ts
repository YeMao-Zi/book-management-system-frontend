import request from "@/request";

export function login(data: { username: string; password: string }) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}
