import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';
import { CreateTransaction } from 'src/types/requests/CreateTransaction';
import { Pagination } from 'src/types/requests/Pagination';

export class TransactionAPI extends BaseApi {
  public async createTransaction(data: CreateTransaction): Promise<ApiResponse> {
    return this.post('/transactions', data);
  }

  // get transactions
  public async getTransactions(params: Pagination): Promise<ApiResponse> {
    return this.get('/transactions?page=' + params.page + '&limit=' + params.limit + '&sort=' + params.sort);
  }

  //transfer-money
  public async transferMoney(told: number, amount: number): Promise<ApiResponse> {
    return this.post('/wallets/transfer-money?toId=' + told + '&amount=' + amount);
  }

  //get wallet
  public async getWallet(): Promise<ApiResponse> {
    return this.get('/wallets');
  }
}

export default new TransactionAPI();
