import { connectToDb } from "../MongoDb";

import { Birthday } from "../../types/Birthday";

export class CreateBirthdayService {
	async execute({ email, name, date }: Birthday): Promise<Birthday | Error> {
		const { db } = await connectToDb();

		try {
			const result = await db.collection("birthdays").findOne({ email });

			console.log(result);

			if (result) {
				return new Error("Esse aniversariante já está cadastrado!");
			}

			db.collection("birthdays").insertOne({ email, name, date });
		} catch (e) {
			return new Error(e);
		}
	}
}
