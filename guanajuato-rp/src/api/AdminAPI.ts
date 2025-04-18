import BaseApi from '@/api/BaseApi';

export class AdminAPI {
  static async getUserCarList() {
    const response = await BaseApi.AppLogged.get(`api/Garage/all`);
    return response.data;
  }
  static async getUserList() {
    const response = await BaseApi.AppLogged.get(`api/User/all`);
    return response.data;
  }
  static async updateVoiture(car: any) {
    const response = await BaseApi.AppLogged.put(`api/Garage/${car.keyCar}`, car);
    return response.data;
  }
  static async deleteVoiture(keyCar: string) {
    const response = await BaseApi.AppLogged.delete(`api/Garage/${keyCar}`);
    return response.data;
  }
  static async addVoiture(discordId: string, carId: string) {
    const response = await BaseApi.AppLogged.post(`api/Garage/add/${discordId}/${carId}`);
    return response.data;
  }
  static async register(user: userRegister) {
    const response = await BaseApi.AppLogged.post(`register`, user);
    return response.data;
  }
  static async deleteUser(discordId: string) {
    const response = await BaseApi.AppLogged.delete(`DeleteUser/${discordId}`);
    return response.data;
  }
  static async updateUser(user: userRegister) {
    const response = await BaseApi.AppLogged.put(`api/User/${user.id}`, user);
    return response.data;
  }
}
