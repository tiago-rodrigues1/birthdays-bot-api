import { Request, Response } from "express";
import { ListBirthdaysByDateService } from "../../services/Birthdays/ListBirthdaysByDateService";
import { Birthday } from "../../types/Birthday";

export class ListBirthdaysByDateController {
	async handle(req: Request, res: Response) {
		const { date } = <Birthday>req.body;

		try {
			if (!date) {
				return res
					.status(400)
					.json({ succes: false, error: "date is missing" });
			}

			const service = new ListBirthdaysByDateService();
			const result = await service.execute(date);

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
