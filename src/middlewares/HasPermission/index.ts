import "dotenv/config";
import { Request, Response, NextFunction } from "express";

interface hasPermissionProps {
	api_key: string;
}
export function hasPermission(req: Request, res: Response, next: NextFunction) {
	try {
		const { api_key } = <hasPermissionProps>req.body;
		const { API_KEY } = process.env;

		if (!api_key) {
			return res
				.status(400)
				.json({ succes: false, message: "api_key is missing" });
		}

		if (!(api_key === API_KEY)) {
			res.status(403).json({ succes: false, message: "Forbidden" });
		} else {
			next();
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({ succes: false, message: e });
	}
}
