import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';

export class AccountAPI extends BaseApi {
  public async getAccountsByNetworkId(data: { networkId: number }): Promise<ApiResponse> {
    return this.get('/accounts/network/' + data.networkId);
  }

  public async getProfile(): Promise<ApiResponse> {
    return this.post('/auth/profile');
  }

  //selected network
  public async selectedNetwork(networkId: number): Promise<ApiResponse> {
    return this.put('/accounts/update-selected-network/' + networkId);
  }

  //update-is-two-factor
  public async updateIsTwoFactor(): Promise<ApiResponse> {
    return this.post('/auth/update-is-two-factor');
  }
}

export default new AccountAPI();
