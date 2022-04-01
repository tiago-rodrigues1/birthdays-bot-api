import { connectToDb } from "../MongoDb";

import { Birthday } from "../../types/Birthday";

export class EditBirthdayNameService {
	async execute({ email, name }: Birthday) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.updateOne({ email }, { $set: { name } });

				if (!result) {
					return new Error(
						"Não foi possível editar este aniversariante"
					);
				}

				return result.modifiedCount;
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
