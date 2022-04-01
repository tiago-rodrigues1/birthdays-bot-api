import { Request, Response } from "express";

import { ListAllBirthdaysService } from "../services/Birthdays/ListAllBirthdaysService";

export class ListAllBirthdaysController {
	async handle(req: Request, res: Response) {
		try {
			const service = new ListAllBirthdaysService();

			const result = await service.execute();

			if (result instanceof Error) {
				return res
					.status(400)
					.json({ succes: false, error: result.message });
			}

			return res.status(200).json({ succes: true, birthdays: result });
		} catch (e) {
			return res.status(500).json({ succes: false, error: e });
		}
	}
}
