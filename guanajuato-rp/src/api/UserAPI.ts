import BaseApi from '@/api/BaseApi';

export class UserAPI {
  static async getCarouselImage() {
    const response = await BaseApi.AppAnonymous.get('api/Web/CarouselImages');
    return response.data;
  }
}
