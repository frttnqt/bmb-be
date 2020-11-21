import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { keys } from "@src/config";
import { AdminService } from "@src/services";

export class AdminController {
	public static async signUp(userName: string, password: string): Promise<void> {
		try {
		  await AdminService.createAdmin({userName, password});
		} catch (err) {
      throw err;
		}
	}

	public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { userName, password } = req.body.admin;
      const admin = await AdminService.login({userName, password})
      if (!admin) {
        res.status(400);
        return;
      }
      const isMatch = await bcrypt.compare(password, admin?.password ||'');
      if (!isMatch) {
        res.status(400);
        return;
      }
      const payload = {
        user: {
          userName: admin?.userName
        }
      };
      jwt.sign(
        payload,
        keys.secret,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            expiresIn: 3600
          });
        }
      );
    } catch (e) {
      res.status(400);
    }
  }
}
