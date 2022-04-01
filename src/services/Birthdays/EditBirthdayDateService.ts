import { connectToDb } from "../MongoDb";

interface EditBirthdayDateServiceProps {
	email: String;
	date: String;
}

export class EditBirthdayDateService {
	async execute({ email, date }: EditBirthdayDateServiceProps) {
		try {
			if (!date) {
				return new Error("Informe a nova data");
			}

			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.updateOne({ email }, { $set: { date } });

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
