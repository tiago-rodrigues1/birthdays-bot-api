import { connectToDb } from "../MongoDb";

import { Birthday } from "../../types/Birthday";

export class DeleteBirthdayService {
	async execute({ email }: Birthday) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.deleteOne({ email });

				if (!result.deletedCount) {
					return new Error(
						"Não foi possível deletar este aniversariante"
					);
				}

				return result.deletedCount;
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
