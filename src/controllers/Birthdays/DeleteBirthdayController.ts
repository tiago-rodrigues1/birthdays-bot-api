import { Request, Response } from "express";
import { DeleteBirthdayService } from "../../services/Birthdays/DeleteBirthdayService";
import { Birthday } from "../../types/Birthday";

export class DeleteBirthdayController {
	async handle(req: Request, res: Response) {
		const { email } = <Birthday>req.body;

		try {
			if (!email) {
				return res
					.status(400)
					.json({ succes: false, error: "email is missing" });
			}

			const service = new DeleteBirthdayService();
			const result = await service.execute({ email });

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
