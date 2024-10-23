import { BaseApi } from 'app/api/base';
import { Login } from 'src/types/requests/Login';
import { Register } from 'src/types/requests/Register';
import { ApiResponse } from 'src/types/response/ApiResponse';

export class AuthAPI extends BaseApi {
  register(data: Register): Promise<ApiResponse> {
    return this.post<Register>('/auth/register', data)
  }

  public async login(data: Login): Promise<ApiResponse> {
    return this.post('/auth/login', data)
  }

  public async logout(): Promise<ApiResponse> {
    return this.post('/auth/logout')
  }
}

export default new AuthAPI();
