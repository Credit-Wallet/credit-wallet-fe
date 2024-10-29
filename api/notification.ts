import { BaseApi } from 'app/api/base';
import { ApiResponse } from 'src/types/response/ApiResponse';

interface PaginationNotifications {
  type: string;
  page: number;
  limit: number;
}

export class NotificationAPI extends BaseApi {
  public async getNotifications(params: PaginationNotifications): Promise<ApiResponse> {
    return this.get(`/notifications?type=${params.type}&page=${params.page}&limit=${params.limit}`);
  }

  public async readNotification(id: string): Promise<ApiResponse> {
    return this.put(`/notifications/${id}/read`);
  }

  public async readAllNotifications(): Promise<ApiResponse> {
    return this.put('/notifications/read-all');
  }
}

export default new NotificationAPI();
