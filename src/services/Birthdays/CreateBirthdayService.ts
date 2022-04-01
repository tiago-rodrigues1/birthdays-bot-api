import { connectToDb } from "../MongoDb";

import { Birthday } from "../../types/Birthday";

export class CreateBirthdayService {
	async execute({ email, name, date }: Birthday) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.findOne({ email });

				if (result) {
					return new Error("Esse aniversariante já está cadastrado!");
				}

				db.collection("birthdays").insertOne({ email, name, date });
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
