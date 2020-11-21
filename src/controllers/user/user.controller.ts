import { Request, Response } from 'express';
import { UserService } from '@src/services/user';
import { IUser } from "@src/models";

export class UserController  {
  public static async addUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = await UserService.createUser(req.body?.userData as IUser);
      userData ? res.status(200).send(userData) : res.sendStatus(400);
    } catch {
      res.sendStatus(400);
    }
  }


  public static async addUserList(req: Request, res: Response): Promise<void> {
    try {
      const userList = await UserService.bulkCreateUser(req.body?.userList as IUser[]);
      userList ? res.status(200).send(userList) : res.sendStatus(400);
    } catch {
      res.sendStatus(400);
    }
  }

  public static async getUserList(req: Request, res: Response): Promise<void> {
    try {
      const userNameSearchString = req.query?.userName as string;
      const userList = await UserService.getUserList(userNameSearchString);
      res.status(200).send(userList);
    } catch {
      res.sendStatus(400);
    }
  }

  public static async getUserListMap(req: Request, res: Response): Promise<void> {
    try {
      const centerCoordinates = [Number(req.query.lat), Number(req.query.lng)];
      const locationList = await UserService.getUserListMap(centerCoordinates);
      res.status(200).send(locationList);
    } catch {
      res.sendStatus(400);
    }
  }
  public static async deleteUser(req: Request, res:Response): Promise<void> {
    try {
      const deletedUser = await UserService.deleteUser(req.params?.id);
      res.status(200).send(deletedUser)
    }
    catch {
      res.sendStatus(400);
    }
  }
}
