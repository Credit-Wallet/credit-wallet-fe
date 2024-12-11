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

  //save fcm token
  public async saveFcmToken(token: string): Promise<ApiResponse> {
    return this.post('/auth/fcm-token', { token })
  }

  //upload avatar
  public async uploadAvatar(file: FormData): Promise<ApiResponse> {
    return this.post('/auth/upload-avatar', file)
  }

  //update username
  public async updateUsername(username: string): Promise<ApiResponse> {
    return this.post('/auth/update-username', username, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  //update email
  public async updateEmail(email: string): Promise<ApiResponse> {
    return this.post('/auth/update-email', email, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  //update password
  public async updatePassword(password: string): Promise<ApiResponse> {
    return this.post('/auth/update-password', { password })
  }

  //generate
  public async generateTwoFactor(userName: string): Promise<ApiResponse> {
    return this.get('/auth/generate-two-factor/' + userName)
  }

  //validate
  public async validateTwoFactor(email: string, otp: number): Promise<ApiResponse> {
    return this.post('/auth/validate-two-factor?email=' + email + '&otp=' + otp)
  }
}

export default new AuthAPI();
