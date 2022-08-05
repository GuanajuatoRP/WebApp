import BaseApi from '@/api/BaseApi';

export class SessionsApi {
  static async getSessionsWithUser() {
    const response = await BaseApi.AppAnonymous.get('api/Sessions?withUSers=true');
    return response.data;
  }
}
