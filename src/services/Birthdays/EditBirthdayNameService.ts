import { connectToDb } from "../MongoDb";

interface EditBirthdayNameServiceProps {
	email: string;
	newName: string;
}
export class EditBirthdayNameService {
	async execute({ email, newName }: EditBirthdayNameServiceProps) {
		try {
			const connection = await connectToDb();
			const db = connection?.db;

			if (db) {
				const result = await db
					.collection("birthdays")
					.updateOne({ email }, { $set: { name: newName } });

				if (!result.modifiedCount) {
					return new Error(
						"Não foi possível editar este aniversariante"
					);
				}

				return result.modifiedCount;
			} else {
				return new Error("Não foi possível editar este aniversariante");
			}
		} catch (e) {
			return new Error(`${e}`);
		}
	}
}
