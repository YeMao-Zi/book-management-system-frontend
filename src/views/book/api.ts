import request from "@/request";
import { Book } from "@/types/book";

export function list(params?: { name?: string }): Promise<Book[]> {
  return request({
    url: "/book/list",
    method: "get",
    params,
  });
}

export function create(data: Partial<Book>) {
  return request({
    url: "/book/create",
    method: "post",
    data,
  });
}

export function detail(id: number): Promise<Book> {
  return request({
    url: `/book/${id}`,
    method: "get",
  });
}

export function update(data: Partial<Book>) {
  return request({
    url: "/book/update",
    method: "put",
    data,
  });
}


export function deleteBook(id: number) {
  return request({
    url: `/book/delete/${id}`,
    method: "delete",
  });
}