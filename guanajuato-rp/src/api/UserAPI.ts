import BaseApi from '@/api/BaseApi';
import { UserProfil } from '@/models/User/userProfil';

export class UserAPI {
  static async getCarouselImage() {
    const response = await BaseApi.AppAnonymous.get('api/Web/CarouselImages');
    return response.data;
  }

  static async getUserProfile(discordId: string) {
    const response = await BaseApi.AppLogged.get(`api/User/garrage/${discordId}`);
    return response.data as UserProfil;
  }
}
