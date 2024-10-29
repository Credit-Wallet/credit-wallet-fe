import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';

export class BillRequestAPI extends BaseApi {
  public async getBillRequest(id: string): Promise<ApiResponse> {
    return this.get(`/bill-requests/${id}`);
  }

  public async confirmBillRequest(id: string): Promise<ApiResponse> {
    return this.put(`/bills/${id}/confirm-bill-request`);
  }

  public async cancelBillRequest(id: string): Promise<ApiResponse> {
    return this.put(`/bills/${id}/cancel-bill-request`);
  }
}

export default new BillRequestAPI();
