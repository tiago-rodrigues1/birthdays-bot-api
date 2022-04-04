import { Response, Request } from "express";
import { CreateBirthdayService } from "../../services/Birthdays/CreateBirthdayService";
import { Birthday } from "../../types/Birthday";

export class CreateBirthdayController {
	async handle(req: Request, res: Response) {
		const { email, name, date } = <Birthday>req.body;

		try {
			if (!email) {
				return res
					.status(400)
					.json({ succes: false, error: "email is missing" });
			}

			if (!name) {
				return res
					.status(400)
					.json({ succes: false, error: "name is missing" });
			}

			if (!date) {
				return res
					.status(400)
					.json({ succes: false, error: "date is missing" });
			}

			const service = new CreateBirthdayService();
			const result = await service.execute({ email, name, date });

			if (result instanceof Error) {
				return res
					.status(400)
					.json({ succes: false, error: result.message });
			}

			return res.status(200).json({ succes: true });
		} catch (e) {
			return res.status(500).json({ succes: false, error: e });
		}
	}
}
