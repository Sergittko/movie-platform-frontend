export interface IResponse<T> {
  data: T;
}

export interface IMessageResponse<T> extends IResponse<T> {
  message: string;
}

export interface ISimpleMessageResponse {
  message: string;
}

export interface IResponsePagination<T> {
  data: T;
  page: number;
  limit: number;
  totalResults: number;
  totalPages: number;
}

export interface IPaginationData {
  limit?: number;
  page?: number;
}
