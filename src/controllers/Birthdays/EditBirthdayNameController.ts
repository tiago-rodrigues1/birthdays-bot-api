import { Request, Response } from "express";
import { EditBirthdayNameService } from "../../services/Birthdays/EditBirthdayNameService";
import { Birthday } from "../../types/Birthday";

export class EditBirthdayNameController {
	async handle(req: Request, res: Response) {
		const data = <Birthday>req.body;

		try {
			const service = new EditBirthdayNameService();
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
