import { Request, Response } from "express";

import { Birthday } from "../../types/Birthday";

import { EditBirthdayDateService } from "../../services/Birthdays/EditBirthdayDateService";

export class EditBirthdayDateController {
	async handle(req: Request, res: Response) {
		const data = <Birthday>req.body;

		try {
			const service = new EditBirthdayDateService();
			const result = await service.execute(data);

			if (result instanceof Error) {
				return res
					.status(400)
					.json({ succes: false, error: result.message });
			}

			res.status(200).json({ succes: true });
		} catch (e) {
			return res.status(500).json({ succes: false, error: e });
		}
	}
}
