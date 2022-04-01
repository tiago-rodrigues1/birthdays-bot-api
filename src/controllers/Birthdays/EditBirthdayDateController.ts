import { Request, Response } from "express";

import { Birthday } from "../../types/Birthday";

import { EditBirthdayDateService } from "../../services/Birthdays/EditBirthdayDateService";

interface EditBirthdayDateControllerRequest {
	email: string;
	newDate: string;
}
export class EditBirthdayDateController {
	async handle(req: Request, res: Response) {
		const { email, newDate } = <EditBirthdayDateControllerRequest>req.body;

		try {
			if (!email) {
				res.status(400).json({
					succes: false,
					error: "email is missing",
				});
			}

			if (!newDate) {
				res.status(400).json({
					succes: false,
					error: "newDate is missing",
				});
			}

			const service = new EditBirthdayDateService();
			const result = await service.execute({ email, newDate });

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
