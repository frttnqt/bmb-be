import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { keys } from "@src/config";

export const auth = (req:Request, res: Response, next: NextFunction) => {
	const token = req.header("token");
	if (!token) return res.status(401).json({ message: "Auth Error" });
	try {
		const decoded: any= jwt.verify(token, keys.secret);
		req.user = decoded.user;
		next();
	} catch (e) {
		console.error(e);
		res.status(500).send({ message: "Invalid Token" });
	}
};
