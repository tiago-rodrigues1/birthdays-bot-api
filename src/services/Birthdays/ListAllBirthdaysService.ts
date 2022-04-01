import { connectToDb } from "../MongoDb";

export class ListAllBirthdaysService {
	async execute() {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			let results;

			if (db) {
				const cursor = db.collection("birthdays").find();
				results = await cursor.toArray();

				if (!results) {
					return new Error(
						"Não foi possível listar os aniversariantes"
					);
				}

				return results;
			} else {
				return new Error("Não foi possível listar os aniversariantes");
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
