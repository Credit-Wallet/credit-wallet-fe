import { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiResponse } from 'src/types/response/ApiResponse';
import { api } from 'boot/axios';

export class BaseApi {
  public readonly axios = api

  public async get<T = ApiResponse>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      return (await this.axios.get(endpoint, config)).data
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  }

  public async post<T>(endpoint: string, data?: T, config?: AxiosRequestConfig): Promise<ApiResponse> {
    try {
      return (await this.axios.post(endpoint, data, config)).data
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  }

  public async postDownload<T = ApiResponse>(endpoint: string, data?: T, config?: AxiosRequestConfig): Promise<T> {
    try {
      return await this.axios.post(endpoint, data, config)
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  }

  public async put<T = ApiResponse>(endpoint: string, data?: T): Promise<T> {
    try {
      return (await this.axios.put(endpoint, data)).data
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  }

  public async delete<T = ApiResponse>(endpoint: string, data?: T): Promise<T> {
    try {
      return (await this.axios.delete(endpoint, { data })).data
    } catch (error) {
      this.handleError(error);
      return Promise.reject(error);
    }
  }

  private handleError(error: unknown): void {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof AxiosError) {
      if (error) {
        errorMessage = error.message || 'Request failed with status ' + error.code;
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.log(errorMessage);
  }
}
