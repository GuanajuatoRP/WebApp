import BaseApi from '@/api/BaseApi';
import { DiscordGetTokenModel } from '@/models/Auth/DiscordGetTokenModel';
import { DiscordAuthTokenModel } from '@/models/Auth/DiscordAuthTokenModel';

export class DiscordApi {
  static async getToken(dto: DiscordGetTokenModel) {
    const bodyFormData = new FormData();
    bodyFormData.append('client_id', dto.client_id);
    bodyFormData.append('client_secret', dto.client_secret);
    bodyFormData.append('code', dto.code);
    bodyFormData.append('grant_type', dto.grant_type);
    bodyFormData.append('redirect_uri', dto.redirect_uri);
    const response = await BaseApi.AppDiscordApi.post(`/oauth2/token`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
  static async getIdentity(dto: DiscordAuthTokenModel) {
    const response = await BaseApi.AppDiscordApi.get(`users/@me`, {
      headers: { Authorization: `Bearer ${dto.token}` },
    });
    return response.data;
  }
  static async getGuilds(dto: DiscordAuthTokenModel) {
    const response = await BaseApi.AppDiscordApi.get(`users/@me/guilds`, {
      headers: { Authorization: `Bearer ${dto.token}` },
    });
    return response.data;
  }
}
