import bcrypt from "bcryptjs";

import { Admin, AdminModel, IAdmin } from '@src/models';

export class AdminService {
  public static async createAdmin({ userName, password }: IAdmin): Promise<Partial<AdminModel>> {
    const user = new Admin({
      userName,
      password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return {
      userName: user.userName
    };
  }

  public static async login({ userName, password }: IAdmin): Promise<AdminModel | null> {
   return Admin.findOne({
      userName
    });
  }
}
