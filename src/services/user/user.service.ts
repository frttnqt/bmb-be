import NodeGeocoder from 'node-geocoder';

import { IUserWithCoordinates, User } from '@src/models';
import { IUser, UserModel } from '@src/models/userSchema';


const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: 'AIzaSyC4Plifc4ihlHecloOVc7DGJAvWw3EXZ5A',
  formatter: null
})

export class UserService {
  public static async createUser(userData: IUser): Promise<UserModel> {
    const geocode = await geocoder.geocode(userData.address);
    const userWithGeocode = {...userData, location: {
      coordinates: [geocode[0].latitude as number, geocode[0].longitude as number], type: 'Point'}}
    return await User.create(userWithGeocode);
  }

  public static async bulkCreateUser(userList: IUser[]): Promise<UserModel[]> {
    const updatedUsers: IUserWithCoordinates[] = [];
    for(const user of userList) {
      const geocode = await geocoder.geocode(user.address);
      updatedUsers.push({...user, location: {
          coordinates: [geocode[0].latitude as number, geocode[0].longitude as number], type: 'Point'}})
    }
    return await User.insertMany(updatedUsers);
  }

  public static async getUserListMap(center: number[]): Promise<UserModel[]> {
    return User.find({}).circle('location',{ center, radius: 1}).limit(20);
  }

  public static async getUserList(userNameSearch: string): Promise<UserModel[]> {
    return User.find({name: {$regex: userNameSearch, $options: 'i'}}).limit(20);
  }


  public static async deleteUser(userId: string): Promise<UserModel | null> {
    return User.findByIdAndDelete(userId);
  }
}
