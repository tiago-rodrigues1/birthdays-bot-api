import { Request, Response } from "express";
import { EditBirthdayNameService } from "../../services/Birthdays/EditBirthdayNameService";

interface EditBirthdayNameControllerRequest {
	email: string;
	newName: string;
}
export class EditBirthdayNameController {
	async handle(req: Request, res: Response) {
		const { email, newName } = <EditBirthdayNameControllerRequest>req.body;

		try {
			if (!email) {
				return res
					.status(400)
					.json({ succes: false, error: "email is missing" });
			}

			if (!newName) {
				return res
					.status(400)
					.json({ succes: false, error: "newName is missing" });
			}

			const service = new EditBirthdayNameService();
			const result = await service.execute({ email, newName });

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
