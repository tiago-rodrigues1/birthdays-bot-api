import { connectToDb } from "../MongoDb";

export class ListBirthdaysByDateService {
	async execute(date: string) {
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
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
