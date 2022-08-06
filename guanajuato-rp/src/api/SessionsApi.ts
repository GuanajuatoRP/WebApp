import BaseApi from '@/api/BaseApi';

export class SessionsApi {
  static async getSessionsWithUser() {
    const response = await BaseApi.AppAnonymous.get('api/Sessions?withUSers=true');
    return response.data;
  }

  static async createNewSession(newSessionDTO: newSessionDTO) {
    const response = await BaseApi.AppLogged.post('api/Sessions', newSessionDTO);
    return response.data;
  }

  static async deleteSession(id) {
    const response = await BaseApi.AppLogged.delete(`api/Sessions/${id}`);
    return response.data;
  }

  static async getUserAreNotInSessions(id) {
    const response = await BaseApi.AppLogged.get(`api/Sessions/${id}/users`);
    return response.data;
  }

  static async addUserIntoSession(sessionId, dtos) {
    const response = await BaseApi.AppLogged.put(`api/Sessions/add/${sessionId}`, dtos);
    return response.data;
  }
}
