import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';
import { AddNetwork } from 'src/types/requests/AddNetwork';

export class NetworkAPI extends BaseApi {
  add(data: AddNetwork): Promise<ApiResponse> {
    return this.post<AddNetwork>('/networks', data)
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

  getNetworks(): Promise<ApiResponse> {
    return this.get('/networks')
  }

  getNetworkByUuid(uuid: string): Promise<ApiResponse> {
    return this.get(`/networks/${uuid}/uuid`)
  }

  joinNetworkByUuid(uuid: bigint): Promise<ApiResponse> {
    return this.post(`/networks/join-uuid?networkUuid=${uuid}`)
  }
}

export default new NetworkAPI();
