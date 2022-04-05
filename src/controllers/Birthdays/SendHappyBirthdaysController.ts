import { Request, Response } from "express";
import { SendHappyBirthdaysService } from "../../services/Birthdays/SendHappyBirthdaysService";

export class SendHappyBirthdaysController {
	async handle(req: Request, res: Response) {
		try {
			const service = new SendHappyBirthdaysService();
			const result = await service.execute();

			if (result instanceof Error) {
				return res
					.status(400)
					.json({ succes: false, message: result.message });
			} else {
				return res.status(200).json({ succes: true });
			}
		} catch (err) {
			res.status(500).json({ succes: false, message: err });
		}
	}
}
