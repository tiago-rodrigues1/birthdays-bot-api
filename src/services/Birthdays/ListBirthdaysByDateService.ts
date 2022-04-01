import { connectToDb } from "../MongoDb";

import { Birthday } from "../../types/Birthday";

export class ListBirthdaysByDateService {
	async execute({ date }: Birthday) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const cursor = db.collection("birthdays").find({ date });
				const result = await cursor.toArray();

				if (!result) {
					return new Error(
						"Não foi possível pegar o aniversariante de hoje"
					);
				}

				return result;
			} else {
				return new Error(
					`Não foi possível pegar os aniversariantes de ${date}`
				);
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
