import BaseApi from '@/api/BaseApi';

export class UserAPI {
  static async getCarouselImage() {
    const response = await BaseApi.AppAnonymous.get('api/Web/CarouselImages');
    return response.data;
  }

  static async getUserProfile(discordId: string) {
    const response = await BaseApi.AppLogged.get(`api/User/${discordId}`);
    return response.data as UserProfil;
  }
}
