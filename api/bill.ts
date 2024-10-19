import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';
import { CreateBill } from 'src/types/requests/CreateBill';
import { Pagination } from 'src/types/requests/Pagination';

export class BillAPI extends BaseApi {
  public async createBill(data: CreateBill): Promise<ApiResponse> {
    return this.post('/bills', data);
  }

  public async getBills(params: Pagination): Promise<ApiResponse> {
    return this.get(`/bills?page=${params.page}&limit=${params.limit}&sort=${params.sort}`);
  }

  //cancelBill
  public async cancelBill(id: string): Promise<ApiResponse> {
    return this.delete(`/bills/${id}`);
  }

  //confirmBill
  public async confirmBill(id: string): Promise<ApiResponse> {
    return this.put(`/bills/${id}/confirm`);
  }

  // get bill by id
  public async getBillById(id: string): Promise<ApiResponse> {
    return this.get(`/bills/${id}`);
  }
}

export default new BillAPI();
