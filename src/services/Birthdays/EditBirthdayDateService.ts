import { connectToDb } from "../MongoDb";

interface EditBirthdayDateServiceProps {
	email: string;
	newDate: String;
}

export class EditBirthdayDateService {
	async execute({ email, newDate }: EditBirthdayDateServiceProps) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.updateOne({ email }, { $set: { date: newDate } });

				if (!result.modifiedCount) {
					return new Error(
						"Não foi possível editar a data deste aniversariante"
					);
				}
			} else {
				return new Error(
					"Não foi possível editar a data deste aniversariante"
				);
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
