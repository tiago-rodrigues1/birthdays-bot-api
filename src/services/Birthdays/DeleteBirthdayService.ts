import { connectToDb } from "../MongoDb";

interface DeleteBirthdayServiceProps {
	email: String;
}
export class DeleteBirthdayService {
	async execute({ email }: DeleteBirthdayServiceProps) {
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
			} else {
				return new Error(
					"Não foi possível deletar este aniversariante"
				);
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
