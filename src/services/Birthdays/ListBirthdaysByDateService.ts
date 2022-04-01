import { connectToDb } from "../MongoDb";

export class ListBirthdaysByDateService {
	async execute(date: String) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const cursor = db.collection("birthdays").find({ date });
				const result = await cursor.toArray();

				if (!result) {
					return new Error(
						`Não foi possível pegar os aniversariantes de ${date}`
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
