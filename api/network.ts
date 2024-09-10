import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';
import { Network } from 'src/types/models/Network';

export class NetworkAPI extends BaseApi {
  add(data: Network): Promise<ApiResponse> {
    return this.post<Network>('/networks', data)
  }

  qrJoin(data: { id: string }): Promise<ApiResponse> {
    return this.post<{ id: string }>('/networks/generate-qr?networkId=' + data.id, { id: data.id })
  }

  join(data: { url: string }): Promise<ApiResponse> {
    return this.post<{ id: string }>(data.url)
  }

  networksOfAccount(): Promise<ApiResponse> {
    return this.get('/networks')
  }
}

export default new NetworkAPI();
