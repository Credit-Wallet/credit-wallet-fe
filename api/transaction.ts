import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';
import { CreateTransaction } from 'src/types/requests/CreateTransaction';

export class TransactionAPI extends BaseApi {
  public async createTransaction(data: CreateTransaction): Promise<ApiResponse> {
    return this.post('/transactions', data);
  }
}

export default new TransactionAPI();
