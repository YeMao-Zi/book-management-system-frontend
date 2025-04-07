declare namespace API {
  type BaseResponseType<T> = Readonly<{
    code: number;
    message?: string;
    data?: T;
  }>;
}
