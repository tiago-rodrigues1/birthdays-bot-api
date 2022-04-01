import { connectToDb } from "../MongoDb";

import { Birthday } from "../../types/Birthday";

export class EditBirthdayNameService {
	async execute({ email, name }: Birthday) {
		try {
			if (!name) {
				return new Error("Informe o novo nome");
			}

			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.updateOne({ email }, { $set: { name } });

				if (!result.modifiedCount) {
					return new Error(
						"Não foi possível editar este aniversariante"
					);
				}

				return result.modifiedCount;
			} else {
				return new Error("Não foi possível editar este aniversariante");
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
