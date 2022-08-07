import BaseApi from '@/api/BaseApi';
import { newSessionDTO } from '@/models/Sessions/newSessionDTO';
import { editSessionDateDTO } from '@/models/Sessions/editSessionDateDTO';

export class SessionsApi {
  static async getSessionsWithUser() {
    const response = await BaseApi.AppAnonymous.get('api/Sessions?withUSers=true');
    return response.data;
  }

  static async createNewSession(newSessionDTO: newSessionDTO) {
    const response = await BaseApi.AppLogged.post('api/Sessions', newSessionDTO);
    return response.data;
  }

  static async deleteSession(id: string) {
    const response = await BaseApi.AppLogged.delete(`api/Sessions/${id}`);
    return response.data;
  }

  static async getUserAreNotInSessions(id: string) {
    const response = await BaseApi.AppLogged.get(`api/Sessions/${id}/!users`);
    return response.data;
  }
  static async getUserAreInSessions(id: string) {
    const response = await BaseApi.AppLogged.get(`api/Sessions/${id}/users`);
    return response.data;
  }

  static async addUserIntoSession(sessionId: string, usernames: string[]) {
    const response = await BaseApi.AppLogged.post(`api/Sessions/add/${sessionId}/users`, usernames);
    return response.data;
  }

  static async removeUserIntoSession(sessionId: string, usernames: string[]) {
    const response = await BaseApi.AppLogged.post(`api/Sessions/remove/${sessionId}/users`, usernames);
    return response.data;
  }

  static async editSessionTime(sessionId: string, sessionTimesDTO: editSessionDateDTO) {
    const response = await BaseApi.AppLogged.put(`api/Sessions/${sessionId}/date`, sessionTimesDTO);
    return response.data;
  }
}
